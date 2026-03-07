import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { LoginForm } from '@/components/login-form';

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-md">
        <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Use your admin or member account.</p>
        <LoginForm />
        <div className="mt-6 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
          <p>Seed users:</p>
          <p>admin@workflow.local / admin123</p>
          <p>member@workflow.local / member123</p>
        </div>
      </div>
    </main>
  );
}
