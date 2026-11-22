"use client";
import { useState } from "react";

const PHASES = [
  { key: "tokens", label: "1. Lexical" },
  { key: "parse", label: "2. Syntax" },
  { key: "ast", label: "3. AST" },
  { key: "symbols", label: "4. Symbol Table" },
  { key: "semantic", label: "5. Semantic" },
  { key: "tac", label: "6. TAC" },
];

export default function PhaseTabs({ data }) {
  const [active, setActive] = useState("tokens");
  const content = data?.[active];

  return (
    <div className="mt-4">
      <div className="flex gap-2 flex-wrap">
        {PHASES.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className={`px-3 py-1 rounded ${
              active === p.key ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <pre className="mt-2 p-3 bg-gray-900 text-green-300 rounded min-h-[150px] overflow-auto">
        {content
          ? typeof content === "string"
            ? content
            : JSON.stringify(content, null, 2)
          : "Ekhono kono output nai. Run koro."}
      </pre>
    </div>
  );
}