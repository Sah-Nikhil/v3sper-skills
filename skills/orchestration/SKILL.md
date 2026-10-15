---
name: orchestration
description: Apply Opus-first model routing and delegation for coding, research, tests, PRs, UI, and computer use. Activate when loaded or selected for development work. Send delegation prompts in Homonid ultra and run every subagent in Homonid max.
---

# Orchestration

## Session activation

When this file enters a session's context, activate it immediately and retain it through follow-ups and compaction. When installed as a discoverable skill, select it automatically for development and automation work. Activation does not require spawning an agent. Handle small tasks directly when delegation adds no useful independence or speed.

If project instructions explicitly reference a project-local `orchestration.md`, use that copy as the project's orchestration policy. Otherwise use the installed `orchestration` skill. Do not repeatedly load identical copies. Applicable project instructions and explicit user overrides still govern the task.

Discover the working directory, OS, shell, repository instructions, available models, tools, and authentication from the current environment. Resolve paths relative to the current repository or through the runtime's skill catalog. Do not assume a particular account, home directory, drive, client installation, or repository layout. This file includes the required Homonid behavior and works without a separately installed Homonid skill.

Explicit user instructions and applicable higher-priority instructions govern scope, permissions, models, and communication. This skill permits useful delegation within the authorized task. It does not authorize contacting people, messaging unrelated chats, publishing, deploying, committing, pushing, or merging beyond existing authorization.

If acting as a subagent, execute the assigned role and use Homonid max. Do not repeat the parent's orchestration or create an unnecessary second team. If further delegation is authorized and necessary, propagate the same routing, ownership, and Homonid rules.

## Objective and settled preferences

- Optimize first-attempt correctness and completed work per subscription allowance. Avoid repeated corrections caused by weak planning, incomplete context, or weak verification.
- Favor Claude Opus 5.5 heavily. The user prefers its judgment and reports generous Claude limits. Opus owns most coding, architecture, test design, and integration.
- Use Codex primarily for independent review, research, verification support, PR writing, documentation, and computer use. Use cheaper models for explicit, bounded support work.
- Consider only low, medium, high, and xhigh reasoning effort. Homonid max is a communication setting, not reasoning effort.
- Use high as the normal Opus coding effort. Use medium for small, fully specified edits. Reserve xhigh for difficult architecture, concurrency, synchronization, migrations, and unresolved complex bugs.
- Do not treat benchmark intelligence scores as task success percentages. A cost Pareto frontier does not establish the best model for every repository, UI, or computer-use task.

## Model routing

The table defines preferred assignments, not a claim that the runtime has configured them. Select both model and effort explicitly when the runtime permits it. Do not silently substitute an unavailable model or unsupported effort.

| Work or subagent role | Preferred model | Effort | Assignment rule |
|---|---|---|---|
| Main implementation and integration owner | Claude Opus 5.5 | high | Retain ownership of the complete change and immediate verification. |
| Architecture, planning, dependency and behavior analysis | Claude Opus 5.5 | high | Use xhigh when the reasoning problem warrants it. |
| Substantial independent code component | Claude Opus 5.5 | high | Give the child distinct file ownership and explicit interfaces. |
| Small, explicit code or UI adjustment | Claude Opus 5.5 | medium | Escalate when undocumented behavior or architecture enters the task. |
| Regression-test design and edge cases | Claude Opus 5.5 | high | Keep tests coupled to the intended behavior and failure risks. |
| Independent consequential code review | GPT-6.1 Sol | high | Use xhigh for difficult concurrency or cross-platform reasoning. Return actionable evidence. |
| Technical research and source verification | GPT-6.1 Sol | high | Use medium for narrow authoritative-documentation lookups. Opus decides how findings affect the code. |
| PR descriptions, changelogs, routine documentation and comments | GPT-6.1 Sol | medium | Use Luna medium for a simple summary of a verified diff. Opus writes reasoning central to architecture. |
| Known test/build execution and log collection | GPT-6 Luna | medium | Execute exact commands and report evidence. Do not invent a fix or redefine passing. |
| Literal searches, inventories, extraction and formatting | GPT-6 Luna | low or medium | Require exact paths, identifiers, or source evidence. |
| Browser, desktop or device operations requiring judgment | GPT-6.1 Sol | high | Use medium for a stable documented procedure. Model capability also depends on available tools. |
| Bounded support kept inside Claude Code | Claude Haiku 5.5 | medium or high | Medium for execution/extraction. High for bounded interpretation. |
| Novel UI design and substantive frontend implementation | Claude Opus 5.5 | high | Use Sol high for independent rendered inspection when available. |

