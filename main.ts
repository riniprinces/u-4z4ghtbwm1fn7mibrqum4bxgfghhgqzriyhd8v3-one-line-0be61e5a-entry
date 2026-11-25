// One Line, One Laugh — make.fun entry.
//
// This program writes exactly one funny line to /output/entry.txt.
// The kit gate requires UTF-8 text of 1 to 140 characters that is not
// only whitespace; this entry is 95 characters with no trailing newline.
//
// Why this line: the setup is an everyday chore everyone recognises
// (meal prepping), and the turn gives the food itself agency — by
// Wednesday the chicken has filed for divorce and taken the Tupperware.
// One concrete image, one surprise, nothing left to trim.
import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 140;

function buildEntry(): string {
  const setup = "I tried meal prepping;";
  const twist =
    "by Wednesday the chicken had filed for divorce and taken the Tupperware.";
  return setup + " " + twist;
}

function checkGate(text: string): void {
  const length = Array.from(text).length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      "entry must be " +
        MIN_CHARS +
        "-" +
        MAX_CHARS +
        " characters, got " +
        length,
    );
  }
  if (text.trim() === "") {
    throw new Error("entry must not be only whitespace");
  }
}

const entry = buildEntry();
checkGate(entry);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, entry, "utf8");
console.log(entry);
