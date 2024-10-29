import { NextResponse } from 'next/server';
import { rpcCall } from '../../../utils/regtest';

export async function GET() {
  try {
    const blockCount = await rpcCall('getblockcount');
    return NextResponse.json({ blockCount }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
