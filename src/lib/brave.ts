export async function braveSearch(query: string) {
  const key = process.env.BRAVE_API_KEY!;
  const base = process.env.BRAVE_API_URL || "https://api.search.brave.com/res/v1";

  const url = `${base}/web/search?q=${encodeURIComponent(query)}&count=6&freshness=month`;
  const res = await fetch(url, { headers: { Accept: "application/json", "X-Subscription-Token": key } });
  if (!res.ok) throw new Error(`Brave error ${res.status}`);
  const data = await res.json();

  // map to minimal structure
  const items = (data.web?.results || []).map((r: any) => ({
    title: r.title,
    url: r.url,
    description: r.description || "",
  }));
  return items as { title: string; url: string; description: string }[];
}
