import { NextResponse } from 'next/server';
import { synchronizeDatabase } from '../../../utils/sync';

export async function POST() {
  try {
    await synchronizeDatabase();
    return NextResponse.json({ message: 'Synchronization initiated.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
