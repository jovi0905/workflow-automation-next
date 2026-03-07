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

4. Set `DATABASE_URL` to your local or cloud PostgreSQL
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
- `SMTP_HOST` (optional)
- `SMTP_PORT` (optional)
- `SMTP_USER` (optional)
- `SMTP_PASS` (optional)
- `SMTP_FROM` (optional)

5. Deploy.

## Scheduled Automation on Vercel

`vercel.json` includes an hourly cron:

- `0 * * * *` -> `/api/automation/run`

When `CRON_SECRET` is set, Vercel cron sends `Authorization: Bearer <CRON_SECRET>` and the endpoint executes overdue task reminders securely.

## Manual Automation Trigger

- Admin can call: `GET /api/automation/run` while logged in.
- Cron can call the same endpoint with bearer secret.
