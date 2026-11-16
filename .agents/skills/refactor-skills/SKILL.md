---
name: refactor-skills
description: Refactor existing Codex skills to remove duplication and project coupling while preserving their useful constraints. Use when asked to simplify skills, make them reusable, or separate a workflow from repository-specific rules.
---

# Refactor Skills

Read the target skills, their metadata and referenced resources, and the repository instructions that select them. Inspect existing changes before editing so that removed workflows or resources are not restored accidentally.

## Separate workflow from local rules

- Keep the reusable decisions in the skill: when it applies, what evidence to inspect, which boundaries matter, and how to validate the result.
- Keep project names, directory layouts, naming conventions, numeric limits, tool versions, and commands in the project's maintained instructions or specifications. Before removing a local requirement from a skill, confirm that an authoritative local document preserves it; move it there if necessary and within scope.
- Have the skill discover applicable repository instructions and follow their references. Avoid a fixed relative path to a repository root or assumptions about its framework, architecture, or package manager unless those define the skill's stated capability.
- Remove repeated policy, historical notes, and step-by-step advice that does not change a capable agent's decisions. Retain non-obvious operational constraints and useful scripts.

Write skill instructions, descriptions, and UI metadata in English unless the user requests another language. Keep artifact text and project documentation in their established language unless translation was requested.

## Preserve discovery and behavior

Make names and descriptions specific enough to distinguish implementation, review, and other tasks. Rename a project-prefixed skill when its new scope justifies it, and update callers, links, and UI metadata together. Preserve invocation policy, dependencies, and authorization boundaries unless changing them is part of the request. Do not expand a review into edits or a local workflow into external publication.

Validate frontmatter and metadata with the available skill tooling, check local references, and inspect resource callers before deletion. Assess the rewritten instructions against a realistic request in the original project and one in a different repository: local rules should still apply in the first, while the second should not inherit them. Add scripts, references, or evaluation machinery only when the workflow needs them.
