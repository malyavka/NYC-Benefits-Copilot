import React from "react";
import { BenefitProgram } from "../lib/types";

export default function ProgramCard({ p }: { p: BenefitProgram }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="mb-1 text-lg font-semibold leading-tight">{p.name}</div>
      {p.agency && <div className="text-sm text-neutral-500 mb-2">{p.agency}</div>}
      <p className="text-sm text-neutral-800">{p.summary}</p>

      <div className="mt-3">
        <div className="text-sm font-semibold">Eligibility:</div>
        <ul className="mt-1 list-disc pl-5 text-sm text-neutral-800 space-y-1">
          {p.eligibilityBullets.slice(0, 4).map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {p.sources.map((s, i) => (
          <a key={i} href={s.url} target="_blank" className="text-sm underline text-blue-700 hover:text-blue-900">
            {s.title}
          </a>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <a
            href={p.applyUrl}
            target="_blank"
            className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-neutral-50"
          >
            Apply Now
          </a>
          <button className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white hover:opacity-90" type="button">
            Explain with AI
          </button>
        </div>
      </div>
    </div>
  );
}
