import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative isolate overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle at top, rgba(244,63,94,0.6), transparent 45%), radial-gradient(circle at 30% 20%, rgba(15,23,42,0.75), transparent 65%)'
          }}
        />
        <div className="mx-auto max-w-5xl space-y-16">
          <header className="space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-red-400">Workflow Automation</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Own the next workflow procedure�plan, automate, and celebrate every delivery.
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-300">
              Teams get a unified dashboard for projects, automations, and live notifications. Sign in to route data,
              assign tasks, and let the platform keep your priorities sharp.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="rounded-full border border-red-500 bg-red-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-600/40 transition hover:-translate-y-0.5"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-slate-600 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-red-500 hover:text-red-400"
              >
                Begin Workflow
              </Link>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-[0_15px_45px_rgba(0,0,0,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-red-400">Project & Task Pulse</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Status at a glance</h2>
              <p className="mt-3 text-sm text-slate-300">
                Monitor completed, pending, and overdue tasks with one blend of charts. Every update pushes metrics to the dashboard,
                so your team can keep momentum without bouncing between tools.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" /> Auto overdue reminders</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" /> Assignable priorities + deadlines</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" /> Productivity score per user</li>
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-black p-8 text-sm text-slate-300 shadow-[0_25px_60px_rgba(255,0,0,0.2)]">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-red-400">Automations</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Send notifications without lifting a finger</h2>
              <p className="mt-3">
                Overdue tasks trigger a reminder, and we now push pending-task nudges straight to email via Resend or SMTP.
                Set the cadence with custom windows and cooldowns so the right people stay looped in.
              </p>
              <div className="mt-6 space-y-2 text-xs uppercase tracking-[0.4em] text-slate-500">
                <p className="text-red-400">Black</p>
                <p className="text-red-400">Red</p>
                <p className="text-red-400">Blend</p>
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
