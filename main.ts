// Copies the entry image into the output directory.
//
// The image lives beside this file in the repository. The grader reads
// whatever this program leaves in MAKEFUN_OUTPUT_DIR, falling back to
// /output when that variable is not set. The copy is byte for byte, so
// two runs always produce identical output.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const targetDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const source = join(here, "entry.png");
const target = join(targetDir, "entry.png");

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);

// Fail loudly instead of leaving a partial copy behind: the copied
// file must be exactly the size of the source.
if (statSync(source).size !== statSync(target).size) {
  throw new Error("entry.png copy is incomplete");
}