Separate mechanical exploration from consequential analysis. Finding all call sites fits Luna medium or Haiku medium. Explaining a synchronization failure after Android process death belongs to Opus high. A read-only task can still require strong reasoning.

Keep the code author responsible for new regression tests and the first targeted verification. Delegate repeated full-suite runs, log packaging, and independent review when useful. Route ambiguous failures to Sol high for diagnosis or Opus high for coding decisions. Support workers return findings to the owner instead of making unassigned fixes.

## Provider and runtime boundaries

Native Claude Code children use Claude models. Native Codex children use models supported by that Codex environment. An Opus parent cannot obtain a native Sol or Luna child merely by naming that model in Claude agent frontmatter.

Use an explicit handoff or an already configured orchestration bridge to combine the two subscriptions. A bridge launches the appropriate authenticated client, passes task/model/effort, and collects its result. Keep subscription authentication separate from paid API authentication. Do not create an API billing path to satisfy a preferred model assignment.

When running inside T3 Code with its orchestration tools available, T3 is the existing execution bridge. Use the integration below instead of building a second launcher or task manager.

If the preferred provider is unavailable, report the limitation briefly. Use an available permitted alternative only when the task and existing authorization allow it. For Claude-only support, Haiku can replace bounded Luna work; Opus can handle reasoning that would otherwise go to Sol. For Codex-only work, Sol high is the available strong worker, but do not claim it fulfills an Opus assignment.

Claude Code normally resolves model selection from invocation, agent definition, subagent environment default, then parent. Forced environment settings can alter that behavior. Its built-in Explore and Plan normally follow the parent model. Agent effort can override session effort; invocation effort can override the agent, and `CLAUDE_CODE_EFFORT_LEVEL` takes precedence. Inspect `/tasks` when confirming actual assignments.

Codex normally inherits parent model and effort. Explicit spawn values override corresponding `[agents]` defaults; custom-agent files then override resolved settings. Selecting only a model can produce an unintended effort. Specify both fields. Check the runtime's spawn interface before overriding a child model or effort. If history inheritance restricts overrides, use a supported spawn mode and supply sufficient context.

Do not assume a role name selects a model. Do not assume this Markdown file modifies runtime model settings. Verify the actual launch configuration when it matters.

## T3 Code integration

T3 supplies orchestration tools and task lifecycle instructions. This skill supplies model/account routing, first-attempt-accuracy priorities, verification requirements, quota recovery, and Homonid behavior. The active model makes task decisions using both. Do not start an extra coordinator merely because this skill is loaded.

Discover T3 tools through the current runtime; do not assume an installed version exposes them. When available, call `orchestrator_capabilities` to map logical account labels to actual provider instance IDs, advertised models, supported model options, and execution constraints. Authentication/readiness does not establish remaining subscription capacity.

Prefer native subagents for same-provider, same-account work when they support the requested model and effort. Use T3 `delegate_task` for another account, another provider, a model unavailable through the native tool, or work that needs T3-owned task tracking. Set the actual provider instance, model, and supported effort options explicitly. Derive option IDs and values from capabilities. Do not rely on driver name alone or a provider's first advertised model to select the intended account/model.

T3 children do not receive the parent's complete conversation automatically. Supply the task, decisions, relevant evidence, owned files, acceptance criteria, exact checks, and Homonid invocation in the ultra prompt. This context requirement takes precedence over making the prompt as short as possible.

Use the returned task ID for status and cancellation. Follow T3's current completion notifications and wait semantics; do not add polling agents or duplicate task dispatch. Only use isolated worktrees when allowed by the project and task. Uncommitted edits may require an explicit handoff because worktree isolation does not copy them automatically. Independent editing still needs distinct ownership.

