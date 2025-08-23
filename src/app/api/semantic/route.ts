import { z } from "zod";
import { semanticMatch } from "@/lib/factory";

const Schema = z.object({ profile: z.object({}).passthrough() });

export async function POST(req: Request) {
  try {
    const { profile } = Schema.parse(await req.json());
    const summary = `Income $${profile.income}; Borough ${profile.borough}; HH ${profile.householdSize}; Visa ${profile.immigrationStatus ?? "n/a"}`;
    const results = await semanticMatch(summary);
    return Response.json({ ok: true, results });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 400 });
  }
}
