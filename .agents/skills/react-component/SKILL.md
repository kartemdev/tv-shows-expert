---
name: react-component
description: Create, modify, or decompose React components, their behavior, and styles within an existing repository's architecture. Use for implementation tasks rather than a standalone code review.
---

# React Component Changes

Read the applicable repository instructions and architecture documentation. For UI changes, also read the relevant design specification and inspect the existing styling system. Use the repository's conventions for state, component ownership, logic separation, naming, and validation; do not introduce a different architecture as part of a component change.

## Make the change

1. Trace the affected component's callers, children, and data sources. Find the owner of the behavior before deciding where to edit it.
2. Keep rendering, interaction logic, shared state, and data access in the boundaries defined by the repository. Where it uses View/Presenter, prepare display values and handlers in the Presenter and keep JSX in the View.
3. Decompose around a responsibility that can be named and changed independently. Place private children with their owner; move shared code only when actual consumers need it. Respect local size limits without compressing code to bypass them.
4. Reuse existing tokens, controls, and styling conventions. Preserve keyboard behavior, accessible labels, loading and error states, and responsive layout when they are affected by the change.

## Verify

Run the checks required by the repository using its configured runtime and package manager. For visual changes, inspect the affected states at relevant viewport sizes when a preview is available. If design references are missing or conflict, use the user's current instructions and available project evidence; identify any unresolved detail rather than inventing a requirement.

Report the resulting behavior, the checks completed, and material verification limits. Update documentation only when the change makes it inaccurate or the user requests it.
