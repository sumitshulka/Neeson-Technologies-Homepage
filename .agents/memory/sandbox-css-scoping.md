---
name: Sandbox CSS scoping
description: A CSS @scope behavior that can affect extracted page previews in the mockup sandbox.
---

When page CSS is copied into a mockup sandbox and wrapped in `@scope (.root)`, selectors that repeat `.root` as a descendant may stop matching because the scope root is not its own descendant. Keep scoped selectors relative to the root, or use a distinct nested root wrapper when the production selector needs the root class.

**Why:** A Technical Heritage canvas preview showed fallback-sized section headings while the production page was correct. The extracted CSS had repeated the scope root in descendant selectors; a nested root wrapper restored the intended typography.

**How to apply:** When extracting production CSS into the sandbox, inspect generated `@scope` wrappers and verify a screenshot of headings and typography before marking the iframe live.
