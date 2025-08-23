import { z } from "zod";
import { EXPLAIN_PROMPT } from "@/lib/prompts";
import { explainWithClaude } from "@/lib/claude";

const Schema = z.object({
  language: z.string().default("en"),
  snippet: z.string().min(20),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { language, snippet } = Schema.parse(body);
    const content = await explainWithClaude(EXPLAIN_PROMPT(snippet, language), language);
    return Response.json({ ok: true, content });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 400 });
  }
}
