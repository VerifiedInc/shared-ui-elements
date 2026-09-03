#!/bin/bash
# Re-applies durable fixes to the freshly-copied .ds-sync/ staged scripts.
#
# WHY THIS EXISTS: .ds-sync/ is not committed - the design-sync skill's own
# §7 step 1 re-copies package-validate.mjs, storybook/compare.mjs, and
# storybook/probe.mjs fresh from the skill's bundled copy on every re-sync,
# which would otherwise silently drop the chromium-stability fix documented
# in .design-sync/NOTES.md every single time. Run this immediately after
# that refresh step (the `cp -r` in §7 step 1), before running any build,
# validate, or compare command.
#
# Usage: bash .design-sync/patches/apply.sh   (run from the repo root)
set -euo pipefail
cd "$(dirname "$0")/../.."

apply_one() {
  local patch="$1" target="$2"
  if [ ! -f "$target" ]; then
    echo "SKIP $patch: target $target not found (staged scripts not refreshed yet?)" >&2
    return 0
  fi
  if grep -q -- "--disable-gpu" "$target" 2>/dev/null; then
    echo "already applied: $patch -> $target"
    return 0
  fi
  if patch -p0 -s < "$patch"; then
    echo "applied: $patch -> $target"
  else
    echo "FAILED to apply $patch to $target - the skill's bundled script changed shape; re-derive the patch by hand (see NOTES.md) and update this file." >&2
    return 1
  fi
}

apply_one .design-sync/patches/package-validate.chromium-stability.patch .ds-sync/package-validate.mjs
apply_one .design-sync/patches/compare.chromium-stability.patch .ds-sync/storybook/compare.mjs
apply_one .design-sync/patches/probe.chromium-stability.patch .ds-sync/storybook/probe.mjs
