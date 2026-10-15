# 0002: CC BY-NC-SA 4.0 instead of MIT

Date: 2026-10-15

## Context

The repo started under MIT. MIT lets anyone resell the skills or ship them inside a paid product, and keeping the copyright notice is the only obligation. The author doesn't want the skills sold or passed off as someone else's work.

The skills are prose instructions, not software, so a Creative Commons license fits them better than a software license.

## Decision

License the whole repo under CC BY-NC-SA 4.0:

- **BY**: every copy or adaptation must credit Agent Skills by Nikhil "V3SPER" Sah.
- **NC**: no commercial use, which covers selling the skills and bundling them into a paid product.
- **SA**: adaptations must use the same license, so nobody can tweak a skill and relicense it as their own.

Each `SKILL.md` also carries `license` and `metadata.author` in its frontmatter, because the `skills` CLI copies skill folders without the root `LICENSE`.

## Consequences

- A license states terms; it doesn't block copying. Enforcement means a DMCA takedown or a direct request.
- CC BY-NC-SA is not an OSI open-source license. Some directories and companies that only accept OSI licenses may skip the repo.
- "Commercial" is judged case by case. Personal and workplace use of the skills is fine; reselling them is not.
- Commercial use needs a separate license from the author.
