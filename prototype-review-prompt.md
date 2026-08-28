# Prompt: Full Audit of KPI Intelligence-to-Action Engine Prototype

Paste everything below into your code editor's AI assistant (Cursor / Claude Code / Copilot Chat / etc.), pointed at the repo root.

---

## ROLE

You are acting as a senior solutions architect and code reviewer for an enterprise BI/AI product. You have deep experience in: LLM application architecture, data engineering (multi-source reconciliation), causal/statistical inference, front-end UX for analytics products, and security/governance for enterprise data platforms. You are reviewing this codebase for a **case-competition submission**, and the judges will grade strictly against a published problem statement. Be rigorous, skeptical, and specific. Do not give generic praise — find real gaps.

## CONTEXT: THE PROBLEM STATEMENT YOU MUST GRADE AGAINST

The prototype must be a **KPI intelligence-to-action engine** that:

1. Detects and prioritizes material KPI movements (statistical significance AND business impact).
2. Reconciles data and business context across heterogeneous sources (different grains, refresh cadences, quality levels, historical coverage).
3. Identifies and ranks explanatory drivers using appropriate analytical methods (contribution analysis, causal inference, statistics — not just LLM guessing).
4. Generates persona-specific narratives with traceable evidence (at least 2 personas, different depth/actions/channel).
5. Communicates uncertainty and abstains when evidence is insufficient or contradictory (at least 1 explicit low-confidence/abstention scenario).
6. Recommends actions structured as: **driver → controllable lever → action → expected impact → owner → confidence → monitoring plan**.
7. Has a mechanism to learn from analyst/business-user feedback (correction workflow, not just a thumbs-up button).
8. Operates within realistic security, cost, latency, and scalability constraints.

**Non-negotiable requirement:** the LLM is NOT the source of quantitative truth. The submission must explicitly show, for every step, whether it used deterministic logic/SQL, business rules, statistics, traditional ML, causal inference, retrieval, or an LLM — and justify why.

### Minimum Prototype Checklist (grade each item PASS / PARTIAL / MISSING)

- [ ] 3–5 connected KPIs across 2–3 data sources with **different grains or refresh cadences**
- [ ] A lightweight KPI/semantic contract: definitions, calculations, drivers, thresholds, lineage, access restrictions
- [ ] ≥2 personas receiving genuinely different narratives/actions (not just a tone change)
- [ ] ≥1 multi-factor KPI movement with known/simulated drivers (price, volume, mix, marketing, supply, seasonality, competition, external events)
- [ ] ≥1 low-confidence scenario where the engine asks for clarification or abstains
- [ ] ≥1 sparse-history / newly launched KPI scenario
- [ ] ≥1 role-based security/entitlement scenario (row-, column-, or domain-level)
- [ ] Evidence surfaced per insight: source freshness, analytical method, contribution %, confidence score, lineage
- [ ] Clear, visible breakdown of LLM vs non-LLM processing per step
- [ ] Runtime telemetry: latency, model calls, token usage, estimated cost per insight

## YOUR TASK

### Step 1 — Inventory the current implementation
Scan the full repo (backend, frontend, data layer, prompts/agents, config). Produce a table:

| Requirement (from checklist above) | Current implementation (file/module references) | Status (PASS/PARTIAL/MISSING) | Evidence |

Be literal — if something is claimed in a README but not actually wired into runtime code, mark it PARTIAL or MISSING and say so.

### Step 2 — Gap analysis against the problem statement
For every MISSING or PARTIAL item:
- Explain precisely what is missing (not "add more detail" — specify the exact function, data flow, or UI surface required).
- Explain the judging risk: what will a reviewer immediately notice is absent or superficial.
- Propose the smallest change that would move it to PASS, and note if a larger fix is warranted for a truly strong submission.

### Step 3 — Architecture & industry-standard review
Independent of the checklist, review for:
- **Separation of deterministic vs. probabilistic logic**: is quantitative computation (aggregation, variance decomposition, contribution analysis, forecasting) done in SQL/pandas/stats libraries, with the LLM only doing narrative synthesis, intent parsing, and retrieval orchestration? Flag any place where the LLM is asked to "calculate" or "decide" a number.
- **Data contract / semantic layer**: is there an actual machine-readable KPI definition file (YAML/JSON/dbt metrics/ontology) with lineage and thresholds, or is it hardcoded/implicit?
- **Confidence & abstention logic**: is confidence a real computed score (e.g., from data completeness, driver agreement, statistical significance) or a hardcoded/simulated number?
- **Security model**: is row/column/domain-level access enforced at the query layer (not just UI hiding), and is there an audit trail?
- **Feedback loop**: does user feedback actually change future behavior (e.g., stored corrections feeding a re-ranking or fine-tuning/eval step), or is it cosmetic?
- **Cost/latency observability**: is there real per-request telemetry (tokens, model, latency, $ cost), or just a static claim in docs?
- **Code quality**: error handling, test coverage, modularity, API design, naming, dead code, hardcoded secrets/keys, obvious scaling bottlenecks (N+1 queries, synchronous LLM calls blocking UI, etc.)
- **Frontend/UX quality**: information hierarchy, whether evidence/confidence/lineage are actually visible in the UI (not just backend logs), accessibility, responsiveness, whether it looks like a polished analytics product vs. a wireframe/demo. Compare visually and structurally against how real BI/analytics products (e.g., Tableau, Looker, ThoughtSpot) surface explanations and confidence.
- **Demo narrative coherence**: does clicking through the UI actually tell the story of all 8 objectives, or does the code exist but never get demonstrated end-to-end?

### Step 4 — Out-of-the-box / differentiation features
Beyond the minimum requirements, propose 5–8 genuinely differentiated features a judge would not expect from a typical team submission. For each, give: what it is, why it's non-obvious, roughly how hard it is to add given the current stack, and which objective(s) it strengthens. Consider angles like:
- Natural-language "what-if" simulation of a lever before committing to an action (predicted impact preview using the same forecasting model, not a new LLM guess).
- An explanation "trust score" that shows *why* the confidence is what it is (data completeness %, driver agreement %, historical volatility) rather than a single opaque number.
- Contradiction detection: automatically flagging when two data sources imply opposite drivers, and surfacing both hypotheses side-by-side instead of silently picking one.
- A lineage graph view (interactive) tracing a narrative sentence back to the exact source table/row/timestamp.
- Drift monitoring: a background job that re-checks whether a previously given explanation still holds as new data lands, and auto-flags stale insights.
- Action outcome tracking: closing the loop by checking, after N days, whether a recommended action's expected impact actually materialized — feeding that back into future confidence calibration.
- Cost-aware model routing: cheap/fast model for anomaly triage and retrieval, escalate to a stronger model only for ambiguous/high-stakes narratives, with the routing decision itself shown to the user.
- A "second opinion" / analyst override mode where a human correction is versioned and diffed against the original AI narrative for auditability.

### Step 5 — Deliverable

Produce:
1. The completed checklist table with statuses.
2. A prioritized fix list (Critical / High / Medium) ordered by judging risk, each with concrete file/module-level next steps.
3. The out-of-the-box feature proposals with effort estimates.
4. A short "LLM vs non-LLM" map: one line per pipeline stage stating which mechanism is actually used in the current code (be honest if a stage is unimplemented).
5. A go/no-go verdict on whether the current build can be demoed end-to-end to satisfy all 8 objectives, and if not, the minimum set of changes required before demo day.

Do not sugarcoat. Treat every unverified claim in the README/docs as unproven until you find the corresponding code path.
