import clsx from 'clsx';

type Props = {
  label: string;
  value: number;
  tone?: 'neutral' | 'success' | 'danger';
};

const toneStyles: Record<NonNullable<Props['tone']>, string> = {
  neutral: 'bg-slate-100 text-slate-900',
  success: 'bg-emerald-100 text-emerald-800',
  danger: 'bg-rose-100 text-rose-800'
};

export function StatCard({ label, value, tone = 'neutral' }: Props) {
  return (
    <article className={clsx('rounded-lg border border-slate-200 p-5 shadow-sm', toneStyles[tone])}>
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </article>
  );
}