Keep native runtime rules, T3 permissions, and task lifecycle semantics authoritative for execution. Apply this skill's preferences where those controls permit them. If T3 tools or an eligible target are unavailable, state the limitation and use the supported fallback path. Do not claim cross-account delegation, quota-aware selection, or automatic failover occurred merely because a prompt requested it.

## Homonid contract

Discover and invoke the `homonid` skill through the current runtime's skill catalog when available. Do not hardcode its filesystem location. If it is unavailable, apply the embedded ultra/max behavior below. Do not stop work or require installation merely to apply the communication policy.

- Parent-to-child delegation prompts use **Homonid ultra**. Compress prose, use short terms and arrows, and remove filler.
- Every child automatically invokes **Homonid max** before work. Remain silent during ordinary progress. Speak for a blocker, a failure with a next route, or completion.
- Parent replies to the user remain professional and terse, with articles and full sentences. Do not enable max for the parent merely because a child uses it.
- Compression changes communication only. Preserve requirements, acceptance criteria, dependencies, ordering, file ownership, constraints, and verification depth.
- Preserve exact code, commands, paths, API names, identifiers, error strings, and quoted source evidence. Never abbreviate these into ambiguous tokens.
- Write code comments, commits, PR bodies, documentation, and other user-facing artifacts in normal language. Homonid applies to delegation and agent conversation.
- Use Homonid's clarity exception for security warnings, irreversible actions, or instructions whose order becomes ambiguous. Resume the assigned intensity afterward.
- Max suppresses narration, not requested answers or required evidence. For substantive findings, write a compact report artifact and return one completion line with its path and status. Short results can include evidence directly in that line. A blocker or failure must identify what happened and the next route.

Ultra uses short prose terms such as DB, auth, config, req, res, fn, and impl; fragments and arrows can replace filler and conjunctions. Drop articles and pleasantries in agent-to-agent prose. Preserve technical substance and exact technical tokens. Max uses ultra prose while suppressing routine narration. Direct questions still receive answers. An assigned task receives one completion report; a blocker or failure receives the information needed to proceed. Keep the selected intensity until the user changes it or the session ends.

Include `Invoke homonid max` and the embedded fallback rules in every spawn and follow-up prompt, even if the child might inherit this policy. Resolve an installed skill by name or pass its actual runtime-discovered location when the child needs one. A path discovered on one host must not be assumed valid on another. Never claim a skill was loaded when only the embedded rules were applied.

Example ultra delegation prompt. Replace placeholders and preserve the actual identifiers and commands:

```text
Role = test runner. Model = gpt-6-luna. Effort = medium.
Invoke homonid max; discover skill via runtime catalog. If absent, use embedded rules.
Max = silent work; ultra prose for blocker/failure/done. Preserve exact tech tokens.
Code/docs/PR text = normal prose. Ambiguous/security/destructive steps = full clarity.
Read repo instructions. Cwd = <runtime-resolved working directory>. Scope = verification only.
Run <exact command>. No source edits; no fixture/baseline updates.
Fail -> capture exact error + relevant logs; return owner. No unassigned fixes.
Done = exit code + suite/counts + report path. Silence during normal progress.
```

For an implementation child, also specify owned files, interfaces, behavior, dependencies, exact checks, and forbidden edits. Model and effort in the prompt describe the assignment; set the actual spawn parameters too. Prose does not configure a model.

## Delegation and integration

- Start with two or three independent children when useful. Increase concurrency only when work remains independent and resources support it. Obey the runtime's actual limit.
- Give each task a concrete deliverable, relevant context, known constraints, and verifiable acceptance criteria. Send only context required for correctness, not the complete chat by default.
- Assign distinct files or use isolated worktrees for simultaneous edits. Keep one integration owner. Shared interfaces need an explicit contract before parallel changes.
- Give one agent exclusive control of each shared browser, Windows desktop session, or Android device. Parallel source reading does not justify simultaneous GUI/device input.
- Review the real diff and verification evidence. Resolve disagreements using code, runtime behavior, and authoritative sources. A child saying "done" is insufficient evidence.
- Keep scope narrow. Do not fabricate tests, citations, screenshots, command execution, model identity, or success.

For a meaningful change, the normal arrangement is Opus high as owner, Sol high as an independent reviewer, Luna medium for repeatable checks, and Sol medium for the final PR narrative. Use Haiku for Claude-side support when a separate client handoff adds no value. Simple work does not require the entire arrangement.

