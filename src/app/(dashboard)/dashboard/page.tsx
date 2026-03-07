import { BarChart } from '@/components/bar-chart';
import { StatCard } from '@/components/stat-card';
import { requireUser } from '@/lib/auth';
import { getDashboardData, runOverdueAutomation } from '@/lib/automation';

export default async function DashboardPage() {
  const session = await requireUser();
  await runOverdueAutomation();
  const data = await getDashboardData(session.userId, session.role);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">Track progress, overdue tasks, and productivity scores.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Tasks Completed" value={data.completedCount} tone="success" />
        <StatCard label="Pending Tasks" value={data.pendingCount} tone="neutral" />
        <StatCard label="Overdue Tasks" value={data.overdueCount} tone="danger" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <BarChart title="Task Status" items={data.statusChart} />
        <BarChart title="Priority Distribution" items={data.priorityChart} colorClass="bg-sky-500" />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Productivity Score</h2>
        <p className="mt-1 text-sm text-slate-600">Score = completed tasks / total assigned tasks.</p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-2">User</th>
                <th className="py-2">Role</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.productivity.map((item) => (
                <tr key={item.userId} className="border-b border-slate-100">
                  <td className="py-2 font-medium text-slate-900">{item.name}</td>
                  <td className="py-2 text-slate-700">{item.role}</td>
                  <td className="py-2 text-slate-700">{item.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
