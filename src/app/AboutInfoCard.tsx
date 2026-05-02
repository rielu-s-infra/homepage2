export default function AboutInfoCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
        {label}
      </div>
      <div className={`font-mono text-sm ${color}`}>{value}</div>
    </div>
  );
}