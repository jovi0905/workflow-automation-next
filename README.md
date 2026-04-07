# Workflow Automation (Next.js + Tailwind + App Router)

Complete dynamic project/task workflow automation web app with:

- Login + authentication
- Roles: `ADMIN`, `MEMBER`
- Project CRUD
- Task CRUD + assignment + deadline + priority + status
- Overdue detection automation
- Notification reminders (and optional SMTP email reminders)
- Dashboard metrics + simple visual charts
- Productivity score per user

## Tech

- Next.js App Router
- Tailwind CSS
- Prisma ORM
- PostgreSQL (recommended for Vercel)

## Local Setup

1. Install Node.js 20+
2. In this folder, install deps:

```bash
npm install
```

3. Create env file:

```bash
cp .env.example .env
```

4. Set `DATABASE_URL` to your PostgreSQL instance, adjust `AUTH_SECRET`, `CRON_SECRET`, and SMTP settings if needed.
5. Run migrations + seed:

```bash
npm run prisma:migrate -- --name init
npm run prisma:seed
```

6. Start app:

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

## Seed Accounts

- Admin: `admin@workflow.local` / `admin123`
- Member: `member@workflow.local` / `member123`

## Vercel Deployment

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. In Vercel Project Settings:

- Framework preset: `Next.js`
- Build command: `npm run vercel-build`
- Output directory: `.next` (default)

4. Add environment variables in Vercel:

- `DATABASE_URL` (Vercel Postgres or any managed Postgres)
- `AUTH_SECRET` (long random string)
- `CRON_SECRET` (long random string)
- `PENDING_REMINDER_HOURS` (optional, default 48)
- `PENDING_REMINDER_COOLDOWN_HOURS` (optional, default 24)
- `RESEND_API_KEY` (optional, for Resend automation)
- `RESEND_FROM` (optional)
- `SMTP_HOST` (optional)
- `SMTP_PORT` (optional)
- `SMTP_USER` (optional)
- `SMTP_PASS` (optional)
- `SMTP_FROM` (optional)

5. Deploy.

## Self-serve sign-up

- The landing page now links directly to `/signup`, where visitors can create a new member account with a minimum 8-character password.
- The server action at `src/app/signup/actions.ts` validates the payload, hashes the password with bcrypt, saves the user with a `MEMBER` role, and signs them in immediately.
- If you prefer to seed admins manually, keep using `npm run prisma:seed` or the dashboard’s Create User form.

## Automation reminders

- `vercel.json` schedules `/api/automation/run` once per hour.
- The API runs both overdue and pending reminder flows sequentially, so the cron and manual invocations behave the same.
- If `CRON_SECRET` is configured, Vercel includes `Authorization: Bearer <CRON_SECRET>` in requests and the endpoint returns JSON such as `{ source: 'cron', overdueProcessed: 2, pendingProcessed: 5 }`.
- Emails now use Resend when `RESEND_API_KEY` is set (with `RESEND_FROM`) and fall back to SMTP when `SMTP_HOST`/`SMTP_PASS` are provided.

## Login + roles

- The landing page directs traffic to `/login`. The role picker on the login form ensures the user signs in with the correct `ADMIN` or `MEMBER` account. If the selected role doesn’t match the stored role, the action returns a helpful message.
- Once signed in, the hero CTA changes to “Continue to dashboard,” and the navbar keeps a login button and navigation anchors for quick access.

## Immediate assignment emails

- When an admin creates a task, the app now sends an instant email via Resend/SMTP and creates a `Notification` record of type `TASK_ASSIGNED`. That ensures you don’t wait for the cron before the assignee knows about the new work.
- You can still rely on the hourly automation endpoint to fire overdue/pending reminders, giving you both real-time and scheduled notifications.

## Pending task emails

- `PENDING_REMINDER_HOURS` (default 48) controls how many hours ahead of the deadline a task enters the pending window.
- `PENDING_REMINDER_COOLDOWN_HOURS` (default 24) prevents duplicate emails by keeping a cooldown per task.
- Pending reminders send an email + in-app notification when a task remains open and due soon.
