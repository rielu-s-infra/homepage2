// src/lib/status.ts

export interface ServiceStatus {
  name: string;
  status: "Operational" | "Down" | "Pending" | "Maintenance";
  color: string;
}

interface KumaMonitor {
  id: number;
  name: string;
}

interface KumaGroup {
  monitorList: KumaMonitor[];
}

interface KumaPageResponse {
  publicGroupList?: KumaGroup[];
}

interface KumaHeartbeat {
  status: number;
}

interface KumaHeartbeatResponse {
  heartbeatList: Record<string, KumaHeartbeat[]>;
}

export async function getKumaStatus(): Promise<ServiceStatus[]> {
  try {
    const kumaUrl = process.env.UPTIME_KUMA_URL;
    const slug = process.env.UPTIME_KUMA_SLUG;

    const [pageRes, heartbeatRes] = await Promise.all([
      fetch(`${kumaUrl}/api/status-page/${slug}`, { cache: 'no-store' }),
      fetch(`${kumaUrl}/api/status-page/heartbeat/${slug}`, { cache: 'no-store' }),
    ]);

    if (!pageRes.ok || !heartbeatRes.ok) throw new Error('Fetch failed');

    const pageData = (await pageRes.json()) as KumaPageResponse;
    const heartbeatData = (await heartbeatRes.json()) as KumaHeartbeatResponse;

    if (!pageData.publicGroupList) return [];

    return pageData.publicGroupList.flatMap((group) =>
      group.monitorList.map((monitor) => {
        const beats = heartbeatData.heartbeatList[String(monitor.id)];
        // 最新のハートビートのステータスを使用
        const s = beats?.at(-1)?.status;

        if (s === 1) return { name: monitor.name, status: "Operational", color: "text-green-400" };
        if (s === 0) return { name: monitor.name, status: "Down", color: "text-red-400" };
        if (s === 2) return { name: monitor.name, status: "Pending", color: "text-yellow-400" };
        return { name: monitor.name, status: "Maintenance", color: "text-blue-400" };
      })
    );
  } catch (error) {
    console.error("Status fetch failed:", error);
    return [];
  }
}
// クライアントサイド専用（/api/kuma 経由）
export async function fetchKumaStatus(): Promise<ServiceStatus[]> {
  const res = await fetch('/api/kuma', { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}
