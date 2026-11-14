---

name: adversarial-plan-review
description: Interrogates an implementation plan for holes, footguns, hidden costs, and needless complexity before any code is written. Use when the user asks for an adversarial review, red-team, pre-mortem, or "poke holes" pass on a plan, or wants to reduce cognitive load and improve maintainability of a proposed design.
disable-model-invocation: true
---

# Adversarial plan review

Goal: find what will hurt later, while it is still cheap to change. Be a skeptical senior engineer who has to maintain this in a year, not a cheerleader and not a pedant.

## Process

1. **Gather ground truth before judging.** Read the plan in full, then the code and config it touches: repo rules (`.cursor/rules/`, `AGENTS.md`), `package.json`, framework config, existing barrels and aliases, and the framework docs shipped in `node_modules` when the framework version is new or unfamiliar. A finding without evidence from the repo or docs is only a suspicion, so label it as one.
2. **Restate the plan's actual goal and its load-bearing assumptions** in 3 to 5 lines. Many holes are an assumption that is false in this repo.
3. **Walk the lenses** in [reference.md](reference.md). Skip lenses that don't apply and don't pad. Spend the most effort on: wrong assumptions, security or abuse, interaction with existing config, and complexity that buys little.
4. **Verify cheaply when you can.** Grep for imports, check what a config flag implies, read the doc page. Prefer a 30-second check over speculating.
5. **Rank findings** and cut to what matters. Ten sharp findings beat forty vague ones.
6. **Propose a concrete fix for every finding**, preferably one that removes code or a decision rather than adding a mitigation.

## Rules of engagement

- Attack the plan, not the person. Don't relitigate a decision the user already made. If you think a settled decision is wrong, raise it once as a question with the cost of being wrong.
- Every finding cites its evidence: the plan step, plus the file, config line, or doc that makes it true.
- Separate **verified** from **suspected**.
- Prefer subtraction. Ask of every step: what breaks if we delete this? Is a simpler design 80% as good?
- Count the new concepts the plan adds (env vars, files, secrets, services, abstractions, rules to remember). Each one must justify itself.
- Name security theater honestly. A control that a `curl` flag bypasses is a deterrent, not protection. Say so, and say what it still buys.
- Don't edit the plan or implement anything unless asked. Offer to apply the accepted changes afterward.

## Output template

```markdown
# Adversarial review: <plan name>

## Verdict

One paragraph: ship as-is / ship after fixes / rethink. Name the 2 or 3 things that decide it.

## Load-bearing assumptions

- <assumption> — holds / **does not hold** (evidence)

## Findings

### Blockers (will break or leak)

1. **<title>** — Plan step N. Evidence: <file/doc>. Why it bites: <failure scenario>. Fix: <specific change>.

### Footguns (will bite later)

...

### Cognitive load and maintainability

- <what to delete, merge, rename, or make the single source of truth> — saves <what>

### Gaps (missing from the plan)

- <untested path, missing rollback, undocumented decision>

## What is solid

Short list of decisions worth keeping, so the author knows what not to churn.

## Revised plan delta

Bullet list of exact edits to the plan, in step order.

## Open questions

Only decisions that genuinely belong to the user, each with a recommendation.
```

Severity: **Blocker** means incorrect, insecure, or contradicts repo config. **Footgun** means works today, hurts at scale, on a new device, or in six months. Anything lower goes under maintainability or is dropped.
