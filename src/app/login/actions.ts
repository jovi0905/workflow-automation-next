'use server';

import { Role } from '@prisma/client';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { login } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role)
});

export async function loginAction(_: string | null, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role')
  });

  if (!parsed.success) {
    return 'Invalid email or password format.';
  }

  const normalizedEmail = String(parsed.data.email).toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!existing) {
    return 'Email or password is incorrect.';
  }

  if (existing.role !== parsed.data.role) {
    return `This account is registered as ${existing.role}. Select the matching role to continue.`;
  }

  const session = await login(normalizedEmail, parsed.data.password);
  if (!session) {
    return 'Email or password is incorrect.';
  }

  redirect('/dashboard');
}
