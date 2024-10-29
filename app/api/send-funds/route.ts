import { NextResponse } from 'next/server';
import { rpcCall } from '../../../utils/regtest';
import { db, transactions, wallets, utxos, eq } from '@/lib/db';

interface SendFundsBody {
  toAddress: string;
  amountSatoshis: number;
}

export async function POST(request: Request) {
  try {
    const body: SendFundsBody = await request.json();
    const { toAddress, amountSatoshis } = body;

    if (!toAddress || !amountSatoshis) {
      return NextResponse.json({ error: 'Missing toAddress or amountSatoshis' }, { status: 400 });
    }

    const walletsList = await db.select().from(wallets).limit(1).execute();
    if (walletsList.length === 0) {
      return NextResponse.json({ error: 'No treasury wallet found' }, { status: 404 });
    }
    const treasuryWallet = walletsList[0];

    const amountBSV = amountSatoshis / 1e8;

    const rawTx = await rpcCall('createrawtransaction', [
      [],
      { [toAddress]: amountBSV },
    ]);

    // sign transaction
    const signedTx = await rpcCall('signrawtransactionwithwallet', [rawTx]);

    if (!signedTx.complete) {
      throw new Error('Transaction signing incomplete');
    }

    // send transaction
    const txid = await rpcCall('sendrawtransaction', [signedTx.hex]);

    // store the outgoing transaction
    const tx = {
      date: new Date(),
      txid,
      raw_tx: signedTx.hex,
      beef_tx: signedTx.hex,
      vout: 0,
      tx_type: 'outgoing' as const,
      spent_status: true,
      testnet_flag: true,
      amount_satoshis: amountSatoshis.toString(),
    };

    await db.insert(transactions).values(tx).execute();

    // TODO:mark corresponding UTXOs as spent
    // TODO:implement logic based on actual transaction details

    return NextResponse.json({ txid }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
