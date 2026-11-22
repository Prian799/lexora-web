"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ language, value, onChange }) {
  const monacoLang = { c: "c", cpp: "cpp", java: "java" }[language];
  return (
    <Editor
      height="60vh"
      theme="vs-dark"
      language={monacoLang}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      options={{ fontSize: 14, minimap: { enabled: false } }}
    />
  );
}