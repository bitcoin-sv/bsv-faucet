'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const togglePauseUser = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw Error('User not found');
  }
  await prisma.user.update({ where: { id }, data: { paused: !user.paused } });
  revalidatePath('/users');
};

export const deleteUser = async (id: number) => {
  await prisma.user.delete({ where: { id } });
  revalidatePath('/users');
};
