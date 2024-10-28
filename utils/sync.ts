import { fetchAndStoreTransactions } from './transactions';
import { db, wallets } from '@/lib/db';

export async function synchronizeDatabase() {
  try {
    const walletsList = await db.select().from(wallets).limit(1).execute();
    if (walletsList.length === 0) {
      console.error('No treasury wallet found for synchronization.');
      return;
    }
    const treasuryWallet = walletsList[0];
    const walletAddress = treasuryWallet.address;

    await fetchAndStoreTransactions(walletAddress);

    console.log('Database synchronization complete.');
  } catch (error: any) {
    console.error('Error during database synchronization:', error.message);
  }
}
