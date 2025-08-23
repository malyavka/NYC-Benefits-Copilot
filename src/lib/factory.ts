export async function semanticMatch(profileSummary: string) {
  if (process.env.ENABLE_FACTORY !== "true") return [] as { id: string; text: string }[];
  const res = await fetch(`${process.env.FACTORY_BASE_URL}/semantic/search`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.FACTORY_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: profileSummary, top_k: 5 })
  });
  if (!res.ok) throw new Error(`Factory error ${res.status}`);
  const data = await res.json();
  return (data.results || []).map((r: any, i: number) => ({ id: String(i), text: r.text }));
}
