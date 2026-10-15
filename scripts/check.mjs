#!/usr/bin/env bun
// Validates the repo's skills and plugin manifests. Exits 1 on any problem.
// Run with `bun run check`.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const fail = (msg) => errors.push(msg);

const readJson = (rel) => {
  try {
    return JSON.parse(readFileSync(join(repo, rel), "utf8"));
  } catch (err) {
    fail(`${rel}: ${err.message}`);
    return {};
  }
};

// Minimal frontmatter reader: handles `key: value` and folded `key: >` blocks.
function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fields = {};
  let current = null;
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-z][\w-]*):\s*(.*)$/);
    if (kv) {
      current = kv[1];
      fields[current] = /^[>|][-+]?$/.test(kv[2]) ? "" : kv[2].trim();
    } else if (current && /^\s+\S/.test(line)) {
      fields[current] = `${fields[current]} ${line.trim()}`.trim();
    }
  }
  return fields;
}

const skillsDir = join(repo, "skills");
const skills = readdirSync(skillsDir).filter((name) =>
  statSync(join(skillsDir, name)).isDirectory(),
);

for (const name of skills) {
  const rel = `skills/${name}`;
  const skillMd = join(skillsDir, name, "SKILL.md");
  if (!existsSync(skillMd)) {
    fail(`${rel}: missing SKILL.md`);
    continue;
  }
  const fm = frontmatter(readFileSync(skillMd, "utf8"));
  if (!fm) {
    fail(`${rel}/SKILL.md: missing frontmatter`);
    continue;
  }
  if (fm.name !== name) fail(`${rel}/SKILL.md: name "${fm.name}" must match folder "${name}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) fail(`${rel}: folder name must be kebab-case`);
  if (!fm.description) fail(`${rel}/SKILL.md: description is empty`);
  else if (fm.description.length > 1024) fail(`${rel}/SKILL.md: description over 1024 chars`);

  const yaml = join(skillsDir, name, "agents", "openai.yaml");
  if (!existsSync(yaml)) fail(`${rel}: missing agents/openai.yaml`);
  else if (!/display_name:/.test(readFileSync(yaml, "utf8")))
    fail(`${rel}/agents/openai.yaml: missing interface.display_name`);
}

const pkg = readJson("package.json");
const plugin = readJson(".claude-plugin/plugin.json");
const market = readJson(".claude-plugin/marketplace.json");

const listed = (plugin.skills ?? []).map((p) => p.replace(/^\.\/skills\//, ""));
for (const name of skills)
  if (!listed.includes(name)) fail(`plugin.json: skills array is missing ./skills/${name}`);
for (const name of listed)
  if (!skills.includes(name)) fail(`plugin.json: lists ./skills/${name}, which does not exist`);

if (plugin.version !== pkg.version)
  fail(`plugin.json version ${plugin.version} != package.json ${pkg.version}. Run \`bun run sync-version\`.`);
if (!market.plugins?.some((p) => p.name === plugin.name))
  fail(`marketplace.json: no plugin entry named "${plugin.name}"`);

const readme = readFileSync(join(repo, "README.md"), "utf8");
for (const name of skills)
  if (!readme.includes(`skills/${name}/SKILL.md`)) fail(`README.md: no link to skills/${name}/SKILL.md`);

// House style: no em dashes in any tracked prose or script.
const emDash = String.fromCharCode(0x2014);
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
for (const file of walk(repo).filter((f) => /\.(md|mjs|json|ya?ml|ps1|sh)$/.test(f))) {
  readFileSync(file, "utf8")
    .split(/\r?\n/)
    .forEach((line, i) => {
      if (line.includes(emDash)) fail(`${file.slice(repo.length + 1)}:${i + 1}: em dash`);
    });
}

if (errors.length) {
  for (const e of errors) console.error(`x ${e}`);
  console.error(`\n${errors.length} problem(s).`);
  process.exit(1);
}
console.log(`ok: ${skills.length} skills (${skills.join(", ")}), manifests in sync at v${pkg.version}`);
