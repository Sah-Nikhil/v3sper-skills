# 0001: Flat skills folder, three install routes

Date: 2026-10-15

## Context

The repo is modeled loosely on [mattpocock/skills](https://github.com/mattpocock/skills), which groups skills into bucket folders (`engineering/`, `productivity/`, `misc/`, ...) and ships them as a Claude Code plugin plus a `skills` CLI install. That repo's own ADR notes the buckets block a native Codex plugin, because Codex takes a single skills path and drops symlinks.

This repo has two skills today and no non-shipped ones.

## Decision

- Keep skills flat at `skills/<name>/`. Every skill in `skills/` ships. Drafts live on a branch, not in a non-shipped folder.
- Offer three install routes, and tell users to pick one per agent:
  1. `skills` CLI (`bunx`, `npx`, or `pnpm dlx skills@latest add Sah-Nikhil/v3sper-skills`) for any agent, as copied, editable files.
  2. Claude Code plugin from this repo's own marketplace (`.claude-plugin/marketplace.json`, marketplace name `v3sper`, plugin `v3sper-skills`).
  3. Codex plugin from the same marketplace.
- For local editing, `scripts/link-skills.ps1` (Windows junctions) and `scripts/link-skills.sh` link the repo into `~/.claude/skills` and `~/.agents/skills`.
- Release with plain semver in `package.json`, copied into `plugin.json` by `scripts/sync-version.mjs`. No changesets until there are enough releases to need a changelog generator.

## Consequences

- One source of truth for the skill set: the folder listing. `scripts/check.mjs` fails if `plugin.json` or the README drift from it.
- The plugin and the `skills` CLI both read the same files, so there is no build step.
- The GitHub repo must be public for other people to use the `skills` CLI and plugin routes.