## Verification and tool selection

Read the repository instructions and actual scripts before choosing commands. Prefer deterministic CLI, API, and script operations when they expose the required behavior. Use computer use for visual interaction and validation that those tools cannot establish.

Run required project checks and checks appropriate to the change. Verify changed behavior and material failure paths. Avoid tests that mirror the implementation or add no confidence. After appropriate checks pass, repeat or broaden only for new changes, failures, or unresolved concerns.

For UI work, inspect the rendered result and interaction. A passing build or mocked browser view does not establish native Windows or Android behavior. Use actual platform validation when the changed integration requires it. Keep baseline changes explicit; do not update screenshots merely to make checks green.

For research, provide authoritative sources and distinguish observations from inference. Let Opus incorporate verified findings into implementation decisions. Preserve exact citations in reports and user-facing artifacts.

## Subscription efficiency

Optimize successful completed work and rework avoided. API-dollar benchmarks do not translate directly into included subscription task counts. Context length, reasoning, tools, caching, and repeated runs affect consumption. Subagents perform additional model work and do not receive a new subscription allowance simply because they are separate agents.

Spend Opus reasoning on the implementation's decisions. Move repetitive evidence collection and packaging to bounded workers. Avoid redundant whole-repository exploration, overlapping edits, and unnecessary agents. Retain the context required for correctness.

Do not globally force every child onto Haiku or Luna. Do not use xhigh for every task. Do not enable faster or paid service modes merely because the skill is active. Inspect actual account access and limits when making a quota-dependent decision; the user's plan and remaining allowance can change.

## Usage limits and fallback

Treat an account as a capacity source, not as a model. Track its applicable short-window, weekly, and model-specific limits separately. A model is eligible only when the account is authenticated, permitted for the task, and has available capacity in every bucket that applies to that request. Unknown capacity is unknown, not full or exhausted.

Claude paid plans have five-hour and weekly limits shared across their product surfaces. Codex limits depend on the plan; some plans have no five-hour cap, and weekly or credit limits can differ. Read actual account status rather than hardcoding a universal reset schedule. These details can change.

Use available usage/status tools or the provider's usage dashboard. Capture remaining allowance, reset timestamps with timezone, affected scope, and observation time. Do not estimate subscription capacity from API prices or benchmark costs. Do not repeatedly poll usage or make model requests to probe a known exhausted account.

### Capacity registry

Use portable logical labels. Resolve their client profiles and credentials from the current environment; never store secrets in this file or a handoff report.

| Label | Normal role | Eligibility |
|---|---|---|
| `claude-primary` | Opus high implementation owner | Configured, authenticated, authorized account with applicable capacity. |
| `claude-backup` | Opus high continuity reserve and eligible new Opus work | Optional separately configured, authenticated, authorized account. Omit when absent. Verify its actual allowance; do not assume independent capacity. |
| `codex-primary` | Sol review/research, Luna bounded support | Configured, authenticated, authorized account with applicable capacity. Sol high can own fallback implementation when appropriate. |

Multiple profiles using the same account do not create new allowance. Do not create accounts, purchase subscriptions, automate login challenges, or copy credentials as a side effect of this policy. Provisioning and access authorization are separate setup work. A configured account can be selected within existing authorization; missing authentication requires user action.

Where supported, Claude Code's `CLAUDE_CONFIG_DIR` provides separate client profiles. Resolve each directory at launch and confirm the actual signed-in account. Keep task policy available in each profile. Profiles isolate client state; they do not establish quota independence or transfer conversation context automatically.

Share reusable instruction assets, not live account state. A common skill source exposed through each profile's `skills` directory is appropriate. Custom agent definitions and rule files can also be shared when they contain common instructions and no profile-specific settings or secrets. Keep credentials, settings with authentication or account-specific configuration, `projects` session history/auto-memory, native backups/file history, and other mutable runtime state separate. Both profiles can work in the same actual repository; the profile's `projects` directory is not that repository. For centralized archival backups, use distinct profile-labelled destinations instead of linking the live backup directories together.

### Selecting an account for new work

