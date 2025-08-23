"use client";

import React, { useState, useEffect } from "react";
import ProgramCard from "./ProgramCard";
import { BenefitProgram } from "../lib/types";

const START_EXAMPLE = "I live in Harlem, make $28k, have one child.";

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState(START_EXAMPLE);
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<BenefitProgram[]>([]);

  useEffect(() => setMounted(true), []);

  async function run() {
    setLoading(true);
    try {
      // Ground at least one source via Brave (works when key added)
      let sources: { title: string; url: string }[] = [];
      try {
        const q = "site:nyc.gov SNAP eligibility NYC HRA";
        const resp = await fetch("/api/search", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        const { results } = await resp.json();
        sources = (results || []).slice(0, 3).map((r: any) => ({ title: r.title, url: r.url }));
      } catch { /* ok without key */ }

      // Demo cards
      const items: BenefitProgram[] = [
        {
          id: "snap",
          name: "SNAP — Food Assistance",
          agency: "NYC HRA",
          summary: "Monthly food assistance for eligible low-income households in NYC.",
          eligibilityBullets: [
            "Income-based; household size considered",
            "NYC residency",
            "Citizenship/eligible immigration status",
            "ID + proof of income required",
          ],
          applyUrl: "https://www.nyc.gov/site/hra/help/snap-benefits-food-program.page",
          sources: sources.length ? sources : [{ title: "NYC HRA — SNAP", url: "https://www.nyc.gov/site/hra/help/snap-benefits-food-program.page" }],
        },
        {
          id: "ccs",
          name: "Child Care Subsidy",
          agency: "NYC ACS",
          summary: "Helps eligible families pay for child care so parents can work or attend school.",
          eligibilityBullets: [
            "Income limits by household size",
            "NYC residency and child's age",
            "Work, training, or education participation",
            "Documents: ID, income, child's birth certificate",
          ],
          applyUrl: "https://www.nyc.gov/site/acs/early-care/child-care-apply.page",
          sources: [{ title: "NYC ACS — Apply for Child Care", url: "https://www.nyc.gov/site/acs/early-care/child-care-apply.page" }],
        },
        {
          id: "housing-connect",
          name: "Housing Connect — Affordable Housing",
          agency: "NYC HPD",
          summary: "Portal for applying to NYC affordable housing lotteries with income-based eligibility.",
          eligibilityBullets: [
            "Income within required % of Area Median Income (AMI)",
            "Household size and unit availability",
            "Screening by property managers",
            "Apply online; documents required if selected",
          ],
          applyUrl: "https://housingconnect.nyc.gov/PublicWeb",
          sources: [{ title: "NYC Housing Connect", url: "https://housingconnect.nyc.gov/PublicWeb" }],
        },
      ];

      setPrograms(items);
    } finally {
      setLoading(false);
    }
  }

  // First paint skeleton (prevents layout shift)
  if (!mounted) {
    return (
      <div className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3">
          <div className="px-4 py-3 rounded-lg bg-neutral-100 animate-pulse" />
          <div className="px-6 py-3 rounded-lg bg-neutral-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Input row like the mockup */}
      <div className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="text-sm font-medium text-neutral-700 md:w-56">
            Describe your situation
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border bg-white"
            placeholder="I live in Harlem, make $29k, have one child."
          />
          <button
            onClick={run}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black text-white font-medium"
          >
            {loading ? "Finding…" : "Find Benefits"}
          </button>
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Example: <span className="italic">{START_EXAMPLE}</span>
        </p>
      </div>

      {/* Cards grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map((p) => <ProgramCard key={p.id} p={p} />)}
      </div>

      {/* Empty state before search */}
      {!loading && programs.length === 0 && (
        <div className="text-neutral-500 text-center mt-8">
          Ready to discover your benefits? Enter your situation above and click{" "}
          <span className="font-medium">Find Benefits</span>.
        </div>
      )}
    </div>
  );
}
