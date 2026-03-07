import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { markAllNotificationsReadAction, markNotificationReadAction } from './actions';

export default async function NotificationsPage() {
  const session = await requireUser();

  const notifications = await prisma.notification.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-600">Task reminders and automation updates.</p>
        </div>

        <form action={markAllNotificationsReadAction}>
          <button type="submit" className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Mark all as read
          </button>
        </form>
      </header>

      <section className="space-y-3">
        {notifications.map((notification) => (
          <article
            key={notification.id}
            className={`rounded-lg border p-4 shadow-sm ${
              notification.isRead ? 'border-slate-200 bg-white' : 'border-brand-200 bg-brand-50'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{notification.type}</p>
                <p className="mt-1 text-sm text-slate-700">{notification.message}</p>
                <p className="mt-1 text-xs text-slate-500">{notification.createdAt.toLocaleString()}</p>
              </div>

              {!notification.isRead ? (
                <form action={markNotificationReadAction}>
                  <input type="hidden" name="id" value={notification.id} />
                  <button type="submit" className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                    Mark read
                  </button>
                </form>
              ) : null}
            </div>
          </article>
        ))}

        {notifications.length === 0 ? <p className="text-sm text-slate-600">No notifications yet.</p> : null}
      </section>
    </div>
  );
}
