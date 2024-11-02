import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db, users } from '@/lib/db';
import { eq, ilike } from 'drizzle-orm';

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('order') as 'asc' | 'desc';
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    let query = db.select().from(users);
  
    if (search) {
      query = query.where(ilike(users.username, `%${search}%`));
    }

    if (sortBy) {
      query = query.orderBy(users[sortBy as keyof typeof users], order || 'asc');
    }

    const usersList = await query.limit(100).offset(offset);

    return NextResponse.json(usersList);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}