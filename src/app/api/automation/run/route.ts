import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { runOverdueAutomation, runPendingAutomation } from '@/lib/automation';

function isAuthorizedCron(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return false;
  }

  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) {
    return false;
  }

  return header.slice('Bearer '.length) === cronSecret;
}

async function executeAutomation() {
  const overdue = await runOverdueAutomation();
  const pending = await runPendingAutomation();
  return {
    overdueProcessed: overdue.processed,
    pendingProcessed: pending.processed
  };
}

export async function GET(request: Request) {
  if (isAuthorizedCron(request)) {
    const result = await executeAutomation();
    return NextResponse.json({ source: 'cron', ...result });
  }

  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const result = await executeAutomation();
  return NextResponse.json({ source: 'admin', ...result });
}

export async function POST(request: Request) {
  return GET(request);
}
