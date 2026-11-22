"use client";
import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import PhaseTabs from "../components/PhaseTabs";

const TEMPLATES = {
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}\n`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`,
};

export default function Home() {
  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState(TEMPLATES.c);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [phases, setPhases] = useState(null);
  const [loading, setLoading] = useState(false);

  function changeLanguage(lang) {
    setLanguage(lang);
    setCode(TEMPLATES[lang]);
  }

  async function runCode() {
    setLoading(true);
    setOutput("Running...");
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, stdin }),
      });
      const data = await res.json();
      setOutput(data.output ?? "");
      setPhases(data.phases ?? null);
    } catch (e) {
      setOutput("Error: " + e.message);
    }
    setLoading(false);
  }

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-xl font-bold">Mini Online Compiler</h1>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border rounded px-2 py-1 text-black"
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <button
          onClick={runCode}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          {loading ? "Running..." : "Run"}
        </button>
      </div>

      <CodeEditor language={language} value={code} onChange={setCode} />

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div>
          <h2 className="font-semibold">Input (stdin)</h2>
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            className="w-full h-28 border rounded p-2 text-black"
          />
        </div>
        <div>
          <h2 className="font-semibold">Output</h2>
          <pre className="h-28 p-2 bg-black text-white rounded overflow-auto">{output}</pre>
        </div>
      </div>

      <PhaseTabs data={phases} />
    </main>
  );
}