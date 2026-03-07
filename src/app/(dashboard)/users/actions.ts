'use server';

import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createUserAction(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '').trim();
  const role = String(formData.get('role') || 'MEMBER') as Role;

  if (!name || !email || password.length < 6 || !['ADMIN', 'MEMBER'].includes(role)) {
    throw new Error('Invalid user data');
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    throw new Error('Email already exists');
  }

  await prisma.user.create({
    data: {
      name,
      email,
      role,
      passwordHash: await bcrypt.hash(password, 10)
    }
  });

  revalidatePath('/users');
  revalidatePath('/tasks');
}
