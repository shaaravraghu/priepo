# priepo

priepo (pre-IPO) is a marketplace where early-stage startups list share lots and everyday people buy them to fund the company.

## refer to product docs/ER_DIAGRAM.MD (DBMS structure) and Pitch_Deck for the product concept.

> **SIMULATION - NOT REAL SECURITIES.** priepo is in sandbox mode. Money is simulated. Nothing here is investment advice or a promise of returns.

## Product details

### What it does

Startups at **bootstrap, pre-seed, seed or Series A** register and list a share lot. Ordinary people ("investors") buy shares to fund the company. Shares are locked after purchase, and resale is governed by vesting and price-floor rules. priepo takes a transaction fee and a 10% allocation of every lot, holds voting rights, and sits on each company's board as a non-voting associate member.

### Roles

| Role | Responsibilities |
| --- | --- |
| **Founder** | Registers and verifies a startup, creates a listing, posts quarterly updates, manages the landing page, schedules board meetings. |
| **Investor** | Completes KYC, links a bank account, acknowledges risk, buys and sells shares, tracks holdings. |
| **priepo (admin)** | Approves listings and KYC, configures fees and policy flags, manages the treasury lot, casts proxy votes, attends meetings, views the audit log. |

### Listings

- Each listing has a unique, immutable **5-character code** (uppercase, excluding 0, O, 1, I, L), shown on the landing page.
- A listing defines total shares, price per share, shares offered to the public, and `lock_months` (6, 12 or 18, set by the founder).
- On listing creation, **10% of the offered lot** is allocated to the priepo treasury (see `docs/ASSUMPTIONS.md`).

### Vesting, lock and price floor (first buyers)

- Primary purchases are locked for `lock_months` and cannot be resold before then.
- After the lock, resale must be at or above a floor of the original purchase price per share:

| Lock | Minimum resale price |
| --- | --- |
| 6 months | 75% |
| 12 months | 62.5% |
| 18 months | 50% |

- Orders below the floor are rejected. The floor is a policy flag (`enforce_price_floor`, default true).

### Subsequent buyers

- Anyone buying from a first buyer (secondary purchase) has a **3-month lock** and **no price floor** on resale.

### Treasury lot

- Treasury shares are exempt from lock and floor. priepo may sell them at any time at any price.
- Every treasury sale requires a reason, writes an immutable audit entry, and appears publicly on the startup's cap table as "priepo treasury sale".

### Fees

Fees are calculated on trade value (USD-equivalent). The buyer pays trade value plus fee. The seller receives trade value minus fee. All fees go to priepo.

| Trade value | Fee |
| --- | --- |
| Below $100 | 1% |
| $100 to $10,000 (inclusive) | 0.5% |
| Above $10,000 up to $1,000,000 (inclusive) | 0.1% |
| Above $1,000,000 | 0.01% |

### Voting and governance

- priepo holds voting rights through a proxy ledger and generally votes with the founders' recommendation.
- Admins can override the default per resolution, with a recorded reason.
- Investors see every resolution and how priepo voted on their behalf.
- Every listing shows this disclosure: "priepo holds voting rights for investor shares and generally votes with the founders."

### Board participation

- priepo is an associate board member: a non-voting observer with the right to attend all meetings, whether or not there is a vote.

### Investor confidentiality

- An investor's identity appears on a startup's landing page only if the investor opts in, the founder approves, and priepo approves. Otherwise the investor appears as "Anonymous investor #n". The default is hidden.

### Founder landing page

- What the company builds and why, team, stage, code, funding progress, shareholders (per the confidentiality rule), documents, updates, and a date-tracked timeline of current VC investments.
- Quarterly updates use a structured form (revenue, burn, runway, headcount, milestones, KPIs, narrative, risks). They have due dates, reminders, and a "late" status. Published versions are immutable and investors are notified.

### Compliance guardrails

