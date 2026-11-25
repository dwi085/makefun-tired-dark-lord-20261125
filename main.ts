// The Tired Dark Lord — a 100-word villain monologue.
// Entry for make.fun bounty u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb.
// The program writes exactly one monologue to /output/entry.txt.
// The monologue is a fixed string: the grader runs the program twice and the
// two outputs must be byte-identical, so there is no randomness, no clock,
// no environment input — just the text, written once, written the same way.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MONOLOGUE =
  "Hero. Sit. No\u2014don't kneel, the floor is filthy and my knees stopped " +
  "forgiving me centuries ago. You came for the sword, the girl, the " +
  "kingdom\u2014take a number, hero. The dragon in the hall has been waiting since " +
  "last Tuesday. I built this empire on a prophecy and a pension plan, and the " +
  "prophecy paid better. My last champion retired to a cottage. My " +
  "treasurer eloped with the tithes. Even the ravens send their regards by " +
  "post now. So. Strike, or pour the tea. The candles are nearly all gone, " +
  "and I have forgotten which of us they were lit for.";

function main(): void {
  // The sealed gate accepts 1-600 UTF-8 characters, not only whitespace.
  // Refuse to write anything that would fail it, instead of failing silently.
  const text = MONOLOGUE + "\n";
  if (text.length < 1 || text.length > 600 || text.trim().length === 0) {
    throw new Error(`entry length ${text.length} is outside the 1-600 gate`);
  }
  const words = MONOLOGUE.split(/\s+/).filter(Boolean).length;
  if (words < 90 || words > 110) {
    throw new Error(`monologue is ${words} words, expected about 100`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
