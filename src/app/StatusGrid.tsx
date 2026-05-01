'use client';

import { useEffect, useState } from 'react';
import { type ServiceStatus, getKumaStatus } from '../lib/status';

interface StatusGridProps {
  initialServices: ServiceStatus[];
  kumaSlug: string;
}

export default function StatusGrid({ initialServices, kumaSlug }: StatusGridProps) {
  const [services, setServices] = useState<ServiceStatus[]>(initialServices);

  useEffect(() => {
    const interval = setInterval(() => {
      getKumaStatus(kumaSlug).then(setServices).catch(() => {});
    }, 60000);

    return () => clearInterval(interval);
  }, [kumaSlug]);

  return (
    <section className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white tracking-tight">System Status</h2>
        <span className="text-[10px] font-mono text-slate-500 uppercase">Auto-refresh: 60s</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.length > 0 ? (
          services.map((svc) => (
            <StatusCard key={svc.name} label={svc.name} status={svc.status} color={svc.color} />
          ))
        ) : (
          <p className="text-slate-500 text-sm">Fetching status...</p>
        )}
      </div>
    </section>
  );
}

function StatusCard({ label, status, color }: { label: string; status: string; color: string }) {
  return (
    <div className="p-4 bg-slate-800/30 border border-slate-800/50 rounded-lg">
      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">{label}</div>
      <div className={`text-sm font-bold ${color}`}>{status}</div>
    </div>
  );
}