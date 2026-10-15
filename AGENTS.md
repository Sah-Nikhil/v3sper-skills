# V3SPER Skills repo

This repo publishes agent skills. Package manager is **bun**.

## Layout

Every skill is a flat folder: `skills/<name>/SKILL.md`. The folder name is kebab-case and matches the frontmatter `name`. No bucket folders: a flat `skills/` lets the plugin manifest, the `skills` CLI, and every harness's recursive discovery see the same set. [ADR 0001](./.agents/adr/0001-distribution.md) records why.

Each skill also has `skills/<name>/agents/openai.yaml` with `interface.display_name` and `interface.short_description` for the Codex picker.

## Invocation

A skill is either model-invoked (default) or user-invoked:

- **Model-invoked**: omit `disable-model-invocation` and keep a `description` with rich trigger phrasing so the agent can reach for it.
- **User-invoked**: set `disable-model-invocation: true` in the frontmatter **and** `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. Keep the two in sync. The description becomes a one-line human summary.

## Adding or renaming a skill

1. Create `skills/<name>/SKILL.md` and `skills/<name>/agents/openai.yaml`.
2. Add `./skills/<name>` to the `skills` array in `.claude-plugin/plugin.json`.
3. Add a section to `README.md` under **Skills** that links `./skills/<name>/SKILL.md`.
4. Run `bun run check`.

## Releasing

Plugin installs only update when `.claude-plugin/plugin.json`'s `version` changes.

1. Bump `version` in `package.json` (semver).
2. Run `bun run sync-version`, then `bun run check`.
3. Commit and push. Plugin users get the update on their agent's next refresh. `skills` CLI users run `skills update`.

## Checks

- `bun run check`: frontmatter, folder names, `openai.yaml`, manifest sync, README links. This is the repo's lint step; there is no typecheck because there is no TypeScript.
- `claude plugin validate . --strict`: run after touching either file in `.claude-plugin/`.
- `bun run list`: confirms the `skills` CLI discovers every skill.

## Writing style

No em dashes anywhere: `SKILL.md` files, README, AGENTS.md, ADRs, code comments. `bun run check` enforces it. Rewrite the sentence with a colon, comma, period, or parentheses instead of swapping the character blindly. Use sentence-case headings and plain words.