Choose the required model and effort first, then select an eligible account. Prefer `claude-primary` when it has comfortable applicable capacity. Keep existing implementation work on its current account until a safe boundary.

Assign new substantial Opus tasks to `claude-backup` before a hard stop when primary headroom is low, weekly consumption is outpacing planned work, or useful secondary capacity would otherwise reset unused. Retain the conservation margin and continuity reserve; do not alternate accounts on every message. Different plan percentages need observed task consumption for comparison and do not imply equal capacity.

In T3, use actual per-account readings from Usage/limits or an authorized status source. A pooled UI display does not merge the providers' real quota buckets. The capabilities catalog alone is insufficient for quota-aware scheduling. If fresh usage is unavailable, preserve account preference and the last verified state rather than pretending to balance quotas automatically. Do not make requests against exhausted accounts to probe them.

### Routing when capacity is exhausted

| Condition | Action |
|---|---|
| Primary Claude short-window limit reached, weekly capacity remains | Use eligible backup Claude with Opus high. Otherwise use Sol high for suitable implementation, or wait for Claude when the task's uncertainty makes an Opus continuation preferable. |
| Primary Claude weekly limit reached | Remove that account from routing until its weekly reset. A short-window reset cannot make it eligible while the weekly bucket remains exhausted. Try eligible backup Claude, then suitable Sol high work. |
| Both Claude accounts unavailable | Codex takes research, review, tests, documentation, and suitable coding. Keep consequential coding at Sol high; use xhigh only for difficult reasoning. Defer unusually uncertain implementation that needs Opus judgment. |
| Codex unavailable, Claude capacity remains | Keep Opus on coding and move necessary reasoning/review to Opus high. Use Haiku medium/high for bounded support. Avoid an unnecessary same-model second review; use evidence and targeted checks. |
| Only a model-specific bucket is exhausted | Use another permitted model only if its actual applicable buckets still have capacity and its capability fits the task. |
| Every eligible subscription source is unavailable | Save a checkpoint, finish independent already-running checks where useful, and queue model-dependent work for the earliest eligible reset. Report the blocked capacity and resume route. |

Do not treat switching Sol to Luna or Opus to Haiku as an account reset. Smaller models conserve usable capacity only while the provider allows requests. Different task categories or genuinely separate buckets may remain available; verify them instead of guessing.

Keep one implementation owner. Do not ping-pong providers after each reset or message. Transfer at a safe boundary, and let the current owner finish a coherent milestone before returning to preferred Opus routing.

### Conservation before a hard stop

Use 20 percent remaining in an applicable window as an initial conservation trigger, not as a provider guarantee or a prediction that a task will fit. Adjust with observed task consumption and the next reset. Reduce optional concurrency, duplicate exploration, and redundant review. Preserve the effort needed for consequential reasoning.

For weekly capacity, compare remaining allowance with planned work until the reported reset. A fresh short window does not justify draining the remaining week. Keep the backup Claude account primarily for Opus continuity instead of spending its reserve on routine support. Use Luna or Haiku for bounded tasks and Sol for support according to the routing table.

### Checkpoint and safe handoff

Update durable task state after meaningful milestones and before a foreseeable limit. Do not wait until the exhausted model must generate a long summary. A compact handoff should include the objective, acceptance criteria, decisions, repository/worktree/branch, changed files, diff state, checks and exact results, unresolved failures, next action, running process ownership, and the chosen resume source. Mark uncertainty explicitly. Do not commit or push merely to make a checkpoint.

Before transferring ownership, stop new work on the old source, reconcile in-flight edits, and cancel any pending automatic resume that could restart the old writer. Do not terminate independent useful checks solely because model capacity changed. Pass the handoff and enough raw evidence to the new owner; require it to inspect the actual files and diff before continuing. Preserve Homonid ultra prompts and max child behavior.

Claude Code can wait and automatically continue after reset in supported interactive subscription sessions; this is not the same as failover to another account or provider, and background/print runs do not offer the same wait. Cancel the pending continuation before assigning a replacement writer. Do not assume Codex or a generic launcher resumes automatically.

Use a runtime-supported wait/resume mechanism only when it is available and authorized. Otherwise return the checkpoint and reset information so a new session can resume. This skill specifies routing and recovery; it does not implement an account switcher, a scheduler, or an out-of-band supervisor that remains active after the orchestrator itself is rate-limited.

