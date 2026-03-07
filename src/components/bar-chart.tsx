type ChartItem = {
  label: string;
  value: number;
};

type Props = {
  title: string;
  items: ChartItem[];
  colorClass?: string;
};

export function BarChart({ title, items, colorClass = 'bg-brand-500' }: Props) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => {
          const width = Math.round((item.value / max) * 100);
          return (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>{item.label}</span>
                <span className="font-medium text-slate-900">{item.value}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
