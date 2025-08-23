import { braveSearch } from "@/lib/brave";
import { z } from "zod";

const Schema = z.object({
  query: z.string().min(3),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = Schema.parse(body);
    const results = await braveSearch(query);
    return Response.json({ ok: true, results });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 400 });
  }
}
