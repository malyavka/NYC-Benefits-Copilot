import React from "react";
import { BenefitProgram } from "../lib/types";

export default function ProgramCard({ p }: { p: BenefitProgram }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{p.name}</h3>
        {p.agency && (
          <div className="text-sm text-gray-600 mb-2">{p.agency}</div>
        )}
        <p className="text-sm text-gray-700 leading-relaxed">{p.summary}</p>
      </div>

      <div className="mb-4">
        <ul className="space-y-1">
          {p.eligibilityBullets.slice(0, 2).map((bullet, i) => (
            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        {p.applyUrl && (
          <a
            href={p.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Apply Now
          </a>
        )}
        <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
          Explain with AI
        </button>
      </div>
    </div>
  );
}
