# Accenture Applied Intelligence — Prototype Demonstration Video Script
**Project:** Enterprise KPI Decision & Storytelling Engine  
**Duration:** Exactly 3 Minutes (180 Seconds)  
**Target Audience:** Executive Operating Board, C-Suite Leaders, Technical Evaluators  
**Presenter Tone:** Confident, Consultative, Authoritative (Accenture Strategy & AI Principal)  
**Live Demo Environment:** [https://accenture-oi2k.onrender.com](https://accenture-oi2k.onrender.com)

---

## 🎬 Video Overview & Timeline Breakdown

```
┌─────────────────┬────────────────────────────────────────────────────────┬──────────┐
│ Time Segment    │ Demonstration Focus & UI Page                          │ Duration │
├─────────────────┼────────────────────────────────────────────────────────┼──────────┤
│ 0:00 – 0:25     │ Act 1: The Hook & The Enterprise Metric-Action Gap     │ 25 sec   │
│ 0:25 – 0:55     │ Act 2: Multi-Persona Governed Workspaces (CEO/Mgr/DQ)  │ 30 sec   │
│ 0:55 – 1:35     │ Act 3: Live Incident Case & Mathematical Waterfall DAG │ 40 sec   │
│ 1:35 – 2:05     │ Act 4: Grounded GenAI Narration & What-If Simulator    │ 30 sec   │
│ 2:05 – 2:35     │ Act 5: 1-Click Operational Dispatch & Drift Scanner    │ 30 sec   │
│ 2:35 – 3:00     │ Act 6: Strategic Value for Accenture & Outro           │ 25 sec   │
└─────────────────┴────────────────────────────────────────────────────────┴──────────┘
```

---

## 🕒 Timestamped Production Script

### ACT 1: The Hook & The Metric-Action Gap (0:00 – 0:25)

| Time | Visual / Screen Action | Voiceover (Dialogue) | Text Overlay / Graphic |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:10** | **Wide Shot on Live Dashboard** (`/`) showing the hero Accenture logo and live telemetry running. Smooth zoom into the **Active Anomalies** badge. | *"Every enterprise organization tracks metrics. But traditional BI dashboards act like passive rearview mirrors — they tell you that revenue fell last week, but they cannot tell you why, or what to do about it."* | **The Metric-Action Gap**<br/>Passive BI vs. Active Decisioning |
| **0:10 – 0:25** | Quick highlight on the **$140,000+ Revenue at Risk** card and the **Mean Time to Resolution (5-7 Days)** comparison graphic. | *"When an anomaly occurs, it takes data teams five to seven days of manual SQL triage to isolate root causes. By then, hundreds of thousands of dollars in revenue are lost. Today, we are demonstrating the Accenture KPI Decision Engine — an autonomous operational nervous system."* | **5–7 Days ➔ < 18 Minutes**<br/>92% Faster Root Cause Triage |

---

### ACT 2: Multi-Persona Governed Workspaces (0:25 – 0:55)

| Time | Visual / Screen Action | Voiceover (Dialogue) | Text Overlay / Graphic |
| :--- | :--- | :--- | :--- |
| **0:25 – 0:35** | Click the **Persona Selector** in the sidebar. Switch from **CEO** to **Operations Manager**. Show the layout instantly restructuring to SLA countdown timers and regional queues. | *"One size does not fit all. Our platform enforces strict Role-Based Access Control. When a CEO logs in, they see macro P&L risk, run-rate revenue, and 1-click strategic approvals with customer PII automatically redacted."* | **Role-Based Access Control**<br/>CEO · Operations · Analyst |
| **0:35 – 0:45** | Switch to **Quantitative Data Analyst** view. Show the statistical anomaly Z-score distribution radar ($z = -2.45$) and Pearson correlation matrices. | *"Switch to the Operations Manager, and the workspace transforms into an incident command center with SLA countdown clocks. Switch to the Quantitative Analyst, and you get statistical Z-score distributions and full SQL data lineage."* | **Governed Data Redaction**<br/>Column-Level PII & Margin Security |
| **0:45 – 0:55** | Highlight the **DuckDB Zero-Copy Ingestion** indicator: `600,000+ rows scanned in 24ms · 35MB RAM`. | *"Under the hood, an in-memory DuckDB C++ engine processes over 600,000 transactional rows in under twenty-five milliseconds — with zero replication overhead."* | **DuckDB C++ Columnar Store**<br/>600K Rows in < 25ms · 35MB RAM |

---

### ACT 3: Live Incident Case & Mathematical Waterfall DAG (0:55 – 1:35)

| Time | Visual / Screen Action | Voiceover (Dialogue) | Text Overlay / Graphic |
| :--- | :--- | :--- | :--- |
| **0:55 – 1:10** | Click on the **East Region P1 Anomaly Card** (Week of Aug 11, 2026). Transition to the `/case/East%20Region/2026-08-11` diagnostic page. | *"Let's inspect a live critical incident: East Region revenue dropped 11.6%. Rather than guessing between marketing seasonality or pricing drops, our Causal Directed Acyclic Graph proves that Checkout Error Rate surged forty-eight hours prior to the revenue drop."* | **Temporal Causal Precedence**<br/>$t_{\text{driver}} \le t_{\text{kpi}}$ Verification |
| **1:10 – 1:25** | Hover over the **Additive Waterfall Decomposition Bar Chart**. Highlight the Volume Effect (-$320/d), Price Effect (-$145/d), and Mix Effect (+$11/d). | *"Our additive decomposition mathematically proves the exact impact: order volume drag cost $320 per day, basket shrinkage cost $145 per day, while high-margin accessories provided an $11 mix offset. 100% auditable math — zero black-box guesswork."* | **Additive Waterfall Math**<br/>$\Delta\text{Rev} = \Delta\text{Vol} + \Delta\text{Price} + \Delta\text{Mix}$ |
| **1:25 – 1:35** | Click the **Knowledge Graph** tab (`/knowledge-graph`). Show the interactive node network connecting Revenue $\rightarrow$ Orders $\rightarrow$ Checkout Error Rate ($r = 0.82$). | *"The interactive Knowledge Graph visualizes the end-to-end causal chain, mapping operational root causes directly to high-level financial health."* | **Interactive Causal DAG**<br/>Semantic Metric Contracts & Lineage |

---

### ACT 4: Grounded GenAI Narration & What-If Simulator (1:35 – 2:05)

| Time | Visual / Screen Action | Voiceover (Dialogue) | Text Overlay / Graphic |
| :--- | :--- | :--- | :--- |
| **1:35 – 1:50** | Navigate to the **Decision Assistant / AI Chat** (`/chat`). Show the AI memo generating in real-time on Groq LPU with embedded evidence cards and charts. | *"To communicate insights to the board, we deploy cost-aware GenAI via Groq LPU. The LLM is never the calculator — it receives strictly pinned, pre-calculated JSON evidence and generates persona-tailored executive briefing memos in under 800 milliseconds."* | **Groq LPU GenAI Gateway**<br/>Zero-Hallucination Evidence Pinning |
| **1:50 – 2:05** | Navigate to the **Scenario Simulator** (`/simulator`). Drag the **Target Checkout Error Rate** slider from 12.4% down to 0.8%. Show the projected recovery: `+$3,135/wk ($142,000+ Annualized)`. | *"In the What-If Simulator, executives can test strategic interventions in real time. Sliding the checkout error rate back to baseline instantly projects $142,000 in annualized revenue recovery."* | **Real-Time Scenario Simulator**<br/>$142,000+ Annualized Recovery |

---

### ACT 5: Closed-Loop Dispatch & Drift Monitor (2:05 – 2:35)

| Time | Visual / Screen Action | Voiceover (Dialogue) | Text Overlay / Graphic |
| :--- | :--- | :--- | :--- |
| **2:05 – 2:20** | Click **"Dispatch Action"**. Open the modal, select **Jira (P1 Hotfix to Engineering)** and **Slack (#incident-command)**, and click **Confirm Dispatch**. Show the green success toast. | *"Insights are useless without execution. With one click, the platform dispatches structured action playbooks directly into Slack and Jira with immutable audit tracking (`AUD-9482`)."* | **1-Click Closed-Loop Dispatch**<br/>Slack · Jira · Salesforce Webhooks |
| **2:20 – 2:35** | Show the **Bayesian Calibration Feedback** buttons (Upvote/Downvote) on the driver card, and navigate to `/calibration` to show the **14-Day Post-Insight Drift Monitor**. | *"To maintain accuracy, verified engineer feedback dynamically updates driver weights via Bayesian re-ranking, while our continuous drift scanner automatically flags stale insights within fourteen days."* | **Self-Calibrating Feedback**<br/>Bayesian Weights & Drift Scanner |

---

### ACT 6: Strategic Value for Accenture & Outro (2:35 – 3:00)

| Time | Visual / Screen Action | Voiceover (Dialogue) | Text Overlay / Graphic |
| :--- | :--- | :--- | :--- |
| **2:35 – 2:50** | Display the **Executive Summary Card**: $1.705M Annual Value · 3.4-Month Payback · 284% IRR. Transition to the PDF proposal document link. | *"For Accenture, this engine serves as a core accelerator for Total Enterprise Reinvention, integrating seamlessly with SynOps and MyNav to deliver $1.7M in annual recurring value with a 3.4-month payback."* | **Total Enterprise Reinvention**<br/>$1.705M Net Value · 3.4-Month Payback |
| **2:50 – 3:00** | Final Hero Shot of the Accenture Applied Intelligence Suite logo and live URL: `accenture-oi2k.onrender.com`. Fade to black. | *"The Accenture KPI Decision Engine: Turning metric monitoring into autonomous causal intelligence and governed action. Thank you."* | **Accenture Applied Intelligence**<br/>Autonomous Decision Intelligence |

---

## 💡 Pro-Tips for Recording Your Demo Video

1. **Browser Resolution**: Set your browser zoom to **100% or 90%** on a 1080p (1920x1080) screen for crisp, balanced card rendering.
2. **Mouse Movement**: Move your mouse deliberately and smoothly. Use gentle circular highlights around key numbers ($142K, 24ms, -11.6%) while speaking.
3. **Audio Quality**: Use a dedicated USB microphone (e.g., Blue Yeti, Rode) with noise suppression enabled.
4. **Pacing**: Speak clearly at a moderate, confident pace (~130 words per minute). 
5. **Video Editing Callouts**: Add subtle zoom-ins during Act 3 (Waterfall chart) and Act 4 (Groq chat generation) to draw the viewer's eye to the exact calculations.
