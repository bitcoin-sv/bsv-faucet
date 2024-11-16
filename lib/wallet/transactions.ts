import { PrivateKey, P2PKH, Transaction, TransactionInput } from '@bsv/sdk';
import { getUTXOs, getRawTransaction, broadcastTransaction } from './regest';
import { PrismaClient } from '@/prisma/generated/client';
import { currentUser } from '@clerk/nextjs/server';

interface UTXO {
  tx_hash: string;
  tx_pos: number;
  value: number;
}

interface TransactionOutput {
  address: string;
  satoshis: number;
}

function transactionToObject(tx: Transaction): Record<string, any> {
  return {
    version: tx.version,
    inputs: tx.inputs.map((input) => ({
      txid: input.sourceTransaction?.hash.toString(),
      vout: input.sourceOutputIndex,
      sequence: input.sequence
    })),
    outputs: tx.outputs.map((output) => ({
      satoshis: output.satoshis,
      lockingScript: output.lockingScript.toASM()
    }))
  };
}

const prisma = new PrismaClient();

export const createAndSendTransaction = async (
  privKeyWif: string,
  toAddress: string,
  amount: number,
  network: 'testnet' | 'mainnet' = 'testnet'
): Promise<string> => {
  try {
    // Validate inputs
    if (!privKeyWif || !toAddress || amount <= 0) {
      throw new Error('Invalid input parameters');
    }

    const privateKey = PrivateKey.fromWif(privKeyWif);
    const publicKey = privateKey.toPublicKey();
    const senderAddress = publicKey.toAddress(network).toString();

    const FEE_PER_BYTE = 0.5;
    const ESTIMATED_INPUT_SIZE = 148;
    const ESTIMATED_OUTPUT_SIZE = 34;
    const BASE_TX_SIZE = 10;

    const utxos = await getUTXOs(senderAddress);
    if (!utxos || utxos.length === 0) {
      throw new Error('No UTXOs available');
    }

    const estimatedSize =
      BASE_TX_SIZE +
      ESTIMATED_INPUT_SIZE * utxos.length +
      ESTIMATED_OUTPUT_SIZE * 2;
    const estimatedFee = Math.ceil(estimatedSize * FEE_PER_BYTE);

    let selectedUTXOs: UTXO[] = [];
    let totalInputSatoshis = 0;
    const requiredAmount = amount + estimatedFee;

    for (const utxo of utxos) {
      selectedUTXOs.push(utxo);
      totalInputSatoshis += utxo.value;
      if (totalInputSatoshis >= requiredAmount) {
        break;
      }
    }

    if (totalInputSatoshis < requiredAmount) {
      throw new Error(
        `Insufficient funds. Required: ${requiredAmount}, Available: ${totalInputSatoshis}`
      );
    }

    const inputs = await Promise.all(
      selectedUTXOs.map(async (utxo) => {
        const rawTx = await getRawTransaction(utxo.tx_hash);
        if (!rawTx) {
          throw new Error(
            `Failed to fetch raw transaction for UTXO: ${utxo.tx_hash}`
          );
        }

        const sourceTx = Transaction.fromHex(rawTx);
        return {
          sourceTransaction: sourceTx,
          sourceOutputIndex: utxo.tx_pos,
          unlockingScriptTemplate: new P2PKH().unlock(privateKey)
        };
      })
    );

    const changeAmount = totalInputSatoshis - amount - estimatedFee;

    const recipientP2PKH = new P2PKH().lock(toAddress);
    const changeP2PKH = new P2PKH().lock(senderAddress);

    const outputs = [
      {
        lockingScript: recipientP2PKH,
        satoshis: amount
      }
    ];

    if (changeAmount > 546) {
      outputs.push({
        lockingScript: changeP2PKH,
        satoshis: changeAmount
      });
    }

    const tx = new Transaction(1, inputs, outputs);

    for (let i = 0; i < tx.inputs.length; i++) {
      const input = tx.inputs[i];
      const p2pkhUnlock = new P2PKH().unlock(privateKey);
      input.unlockingScript = await p2pkhUnlock.sign(tx, i);
    }

    const rawTx = tx.toHex();
    const txid = await broadcastTransaction(rawTx);
    if (!txid) {
      throw new Error('Failed to broadcast transaction');
    }
    const user = await currentUser()
    const userId = user?.id
    await prisma.transaction.create({
      data: {
        txid,
        rawTx,
        beefTx: transactionToObject(tx),
        vout: outputs.map((output) => ({
          address: toAddress,
          satoshis: output.satoshis
        })),
        txType: 'withdraw',
        spentStatus: false,
        testnetFlag: network === 'testnet',
        amount: BigInt(amount),
        userId: userId,
      }
    });

    await prisma.user.update({
      where: {userId: userId},
      data: {
        withdrawn: {
          increment: BigInt(amount)
        }
      }
    });

    return txid;
  } catch (error) {
    console.error(
      `Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
    throw new Error(
      `Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  } finally {
    await prisma.$disconnect();
  }
};
