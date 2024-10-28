import { rpcCall } from './regtest';
import { db, transactions, utxos, treasuryBalance, wallets, eq } from '../lib/db';
import { and, sql } from 'drizzle-orm'; // Import 'sql' here
import { BeefTransaction, Transaction } from '../types/transaction';

export async function fetchAndStoreTransactions(walletAddress: string) {
    try {
      await db.transaction(async (tx) => {
        const unspent = await rpcCall('listunspent', [1, 9999999, [walletAddress]]);
  
        const newTransactions: Transaction[] = [];
        const newUtxos: typeof utxos.$inferInsert[] = [];
  
        // fetch all stored UTXOs
        const allStoredUtxos = await tx.select().from(utxos).where(eq(utxos.address, walletAddress)).execute();
  
        // update spent UTXOs
        const spentUtxos = allStoredUtxos.filter(storedUtxo =>
          !unspent.some((utxo: { txid: string; vout: number; }) => utxo.txid === storedUtxo.txid && utxo.vout === storedUtxo.vout)
        );
  
        if (spentUtxos.length > 0) {
          for (const spentUtxo of spentUtxos) {
            await tx.update(utxos)
              .set({ spent_status: true })
              .where(and(eq(utxos.txid, spentUtxo.txid), eq(utxos.vout, spentUtxo.vout)))
              .execute();
          }
        }
  
        for (const utxo of unspent) {
          const existingUtxo = allStoredUtxos.find(
            storedUtxo => storedUtxo.txid === utxo.txid && storedUtxo.vout === utxo.vout
          );
  
          if (!existingUtxo) {
            // fetch raw and parsed transaction
            const rawTxVerbose = await rpcCall('getrawtransaction', [utxo.txid, true]);
            const rawTxHex = rawTxVerbose.hex;
            const parsedTx = rawTxVerbose;
  
            // transaction data
            const txData: Transaction = {
              date: new Date(),
              txid: utxo.txid,
              raw_tx: rawTxHex,
              beef_tx: parsedTx as BeefTransaction,
              vout: utxo.vout,
              tx_type: 'incoming',
              spent_status: false,
              testnet_flag: true,
              amount_satoshis: BigInt(Math.round(utxo.amount * 1e8)),
            };
  
            newTransactions.push(txData);
  
            // prepare UTXO data
            const utxoData = {
              txid: utxo.txid,
              vout: utxo.vout,
              address: walletAddress,
              amount_satoshis: txData.amount_satoshis.toString(),
              script_pub_key: utxo.scriptPubKey,
              confirmations: utxo.confirmations,
              spent_status: false,
            };
  
            newUtxos.push(utxoData);
          }
        }
  
        // batch insert new transactions
        if (newTransactions.length > 0) {
          await tx.insert(transactions).values(newTransactions.map(tx => ({
            ...tx,
            amount_satoshis: tx.amount_satoshis.toString()
          }))).execute();
        }
  
        // batch insert new UTXOs
        if (newUtxos.length > 0) {
          await tx.insert(utxos).values(newUtxos).execute();
        }
  
        // update treasury balance
        await updateTreasuryBalance(tx);
      });
  
      console.log('Database synchronization complete.');
    } catch (error) {
      console.error('Error in fetchAndStoreTransactions:', error);
      throw error;
    }
  }
  
// function to update treasury balance
export async function updateTreasuryBalance(txInstance?: any) {
  try {
    const selectInstance = txInstance ? txInstance.select : db.select;

    const result = await selectInstance({
      total: sql<BigInt>`SUM(${utxos.amount_satoshis})`,
    })
      .from(utxos)
      .where(eq(utxos.spent_status, false))
      .execute();

    const totalBalance = result[0]?.total ?? BigInt(0);

    // check if treasury balance record exists
    const existingBalance = await (txInstance ? txInstance.select : db.select)()
      .from(treasuryBalance)
      .limit(1)
      .execute();

    if (existingBalance.length === 0) {
      await (txInstance ? txInstance.insert : db.insert)(treasuryBalance)
        .values({
          total_balance_satoshis: totalBalance,
          last_updated: new Date(),
        })
        .execute();
    } else {
      await (txInstance ? txInstance.update : db.update)(treasuryBalance)
        .set({
          total_balance_satoshis: totalBalance,
          last_updated: new Date(),
        })
        .where(eq(treasuryBalance.id, existingBalance[0].id))
        .execute();
    }
  } catch (error: any) {
    console.error(`Error in updateTreasuryBalance: ${error.message}`);
    throw error;
  }
}
