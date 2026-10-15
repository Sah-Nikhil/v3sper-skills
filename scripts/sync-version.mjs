#!/usr/bin/env bun
// Copies package.json's version into .claude-plugin/plugin.json.
// Plugin installs only pick up an update when that version changes, so bump
// package.json, then run `bun run sync-version`.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const pluginPath = join(repo, ".claude-plugin", "plugin.json");

const { version } = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const source = readFileSync(pluginPath, "utf8");
const current = JSON.parse(source).version;

if (current === version) {
  console.log(`plugin.json already at ${version}`);
  process.exit(0);
}

// Rewrite only the version line so key order and formatting survive.
writeFileSync(pluginPath, source.replace(/("version"\s*:\s*")[^"]*(")/, `$1${version}$2`));
console.log(`plugin.json ${current} -> ${version}`);
