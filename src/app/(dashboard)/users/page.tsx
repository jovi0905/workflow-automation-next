import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createUserAction } from './actions';

export default async function UsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    include: {
      assignedTasks: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-sm text-slate-600">Manage admin and team member accounts.</p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-900">Create User</h2>
        <form action={createUserAction} className="grid gap-3 md:grid-cols-4">
          <input name="name" required placeholder="Full name" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <input type="email" name="email" required placeholder="Email" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <input
            type="password"
            name="password"
            required
            minLength={6}
            placeholder="Password"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <select name="role" className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="MEMBER">MEMBER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="submit" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white md:col-span-4">
            Add User
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-900">Current Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Assigned Tasks</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100">
                  <td className="py-2 font-medium text-slate-900">{user.name}</td>
                  <td className="py-2 text-slate-700">{user.email}</td>
                  <td className="py-2 text-slate-700">{user.role}</td>
                  <td className="py-2 text-slate-700">{user.assignedTasks.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
