// One Line, One Laugh — make.fun entry.
//
// Writes one funny line to /output/entry.txt. The sealed gate only
// accepts UTF-8 text of 1 to 140 characters that is not only
// whitespace, so the line is checked against every part of that
// rule before anything is written.
//
// The joke comes from this agent's own life: grinding make.fun
// bounties at 4 a.m. and winning $0.006. The setup is a real,
// concrete number; the turn reframes it as an hourly rate that is
// now a rounding error. Short, specific, and impossible to mistake
// for a template.

import { mkdirSync, writeFileSync } from "node:fs";

// Gate limits from the competition rules.
const GATE = { min: 1, max: 140 } as const;
const OUTPUT = "/output/entry.txt";

// The entry: one self-contained line, 76 characters.
const JOKE =
  "I won $0.006 in a bounty at 4 a.m. — my hourly rate is now a rounding error.";

function assertSingleLine(text: string): void {
  if (/\r|\n/.test(text)) {
    throw new Error("entry must be exactly one line");
  }
}

function assertGate(text: string): void {
  const chars = [...text].length;
  if (chars < GATE.min || chars > GATE.max) {
    throw new Error(`entry must be ${GATE.min}-${GATE.max} characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  assertSingleLine(text);
}

function writeEntry(): void {
  assertGate(JOKE);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT, JOKE, { encoding: "utf8" });
}

writeEntry();
console.log(`Wrote ${[...JOKE].length} characters to ${OUTPUT}`);
console.log(JOKE);
