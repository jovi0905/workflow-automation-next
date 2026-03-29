import Link from 'next/link';

const features = [
  {
    title: 'Email Automation',
    description: 'Dispatch personalized reminders and summaries with Resend or SMTP, keeping customers aligned without manual sends.'
  },
  {
    title: 'Task Scheduling',
    description: 'Queue priorities, assign owners, and watch deadlines settle into a calm, predictable cadence.'
  },
  {
    title: 'Smart Notifications',
    description: 'Notify individuals or entire teams when a workflow trace shifts�status, deadline, or priority change.'
  },
  {
    title: 'Workflow Analytics',
    description: 'See completion rates, pending work, and productivity overshoot in one elegant dashboard.'
  }
];

const steps = [
  {
    label: '01',
    title: 'Connect Projects',
    detail: 'Bring your tasks, teams, and automations into one simple board without cloning spreadsheets.'
  },
  {
    label: '02',
    title: 'Automate Reminders',
    detail: 'Define rules around deadlines and priorities so campaigns, launches, and reports always stay on track.'
  },
  {
    label: '03',
    title: 'Monitor Results',
    detail: 'Rich analytics and notifications keep you looped in and confident every hour of the day.'
  }
];

const testimonials = [
  {
    name: 'Clara Jensen',
    role: 'Head of Ops, Lumi',
    quote: 'Workflow Automation replaced three tools with one sleek control room. Tasks stay on time and customers feel the care.'
  },
  {
    name: 'Marco Bui',
    role: 'Product Lead, Apex',
    quote: 'The dashboard and automations give us clarity without complexity. Everything feels intentional and joyful.'
  },
  {
    name: 'Talia Reed',
    role: 'Director of CS, Pulse',
    quote: 'The templates get our team moving fast, yet the notifications stay delightfully human. Love the subtle gradients.'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16 sm:px-10 lg:px-12">
        <section className="relative flex flex-col gap-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-white/90 p-10 shadow-[0_35px_100px_rgba(79,70,229,0.25)]">
          <div className="pointer-events-none absolute -top-10 right-10 h-32 w-32 rounded-full bg-white/40 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-indigo-400/30 blur-3xl" aria-hidden="true" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <p className="text-sm uppercase tracking-[0.5em] text-white/80">Workflow Automation</p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Automate Your Workflows Effortlessly
              </h1>
              <p className="text-lg text-indigo-100">
                Bring together teams, emails, and tasks in a single, elegant workspace. Strong visual hierarchy, intuitive controls, and thoughtful automation keep the work flowing.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="rounded-full bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-lg shadow-indigo-400/40 transition hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:border-white"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-72 w-full max-w-sm rounded-3xl border border-white/40 bg-white/40 p-6 shadow-xl backdrop-blur" aria-hidden="true">
              <div className="flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-b from-white to-indigo-100 p-5 shadow-lg">
                <div className="h-40 w-full rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-700" />
                <div className="space-y-2">
                  <div className="h-3 rounded-full bg-white/70" />
                  <div className="h-3 w-3/4 rounded-full bg-white/60" />
                </div>
              </div>
              <div className="absolute -right-6 top-10 hidden h-32 w-32 rounded-full bg-gradient-to-br from-white to-indigo-200 opacity-60 blur-3xl lg:block" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="features" className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-600">Capabilities</p>
            <h2 className="text-3xl font-semibold text-slate-900">Everything you need to keep complex workflows calm</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(99,102,241,0.15)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">{feature.title}</p>
                <p className="mt-3 text-base text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Dashboard</p>
            <h2 className="text-3xl font-semibold text-slate-900">Preview the workspace</h2>
          </div>
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.1)] lg:grid-cols-[240px_1fr]">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Ideas</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="rounded-2xl bg-white/70 px-3 py-2 shadow-sm">Team Kickoff</li>
                <li className="rounded-2xl bg-slate-100 px-3 py-2">Product Review</li>
                <li className="rounded-2xl bg-slate-100 px-3 py-2">Automation Sprint</li>
              </ul>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">Workflow</p>
                  <h3 className="text-xl font-semibold text-slate-900">Launch Campaign</h3>
                  <div className="mt-4 grid gap-3 text-sm text-slate-600">
                    <p>Owner: Clara Jensen</p>
                    <p>Next action: Send automation brief</p>
                  </div>
                  <div className="mt-4 flex justify-between text-xs uppercase tracking-[0.4em] text-slate-500">
                    <span>Active</span>
                    <span>Due in 2 days</span>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">Workflow</p>
                  <h3 className="text-xl font-semibold text-slate-900">Onboarding Playbook</h3>
                  <div className="mt-4 grid gap-3 text-sm text-slate-600">
                    <p>Owner: Marco Bui</p>
                    <p>Next action: Approval check-in</p>
                  </div>
                  <div className="mt-4 flex justify-between text-xs uppercase tracking-[0.4em] text-slate-500">
                    <span>Pending</span>
                    <span>5 tasks remaining</span>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">Activity Feed</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p className="flex items-center justify-between">
                    <span>Caroline marked �Email Review� done</span>
                    <span className="text-xs text-indigo-500">2m ago</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Overdue reminder sent to team</span>
                    <span className="text-xs text-indigo-500">12m ago</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Priority bumped to high for sprint</span>
                    <span className="text-xs text-indigo-500">1h ago</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">How It Works</p>
            <h2 className="text-3xl font-semibold text-slate-900">A simple rhythm for high-performing teams</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-[0_25px_75px_rgba(15,23,42,0.1)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-lg font-semibold text-white">
                  {step.label}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Testimonials</p>
            <h2 className="text-3xl font-semibold text-slate-900">Loved by teams who care</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
              >
                <p className="text-base text-slate-700">�{testimonial.quote}�</p>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">Workflow Automation</p>
              <p className="text-sm text-slate-600">Modern SaaS tooling inspired by the clarity of Stripe, Notion, and Linear.</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="space-y-2">
                <p className="font-semibold text-slate-900">Product</p>
                <Link href="#features" className="block">Features</Link>
                <Link href="#how-it-works" className="block">How it works</Link>
                <Link href="#" className="block">Pricing</Link>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-slate-900">Company</p>
                <Link href="#" className="block">Blog</Link>
                <Link href="#" className="block">Careers</Link>
                <Link href="#" className="block">Contact</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between text-sm text-slate-500">
            <p>� {new Date().getFullYear()} Workflow Automation. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.4em]">Li</span>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.4em]">Tw</span>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.4em]">Me</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
