---
name: architecture-review
description: Review code changes or a specified code area against an existing repository's architecture, dependency boundaries, and ownership rules. Use for architecture reviews; implementation fixes require a request to make changes.
---

# Architecture Review

Read the applicable repository instructions, architecture documentation, and module overview. Use these as the review contract. Do not treat a familiar architecture, naming scheme, or personal preference as a requirement. If the documented contract is incomplete, distinguish a supported finding from a question or recommendation.

## Inspect the requested scope

Trace actual imports, callers, and consumers beyond the diff where needed to establish responsibility. Check the rules that apply to the repository:

- Layer dependencies, module entry points, and access to private internals.
- Ownership of domain data, transport types, mapping, shared state, and side effects.
- Separation of rendering and behavior, including View/Presenter contracts where defined.
- Placement of private and shared components based on their actual consumers.
- Naming, file size, and decomposition requirements; splitting should preserve a coherent responsibility.

For a staged change, use its stated scope and acceptance criteria. Separate pre-existing issues from regressions, and do not report intentionally deferred work as missing from the current change. Review without modifying files unless fixes were requested.

Run relevant structural checks when available. Linters, type checks, and builds provide supporting evidence; they do not establish ownership or separation of responsibilities on their own.

## Report findings

For each confirmed violation, cite a file and line, the applicable rule, its consequence, and the smallest useful correction. Order findings by impact. If no violations are found, state that and identify the reviewed area and any verification limits.
