'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signupAction } from './actions';

export default function SignUpPage() {
  const [error, formAction, isPending] = useActionState(signupAction, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <h1 className="text-3xl font-semibold text-white">Create your account</h1>
        <p className="mt-2 text-sm text-slate-300">Securely join the workflow automation workspace.</p>
        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-200">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-2 w-full rounded-2xl border border-white/30 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-200">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/30 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              minLength={8}
              className="mt-2 w-full rounded-2xl border border-white/30 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
            />
          </div>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition enabled:hover:bg-indigo-600 disabled:opacity-60"
          >
            {isPending ? 'Creating account . . . ' : 'Sign up'}
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-300 hover:text-white">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
