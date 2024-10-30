import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db, users } from '@/lib/db';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/';
  const user = await currentUser();
  if (!user || !user.username) {
    return NextResponse.redirect(url);
  }
  try {
    await db.insert(users).values([
      {
        userId: user.id,
        username: user.username,
        email: user.emailAddresses[0].emailAddress,
        role: 'user'
      }
    ]);
  } catch (error) {}
  return NextResponse.redirect(url);
}

export const dynamic = 'force-dynamic';
