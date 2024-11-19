import { PrismaClient } from '@/prisma/generated/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const lastTransaction = await prisma.transaction.findFirst({
      where: {
        userId: userId,
        date: {
          gte: last24Hours
        },
        txType: 'withdraw'
      },
      orderBy: {
        date: 'desc'
      },
      select: {
        date: true
      }
    });

    let remainingTime = 0;
    if (lastTransaction) {
      remainingTime = Math.max(0, 24 * 60 * 60 * 1000 - (Date.now() - lastTransaction.date.getTime()));
    }

    return NextResponse.json({ remainingTime });
  } catch (error) {
    console.error('Error fetching remaining time:', error);
    return NextResponse.json(
      { error: 'Error fetching remaining time' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}