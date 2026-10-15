# Agent Skills by Nikhil "V3SPER" Sah

Skills I use every day with Claude Code, Codex, and other coding agents. They help with two things: getting more finished work out of a subscription, and keeping agent conversation short without losing technical detail.

Each skill is one folder holding a `SKILL.md`, so you can read it, fork it, and change it. The skills work alone, and they work better as a pair: `orchestration` sends delegation prompts in Homonid ultra and runs every subagent in Homonid max.

## Install

Pick **one** route per agent. Installing both the plugin and the copied files gives you every skill twice.

### Any agent, one command

The [`skills`](https://skills.sh) CLI copies the skills into your agent's skill folder. Use whichever package runner you already have:

```bash
bunx skills@latest add Sah-Nikhil/v3sper-skills
```

```bash
npx skills@latest add Sah-Nikhil/v3sper-skills
```

```bash
pnpm dlx skills@latest add Sah-Nikhil/v3sper-skills
```

The installer asks which agents and skills you want. Useful flags:

| Flag | Effect |
| --- | --- |
| `-g` | Install for your user (every project) instead of the current project |
| `-a <agent>` | Preselect agents, e.g. `-a claude-code`, `-a codex`, `-a '*'` |
| `--skill <name>` | Take one skill, e.g. `--skill homonid` |
| `-y` | Skip the prompts |

Copied files don't update themselves. Run `bunx skills@latest update` to pull changes, and re-run `add` to pick up new skills.

### Claude Code plugin (updates itself)

```bash
claude plugin marketplace add Sah-Nikhil/v3sper-skills
claude plugin install v3sper-skills@v3sper
```

### Codex plugin (updates itself)

```bash
codex plugin marketplace add Sah-Nikhil/v3sper-skills
codex plugin add v3sper-skills@v3sper
```

### From a clone (for editing the skills)

Link the repo's skills into `~/.claude/skills` and `~/.agents/skills` so edits and `git pull` apply straight away:

```powershell
git clone https://github.com/Sah-Nikhil/v3sper-skills
cd v3sper-skills
bun run link            # Windows: directory junctions, no admin needed
```

On macOS or Linux, run `scripts/link-skills.sh` instead. Both scripts skip a real folder that already has the skill's name. Pass `-Force` (PowerShell) or `--force` (bash) to rename that folder to `<name>.bak-<timestamp>` and link in its place.

## Skills

### [homonid](./skills/homonid/SKILL.md)

Compressed communication mode. The agent drops articles, filler, pleasantries, and hedging, and keeps every technical term, code block, and error string exact. It cuts output tokens by about 75%.

| Level | What changes |
| --- | --- |
| `lite` | No filler or hedging. Full sentences stay. |
| `full` | Default. Drops articles, allows fragments. |
| `ultra` | Abbreviates prose words (DB, auth, fn), uses arrows for causality. |
| `max` | Silent by default. Speaks only when blocked, when something fails, or when work is done. |

Type `/homonid` or `/homonid ultra`, or say "be brief". It turns itself off on "stop homonid" or "normal mode". Security warnings and irreversible-action confirmations always come through in plain language.

### [orchestration](./skills/orchestration/SKILL.md)

Model routing and delegation policy for multi-agent work. Claude Opus owns implementation and architecture. Codex (Sol and Luna) handles independent review, research, test runs, and PR writing. Haiku takes bounded support work inside Claude Code. The skill covers:

- which model and reasoning effort each role gets
- how to write delegation prompts (Homonid ultra) and how children report back (Homonid max)
- verification before anything is called done
- subscription limits: conservation thresholds, failover between accounts, and checkpoints before a hard stop
- T3 Code integration when its orchestration tools are present

The agent loads it automatically for development work. To force it on for every session, reference it from your global `CLAUDE.md` or `AGENTS.md` (see the skill's "Drop-in activation" section).

## Repo layout

```
skills/<name>/SKILL.md            the skill itself
skills/<name>/agents/openai.yaml  Codex picker metadata and invocation policy
.claude-plugin/plugin.json        plugin manifest, lists every skill
.claude-plugin/marketplace.json   makes this repo its own plugin marketplace
scripts/                          checks, version sync, local linking
```

## Contributing

See [AGENTS.md](./AGENTS.md) for the rules on adding a skill and releasing a version. Run `bun run check` before you open a PR.

## License

[CC BY-NC-SA 4.0](./LICENSE). You can use, share, and adapt these skills for free, including at work, as long as you:

- credit **Agent Skills by Nikhil "V3SPER" Sah** and link this repo
- don't sell them or use them for commercial advantage, alone or bundled into a paid product
- release any adapted version under the same license

For commercial licensing, open an issue or contact me through [GitHub](https://github.com/Sah-Nikhil).