- `jurisdiction_mode`: `sandbox` (default), `invite_only` (200 invited investors per startup, no public listing pages), `accredited_only`, `open`.
- Production money movement stays disabled unless `jurisdiction_mode` is set explicitly and `legal_signoff_confirmed` is true.
- Per-investor annual cap, 48-hour cooling-off period on primary purchases, and a risk acknowledgement before the first purchase.
- No copy may imply guaranteed returns or an upcoming IPO.
- Full immutable audit log, basic AML flags, and encryption of PII at rest.
- Securities law varies by country. Legal advice is being taken separately.

## Tech stack

The product brief targets **Next.js, PostgreSQL + Prisma, NextAuth (2FA), tRPC or REST with Zod, BullMQ, Razorpay/Stripe (test mode), S3-compatible storage, Vitest + Playwright, and Docker Compose.**

The current workspace is a Vite + React 18 + React Router 6 + Tailwind CSS 3 SPA with an Express server. It holds the UI shell only. Build the full backend in a Next.js repo, or connect a repo or use the VS Code extension or CLI, as described in the [Builder docs](https://www.builder.io/c/docs/projects).

## Current UI

- Marketing homepage with a shared header, footer and simulation banner.
- Role dashboards at `/dashboard`, with entry points for priepo, investor and founder. Each role has a page for every function in the brief. Pages are placeholders for now.
- Sign-in is bypassed. "Sign in" and "Get started" open the dashboards directly.

## Development

```bash
pnpm install
pnpm dev        # client and server on port 8080
pnpm typecheck
pnpm test
pnpm build
```

Documents:

- `docs/ASSUMPTIONS.md`: interpretations of the brief and open questions.
- `docs/ER_DIAGRAM.md`: data model and key constraints.

## Phase checklist

Status key: `[ ]` not started, `[x]` complete.

### Phase 0: UI shell (current workspace)
- [x] Brand theme, shared layout, and simulation banner
- [x] Marketing homepage
- [x] Role dashboards (priepo, investor, founder) with function pages
- [x] Sign-in bypass to dashboards
- [ ] Working authentication (email + password, 2FA)

### Phase 1: Foundation
- [ ] Database schema (Prisma) and migrations
- [ ] Auth, roles, and 2FA
- [ ] Policy table with configurable values
- [ ] 5-character listing code generator (uniqueness check)
- [ ] Unit tests for the above

### Phase 2: Founder onboarding
- [ ] Registration and company verification (document upload, admin approval)
- [ ] Listing creation
- [ ] Landing page (team, stage, code, funding progress, shareholders, documents)
- [ ] Quarterly updates (structured form, due dates, reminders, late status, versioning)
- [ ] VC investments timeline

### Phase 3: Investor onboarding and payments
- [ ] Sign-up and KYC (mock PAN/Aadhaar via DigiLocker)
- [ ] Bank account linking (mock penny-drop)
- [ ] Risk questionnaire and risk acknowledgement
- [ ] Primary purchase flow with cooling-off period
- [ ] Double-entry ledger and escrow settlement
- [ ] Fee engine with boundary tests for all tiers

### Phase 4: Lots and secondary market
- [ ] Share lots with lock and unlock dates
- [ ] Lock and price-floor enforcement at order time and match time
- [ ] Secondary order book (limit orders, price-time priority)
- [ ] Matching with row-level locking and idempotency
- [ ] Concurrency tests (no overselling)

### Phase 5: Treasury, governance and board
- [ ] Treasury lot and audited treasury sales
- [ ] Proxy voting ledger and per-resolution overrides
- [ ] Board meetings module (auto-invite priepo, attendance log, minutes upload)
- [ ] Investor confidentiality consent flow (three-party approval)

### Phase 6: Admin, compliance and launch
- [ ] Admin console (approvals, policy editor, treasury, votes, meetings)
- [ ] Immutable audit log (hash-chained)
- [ ] AML flags and admin review queue
- [ ] Jurisdiction modes and legal sign-off gate
- [ ] Seed data, demo script, and final README
- [ ] Playwright end-to-end tests for the acceptance criteria
