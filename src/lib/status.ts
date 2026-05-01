// src/lib/status.ts

export interface ServiceStatus {
  name: string;
  status: "Operational" | "Down" | "Pending";
  color: string;
}

interface KumaMonitor {
  name: string;
  status?: number;
}

interface KumaGroup {
  monitorList: KumaMonitor[];
}

interface KumaResponse {
  publicGroupList?: KumaGroup[];
}

export async function getKumaStatus(slug: string): Promise<ServiceStatus[]> {
  try {
    // If slug is already a full URL (from Server Component), use it.
    // Otherwise, treat it as a slug and use the relative path (from Client Component).
    const url = (slug.startsWith('http') || slug.startsWith('/')) 
      ? slug 
      : `/api-kuma/api/status-page/${slug}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Expected JSON but received ${contentType}. Body: ${text.slice(0, 100)}...`);
    }
    
    const data = (await response.json()) as KumaResponse;

    if (!data.publicGroupList) return [];

    return data.publicGroupList.flatMap((group) =>
      group.monitorList.map((monitor) => {
        // monitor.status が無い場合は、一旦 Operational と仮定するか、
        // ログを確認して正しいステータスフィールド(activeなど)を探す
        const isUp = monitor.status === 1 || monitor.status === undefined;

        return {
          name: monitor.name,
          status: isUp ? "Operational" : "Down",
          color: isUp ? "text-green-400" : "text-red-400",
        };
      }),
    );
  } catch (error) {
    console.error("Status fetch failed:", error);
    return [];
  }
}