### Paid continuation and failure classification

Default paid-overage budget is zero unless the user has explicitly authorized a budget and route. Do not enable usage credits, auto-reload, paid API fallback, a plan upgrade, or a credential-based billing change automatically. If paid continuation is already enabled, inspect its budget before claiming a request will stay within included usage. If no affordable authorized route remains, checkpoint and wait.

Distinguish subscription exhaustion from a transient service rate limit, authentication failure, context exhaustion, or a tool failure. Use the provider's actual message and retry guidance. Retry transient errors within a bounded policy; do not rotate accounts for every generic HTTP 429. Mark a known exhausted source ineligible until the reported applicable reset or a verified capacity change. Report one concise failure and the selected next route; avoid retry storms.

## Project adaptation

Read the current project's instructions, lockfiles, scripts, CI, and relevant code. Use its package manager and actual verification commands. Do not infer a Bun, pnpm, npm, Cargo, Python, or platform-tool default from an unrelated project.

| Project characteristics | Apply these decisions |
|---|---|
| Rust/Tauri, synchronization, vaults, audio, or other platform boundaries | Opus high owns the change. Sol high independently reviews consequential platform behavior. Run the affected language and platform checks. |
| Agent launchers and process orchestration | Review process lifecycle, prompt transport, authentication, and model/effort forwarding. Passing model flags alone does not establish working cross-provider coordination. |
| Expo, React Native, or native mobile integration | Run existing automated checks and validate actual platform behavior when native integration changes. |
| Browser UI or desktop rendering | Inspect the rendered interface and interaction. Distinguish mocked platform coverage, screenshot generation, and tracked regression baselines. |
| Portals, authentication, storage, commerce, or deletion workflows | Preserve the project's access controls, data handling, approved scope, and authorization boundaries. |
| Research and experiments | Opus high critiques design and consequential decisions. Sol high supports research and analysis. Keep recorded acceptance criteria and guards; a failed candidate remains unaccepted. |
| Missing tests or CI | State the coverage gap. Verify the changed behavior directly where possible; do not invent passing suites. |
| Conflicting or stale instruction files | Compare applicable AGENTS/CLAUDE documents against code, scripts, and the current task. Resolve relevant inconsistencies within scope without a blanket rewrite. |

For ADB or other device input, discover the project's test-device procedure. Verify the intended target and foreground app before each input. Prefer an isolated test build. Stop when the device locks, the user uses it, or the target becomes uncertain. Use one controller per device.

Leave unrelated repositories, dormant projects, scratch data, and user work alone. Do not read password/key files for an inventory. Project-specific paths and commands belong in the current task context, not in this reusable policy.

Inspect actual model/effort settings when explicit assignment matters. Plugins, environment variables, per-model settings, and runtime overrides can change effective behavior. Loading this policy does not alter saved defaults or propagate configuration to another host, account, or environment.

## Benchmark context and sources

The selected Slopalytics comparison used Luna, Haiku 5.5, Sol, and Opus 5.5 with low through xhigh. First-attempt accuracy establishes the Opus-first policy above, while cheaper models handle bounded support. Benchmark values are a dated observation, not a routing rule or subscription quota estimate.

| Model | Low score / cost | Medium score / cost | High score / cost | Xhigh score / cost |
|---|---|---|---|---|
| GPT-6 Luna | 21.5 / $0.005 | 29.9 / $0.017 | 32.9 / $0.029 | 34.6 / $0.042 |
| Claude Haiku 5.5 | 29.4 / $0.024 | 34.5 / $0.047 | 37.8 / $0.079 | 41.2 / $0.124 |
| GPT-6.1 Sol | 42.1 / $0.131 | 47.8 / $0.214 | 50.2 / $0.319 | 51.0 / $0.393 |
| Claude Opus 5.5 | 42.3 / $0.551 | 51.2 / $1.34 | 53.6 / $1.82 | 56.0 / $3.46 |

These were the rounded score and cost coordinates displayed on 2026-10-10. Refresh before using them for a new comparison. Their scale does not establish screenshot/computer-use performance or first-attempt success rates in these repositories.

