import { NextResponse } from "next/server";

export async function POST(req) {
  const { language, code } = await req.json();
  return NextResponse.json({
    output: `[stub] ${language} code pelam (${code.length} chars). Real run Step 3-e.`,
    phases: {
      tokens: "Lexer ekhono baki",
      parse: "Parser ekhono baki",
      ast: "AST ekhono baki",
      symbols: "Symbol table ekhono baki",
      semantic: "Semantic ekhono baki",
      tac: "TAC ekhono baki",
    },
  });
}