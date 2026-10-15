#!/usr/bin/env bash
# macOS/Linux twin of link-skills.ps1. Symlinks every skill in this repo into
# ~/.claude/skills, ~/.agents/skills, and $CLAUDE_CONFIG_DIR/skills when set.
# A real folder with the same name is skipped unless you pass --force, which
# renames it to <name>.bak-<timestamp> first.
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
FORCE=0
[ "${1:-}" = "--force" ] && FORCE=1

DESTS=("$HOME/.claude/skills" "$HOME/.agents/skills")
[ -n "${CLAUDE_CONFIG_DIR:-}" ] && DESTS+=("$CLAUDE_CONFIG_DIR/skills")

for DEST in "${DESTS[@]}"; do
  mkdir -p "$DEST"
  for src in "$REPO"/skills/*/; do
    src="${src%/}"
    [ -f "$src/SKILL.md" ] || continue
    target="$DEST/$(basename "$src")"
    if [ -e "$target" ] && [ ! -L "$target" ]; then
      if [ "$FORCE" -ne 1 ]; then
        echo "skip    $target is a real folder (use --force to back it up)" >&2
        continue
      fi
      mv "$target" "$target.bak-$(date +%Y%m%d%H%M%S)"
    fi
    ln -sfn "$src" "$target"
    echo "linked  $target -> $src"
  done
done
