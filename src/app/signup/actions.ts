'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { login } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Email must be valid'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export async function signupAction(_: string | null, formData: FormData) {
  const parsed = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!parsed.success) {
    return parsed.error.issues.map((issue) => issue.message).join(' ');
  }

  const normalizedEmail = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (existing) {
    return 'An account with that email already exists.';
  }

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(parsed.data.password, 10)
    }
  });

  const session = await login(normalizedEmail, parsed.data.password);
  if (!session) {
    return 'Unable to sign in post-registration. Please login manually.';
  }

  redirect('/dashboard');
}