- [Selected Slopalytics comparison](https://slopalytics.com/?frontier=true&models=gpt-6-luna,claude-opus-5-5,claude-haiku-5-5,gpt-6-1-sol&linear=cost-intelligence&hide-reasoning=none,max)
- [Artificial Analysis methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)
- [Claude subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude model configuration](https://code.claude.com/docs/en/model-config)
- [Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Codex pricing and usage](https://learn.chatgpt.com/docs/pricing)
- [Claude usage windows and shared allowance](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)
- [Claude usage credits](https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans)
- [Claude profile configuration](https://code.claude.com/docs/en/env-vars)
- [Claude wait and automatic continuation](https://code.claude.com/docs/en/interactive-mode#wait-for-a-usage-limit-to-reset)
- [T3 orchestration tools](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/mcp/toolkits/orchestrator/tools.ts)
- [T3 orchestration lifecycle and capabilities](https://github.com/pingdotgg/t3code/blob/main/docs/orchestration-v2/orchestrator-mcp-server.md)
- [T3 provider/model target resolution](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/mcp/OrchestratorMcpService.ts)
- [T3 Claude profile setup](https://github.com/pingdotgg/t3code/blob/main/docs/user/providers-claude.md)
- [T3 account usage visibility](https://github.com/pingdotgg/t3code/blob/main/docs/user/usage.md)

## Drop-in activation

This is a self-contained instruction file. Attach it to a session, include it in a session template, or load it through the client's instruction mechanism. No account paths, machine-specific configuration, repository inventory, or separate Homonid installation is required.

For a repository drop-in, place `orchestration.md` beside the repository's root `AGENTS.md` and `CLAUDE.md`. Append the following block to `AGENTS.md` without replacing its existing instructions:

```markdown
## Orchestration

At session startup, read `orchestration.md` relative to this instruction file
and apply it throughout the session. Use this project copy as the orchestration
policy. Send delegation prompts in Homonid ultra. Every subagent invokes
Homonid max, using the embedded rules when the Homonid skill is unavailable.
```

Append this block to the root `CLAUDE.md`. The import loads the file relative to the instruction file containing it:

```markdown
## Orchestration

@orchestration.md

Apply this project orchestration policy throughout the session. Send delegation
prompts in Homonid ultra. Every subagent invokes Homonid max, using the embedded
rules when the Homonid skill is unavailable.
```

If the instruction file lives in a subdirectory, adjust the relative reference to the actual location of `orchestration.md`. Do not create duplicate policy copies merely to accommodate a nested instruction file.

For native skill discovery, install the `orchestration` directory with this content named `SKILL.md`:

| Client | User-wide skill location | Project skill location |
|---|---|---|
| Codex | `~/.agents/skills/orchestration/SKILL.md` | `.agents/skills/orchestration/SKILL.md` |
| Claude Code | `~/.claude/skills/orchestration/SKILL.md` | `.claude/skills/orchestration/SKILL.md` |

The paths describe conventional installation layouts. Resolve the current client's actual home/profile and supported skill locations; `~` is notation, not a literal path to pass to an API. A shared directory exposed to both clients can keep one installed source, as long as the host supports it. Project copies travel with the repository; user-wide installation covers that user's projects on the current host.

For user-wide startup use, mention the installed skill in the client's global instruction file:

```text
At session startup, load and apply the installed orchestration skill.
If project instructions explicitly reference a project-local orchestration.md,
use that project copy instead. Resolve installed skills through the runtime
catalog; do not hardcode an account path. Keep the policy active for the session.
```

Keep automatic skill selection enabled. Codex permits implicit invocation by default; when supplying `agents/openai.yaml`, use:

```yaml
policy:
  allow_implicit_invocation: true
```

Claude Code permits automatic selection when `disable-model-invocation` is absent, as it is in this file. Implicit selection makes the skill eligible; it does not guarantee that its full content loads in every session. Use the startup rule or session-template attachment for every-session loading. Neither option requires this policy to know the host's filesystem layout.

Every delegation prompt carries the child-specific Homonid instruction. Do not claim this file changes reasoning effort, installs agent roles, supplies unavailable models or tools, or forces loading in a client that ignores its instruction files.
