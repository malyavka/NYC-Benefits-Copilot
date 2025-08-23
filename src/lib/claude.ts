export async function explainWithClaude(raw: string, language = "en") {
  const key = process.env.ANTHROPIC_API_KEY!;
  const body = {
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 900,
    temperature: 0.2,
    messages: [
      { role: "system", content: "You are an accurate NYC benefits explainer. Never fabricate." },
      { role: "user", content: [{ type: "text", text: `"""${raw}"""` }] },
    ],
  };

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Claude error ${res.status}`);
  const data = await res.json();
  const text = data.content?.[0]?.text || "";
  return text;
}
