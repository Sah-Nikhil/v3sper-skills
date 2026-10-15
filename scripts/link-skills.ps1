# Links every skill in this repo into local agent skill directories, so the
# repo becomes the single source of truth and `git pull` updates installs.
#
#   ~/.claude/skills   Claude Code
#   ~/.agents/skills   Codex and other Agent Skills harnesses
#   $env:CLAUDE_CONFIG_DIR/skills, when set (extra Claude Code profile)
#
# Uses directory junctions, which need no admin rights or Developer Mode.
# An existing real folder with the same name is left alone unless you pass
# -Force, which renames it to <name>.bak-<timestamp> before linking.
#
#   pwsh -File scripts/link-skills.ps1 [-Force] [-WhatIf]

[CmdletBinding(SupportsShouldProcess)]
param([switch]$Force)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$skills = Get-ChildItem -Directory (Join-Path $repo 'skills') |
  Where-Object { Test-Path (Join-Path $_.FullName 'SKILL.md') }

$dests = @((Join-Path $HOME '.claude/skills'), (Join-Path $HOME '.agents/skills'))
if ($env:CLAUDE_CONFIG_DIR) { $dests += Join-Path $env:CLAUDE_CONFIG_DIR 'skills' }

foreach ($dest in $dests | Select-Object -Unique) {
  if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }

  foreach ($skill in $skills) {
    $target = Join-Path $dest $skill.Name
    $existing = Get-Item -LiteralPath $target -Force -ErrorAction SilentlyContinue

    if ($existing -and $existing.LinkType) {
      # Already a link. Keep it if it points here, otherwise repoint it.
      $resolved = (Resolve-Path -LiteralPath @($existing.Target)[0] -ErrorAction SilentlyContinue).Path
      if ($resolved -eq $skill.FullName) {
        Write-Host "ok      $target"
        continue
      }
      if ($PSCmdlet.ShouldProcess($target, 'Remove stale link')) { $existing.Delete() }
    }
    elseif ($existing) {
      if (-not $Force) {
        Write-Warning "skip    $target is a real folder. Re-run with -Force to back it up and link."
        continue
      }
      $backup = "$($skill.Name).bak-$(Get-Date -Format yyyyMMddHHmmss)"
      if ($PSCmdlet.ShouldProcess($target, "Rename to $backup")) {
        Rename-Item -LiteralPath $target -NewName $backup
      }
    }

    if ($PSCmdlet.ShouldProcess($target, "Link to $($skill.FullName)")) {
      New-Item -ItemType Junction -Path $target -Target $skill.FullName | Out-Null
      Write-Host "linked  $target -> $($skill.FullName)"
    }
  }
}
