# priepo – Assumptions

Status: pre-Phase 1. No phase has been started. This file records interpretations of the brief so they can be corrected before build.

## A. Platform and stack

1. This workspace is a Vite + React 18 + React Router 6 SPA with an Express server. The brief asks for Next.js, PostgreSQL + Prisma, NextAuth, BullMQ and Docker Compose. That stack does not fit this template. Build the real product in a Next.js repo (connect a repo, or use the VS Code extension or CLI). The homepage in this workspace is a product-facing front door only.
2. Persistence: PostgreSQL via Prisma. Money is stored as `BIGINT` minor units (cents / paise) with an ISO currency code. No floats anywhere in money paths.
3. "Use .csv files for data log" is interpreted as: CSV exports and append-only CSV log files (audit, ledger, trades, tax statements) are produced from the database. They are not the system of record.
4. API style: tRPC with Zod validation. Background jobs: BullMQ on Redis (reminders, order matching, AML scans). Storage: S3-compatible (MinIO locally).
5. Auth: email + password with mandatory TOTP 2FA for Admin and Founder. Optional for Investor in sandbox mode.

## B. Business rules – interpretations

6. **10% treasury allocation:** 10% of the *offered lot* (`offered_shares`), minted as an extra treasury ShareLot (`source = treasury`). It is not carved out of the public offer. Example: offering 100,000 shares creates a 10,000-share treasury lot. Total shares must be at least offered_shares + treasury_shares. Configurable via `policy.treasury_allocation_pct` and `policy.treasury_allocation_basis` (`offered_lot` | `company`).
7. **Listing code:** 5 chars from `23456789ABCDEFGHJKMNPQRSTUVWXYZ` (excludes 0, O, 1, I, L). Random, retried on collision, `UNIQUE` index, immutable via DB trigger.
8. **Lock timing:** `unlock_at = acquired_at + lock_months` calendar months. Secondary lots: `acquired_at + 3 months` (`policy.secondary_lock_months`).
9. **Price floor:** applies only to `source = primary` lots, using that lot's own `acquired_price`. Floor = purchase price × 75% / 62.5% / 50% for 6 / 12 / 18 month locks. Rounded up to the next minor unit. Checked at order placement and again at match time. Secondary and treasury lots have no floor.
10. **Fees:** computed on trade value in USD-equivalent, rounded half-up to the minor unit. Tier lookup uses USD-equivalent value. The fee is charged in the trade currency. Boundaries: `< 100` is 1%; `100 ≤ v ≤ 10,000` is 0.5%; `10,000 < v ≤ 1,000,000` is 0.1%; `> 1,000,000` is 0.01%. A tier applies to the whole trade value (not marginal slices).
11. **Fee on primary purchases:** same schedule applies. Founder receives the trade value in full. The buyer pays the fee to priepo.
12. **Treasury sales:** treated as a sale by priepo's treasury account. The buyer pays trade value + fee. The fee is credited to priepo revenue. Treasury sales are executed as admin-initiated direct trades, not through the public order book.
13. **Exchange rates:** a mocked FX service returns a fixed, versioned INR/USD rate. Every trade stores the rate used.
14. **Vesting:** "vesting" in the brief is implemented as the lock period only. No other vesting schedule exists.
15. **Voting:** priepo holds proxy voting rights for investor shares via the proxy ledger. The default vote is the founders' recommendation. Admin override requires a reason. Founders create resolutions. Voting power per resolution is snapshotted at a record date.
16. **Board seat:** priepo is a non-voting observer. It is auto-invited to every `BoardMeeting`. Attendance is logged per meeting. Minutes are uploaded as documents.
17. **Confidentiality:** identity is public only if `investor_opt_in AND founder_approved AND priepo_approved`. Any revoked consent hides identity immediately. Hidden investors appear as "Anonymous investor #n", numbered by first-purchase order per startup.
18. **Quarterly updates:** due 30 days after quarter end. Reminders at T-14, T-7 and T-1 days. Status becomes `late` after the due date. Published versions are immutable, and edits create a new version.
19. **VC investments:** founder-entered, with a verification status (`unverified` | `document_attached` | `admin_verified`). Only admin_verified rows are shown without an "unverified" tag.
20. **Settlement:** double-entry ledger with accounts: user cash, escrow, priepo revenue, priepo treasury, founder proceeds. Funds move buyer → escrow → seller + priepo fee. User funds and priepo's own balance are separate accounts. Every journal balances to zero (DB constraint plus a test).
21. **Idempotency:** every payment and match operation takes an `Idempotency-Key`, stored with a unique index. Share inventory is protected with `SELECT … FOR UPDATE` row locks.
22. **Cooling-off:** 48 hours after a primary purchase, the buyer may cancel for a full refund (fee included). Shares move to the lock clock only once cooling-off ends. The `acquired_at` date stays the purchase time.

## C. Compliance

23. `jurisdiction_mode` default is `sandbox`. All money is simulated, the banner reads "SIMULATION - NOT REAL SECURITIES", and the payment adapter is the `NullPaymentProvider`, so no real payment API can be called.
24. Production money movement requires `jurisdiction_mode ≠ sandbox` AND `legal_signoff_confirmed = true`. Both are checked at one choke point (`assertMoneyMovementAllowed`).
25. `invite_only`: max 200 invited investors per startup, and public listing pages return 404 to anonymous visitors. `accredited_only`: investors need an accredited flag from KYC. `open`: no extra gating beyond the other rules.
26. This is not legal advice. India (and other jurisdictions) may restrict public equity crowdfunding and unlisted-share platforms. Legal review is a precondition to leaving sandbox.
27. Copy rules: no wording implying guaranteed returns, an IPO or listing. A copy lint test scans UI strings for banned phrases.
28. Defaults: annual investor cap is 10,000 USD-equivalent (`policy.annual_investment_cap_usd`). Risk acknowledgement is required before the first purchase.
29. AML flags (basic): rapid in/out (buy and sell of the same listing within 7 days), structuring (several trades within 2% below a fee-tier boundary within 24h), and velocity (over 10 orders per hour). Flags go to an admin review queue and never auto-block.
30. PII (PAN, Aadhaar reference, bank account number) is encrypted at rest with AES-256-GCM using envelope keys. Aadhaar numbers are never stored in full. Only the DigiLocker reference and last 4 digits are kept. A data-retention policy is a placeholder document (`/docs/RETENTION.md`, to be written).

## D. Non-functional

31. WCAG 2.1 AA, mobile-first, and i18n via message catalogs (English first, Hindi later). No hardcoded strings in components.
32. Tests: Vitest for unit and property tests (fee tiers, floor, lock, ledger balance), Playwright for flows. Concurrency tests run against real Postgres.

## E. Open questions (defaults used until answered)

- Is the 10% treasury lot taken from offered shares or from the company? Default: extra 10% of the offered lot.
- Should secondary trades also be subject to the annual investor cap? Default: yes, on buys.
- Should treasury sales be visible live or after a delay? Default: immediately (`treasury_sale_requires_notice_hours = 0`).
