'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { login } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function loginAction(_: string | null, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!parsed.success) {
    return 'Invalid email or password format.';
  }

  const session = await login(parsed.data.email, parsed.data.password);
  if (!session) {
    return 'Email or password is incorrect.';
  }

  redirect('/dashboard');
}
