import Link from 'next/link';
import { Role } from '@prisma/client';
import { LayoutDashboard, FolderKanban, ListTodo, Bell, Users, LogOut } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/tasks', label: 'Tasks', icon: ListTodo },
  { href: '/notifications', label: 'Notifications', icon: Bell }
];

type Props = {
  role: Role;
  name: string;
};

export function Sidebar({ role, name }: Props) {
  return (
    <aside className="w-full border-r border-slate-200 bg-white lg:min-h-screen lg:w-64">
      <div className="border-b border-slate-200 px-6 py-5">
        <h1 className="text-xl font-semibold text-slate-900">Workflow Automation</h1>
        <p className="mt-1 text-sm text-slate-500">{name}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-brand-700">{role}</p>
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}

        {role === 'ADMIN' ? (
          <Link
            href="/users"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
          >
            <Users size={16} />
            Users
          </Link>
        ) : null}
      </nav>

      <form action="/logout" method="post" className="p-4">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <LogOut size={16} />
          Logout
        </button>
      </form>
    </aside>
  );
}
