# Review lenses

Pick the questions that fit the plan. Each lens is a prompt for evidence-gathering, not a checklist to recite.

## 1. Assumptions and fit with the repo

- What does the plan assume about framework behavior, versions, and caching that the repo config contradicts? (Check flags such as caching modes, runtime, CSP, and path aliases.)
- Does it duplicate or fight an existing rule, convention, or file? Does it name files or folders that don't exist yet and need creating first?
- Are two steps contradictory (for example "dynamic per request" next to "prerendered shell")?
- Which claims come from memory rather than the installed docs?

## 2. Failure modes

- What happens on the sad paths: upstream 4xx/5xx, timeout, empty list, huge input, malformed ID, missing env var, partial deploy?
- What happens at 10x and 100x the expected size (pages, files, users, requests)? What is the per-request cost in time, memory, and money?
- What happens on the worst realistic client: low-end phone, Safari, slow network, no JS, keyboard only, screen reader?
- What fails at build time versus runtime? Will CI or preview deploys break without secrets?
- Is there a rollback or off switch?

## 3. Security and abuse

- What is actually protected, from whom, and by which single control? List what each control stops and what bypasses it (curl, DevTools, a script, a leaked repo).
- Where could a secret, signed URL, key, or internal ID reach the client, logs, error messages, or git? Check barrels and shared modules that client components import.
- Are caches (CDN, browser, framework) able to serve protected or user-specific content to the wrong party?
- Are limits enforced where they are durable, or only in memory on a stateless host?
- Is unreleased or private content reachable by guessing?

## 4. Interactions and hidden coupling

- Does a new feature collide with existing framework behavior (navigation state preservation, prefetching, streaming, headers, CSP)?
- Does a shared barrel or alias widen what the client bundle can import?
- Does the data shape force a code change plus a deploy for routine content updates? Is that acceptable?
- What is coupled to a vendor? Could it be swapped by changing one file?

## 5. Cognitive load

- Count new concepts: env vars, secrets, files, helpers, abstractions, and rules a future contributor must remember. Which can be deleted?
- Is there one source of truth for each fact, or are keys, dimensions, labels, and counts repeated by hand?
- Can validation be replaced by a lookup, a type, or a build-time parse that fails loudly?
- Could the simple version (plain element, static data, platform feature) deliver most of the value, with the complex one deferred behind a trigger ("add this only if leaks happen")?
- Are names, folders, and steps ordered so a newcomer can follow the data flow end to end?

## 6. Maintainability and operations

- What is the maintenance task every time content or config changes, and is it error-prone by hand (typos, copied IDs, missing alt text)?
- Is anything testable only by manually clicking? What is the cheapest automated smoke check for the risky parts?
- Are decisions and threat-model limits written down where the next person will look?
- Which shape decision is cheap now and expensive later (for example data fields for scheduling, versioning, or ordering)?

## 7. Accessibility and platform quality

- Does any "deterrent" or protection break keyboard use, assistive tech, browser shortcuts, zoom, translation, or reader modes? Map against the repo's accessibility rule.
- Does it cause false positives that punish legitimate users (focus loss, tab switching, mobile browser chrome)?
- Are text alternatives realistic to author at the content volume the plan implies?

## 8. Scope and sequencing

- Are steps ordered so each commit builds and works? Are any steps dead (conditional on something the design already removed)?
- Is there work that belongs in a later phase with an explicit trigger?
- Does the verification step test the claims that matter, in particular the negative cases (the thing that should fail does fail)?

## Common footgun patterns

- A protection check that only looks at attacker-controlled headers.
- An expiring token embedded in content that is cached longer than the token lives.
- A server-only constant exported through a barrel that a client component also imports.
- Error logging that prints the full failing URL, including its signature.
- Decoding many large images into canvases with no release strategy.
- "Block X" shortcuts that also block assistive technology or normal browser features.
- Hand-maintained metadata (sizes, counts, alt text) that drifts from the real files.
- A validation layer duplicating a lookup that already rejects unknown input.
