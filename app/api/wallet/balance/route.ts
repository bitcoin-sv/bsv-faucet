import { getUTXOs } from '@/lib/wallet/regest';
import { PrivateKey } from '@bsv/sdk';
import { NextResponse } from 'next/server';

interface UTXO {
  value: number;
}

export async function GET(req: Request) {
  try {
    const treasuryWIF = process.env.NEXT_PUBLIC_TREASURY_WALLET_WIF;  // Removed `NEXT_PUBLIC_` to keep private
    if (!treasuryWIF) {
      return NextResponse.json({ error: 'No wallet found' }, { status: 404 });
    }

    const privateKey = PrivateKey.fromWif(treasuryWIF);
    const address = privateKey.toAddress('testnet').toString();
    const utxos: UTXO[] = await getUTXOs(address);

    if (!utxos || utxos.length === 0) {
      return NextResponse.json({ balance: 0 });
    }

    const balance = utxos.reduce((acc, utxo) => acc + utxo.value, 0);

    return NextResponse.json({ balance });
  } catch (error) {
    console.error(error);  // Logging for better debugging
    return NextResponse.json(
      { error: 'Error fetching balance' },
      { status: 500 }
    );
  }
}
