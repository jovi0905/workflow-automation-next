import { Sidebar } from '@/components/sidebar';
import { requireUser } from '@/lib/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireUser();

  return (
    <div className="lg:flex">
      <Sidebar role={session.role} name={session.name} />
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
