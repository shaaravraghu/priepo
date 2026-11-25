# priepo – ER Diagram

Money columns are `BIGINT` minor units plus `currency`. All tables have `id`, `created_at`. `AuditLog` and `LedgerEntry` are append-only.

```mermaid
erDiagram
  User ||--o{ UserRole : has
  Role ||--o{ UserRole : grants
  User ||--o| KYCRecord : verifies
  User ||--o{ BankAccount : links
  User ||--o{ Notification : receives
  User ||--o{ VisibilityConsent : gives
  User ||--o{ Account : owns

  Startup ||--o{ Listing : offers
  Startup ||--o{ QuarterlyUpdate : publishes
  Startup ||--o{ VCInvestment : records
  Startup ||--o{ BoardMeeting : schedules
  Startup ||--o{ Resolution : proposes
  User ||--o{ Startup : founds

  Listing ||--o{ ShareLot : issues
  Listing ||--o{ Order : has
  Listing ||--o{ Trade : clears
  Listing ||--o{ VisibilityConsent : scopes

  User ||--o{ ShareLot : owns
  ShareLot ||--o{ Order : backs
  Order ||--o{ Trade : "buy side"
  Order ||--o{ Trade : "sell side"
  Trade ||--o{ LedgerEntry : posts
  Account ||--o{ LedgerEntry : "debit/credit"

  BoardMeeting ||--o{ AttendanceLog : logs
  Resolution ||--o{ ProxyVote : "voted by priepo"
  User ||--o{ AuditLog : acts
  Policy ||--o{ AuditLog : "changes audited"

  User {
    uuid id PK
    string email UK
    string password_hash
    bool totp_enabled
    string country
    string locale
  }
  Role { int id PK  string name UK }
  UserRole { uuid user_id FK  int role_id FK }
  KYCRecord {
    uuid id PK
    uuid user_id FK
    string provider
    string status
    bytes pan_enc
    string aadhaar_ref
    bool accredited
    string risk_profile
    timestamp risk_ack_at
  }
  BankAccount {
    uuid id PK
    uuid user_id FK
    bytes account_no_enc
    string ifsc
    string penny_drop_status
  }
  Startup {
    uuid id PK
    uuid founder_id FK
    string name
    string sector
    string stage
    string verification_status
    text about
  }
  Listing {
    uuid id PK
    uuid startup_id FK
    char5 code UK
    string stage
    bigint total_shares
    bigint price_per_share
    bigint offered_shares
    smallint lock_months
    string status
    timestamp approved_at
  }
  ShareLot {
    uuid id PK
    uuid owner_id FK
    uuid listing_id FK
    bigint qty
    bigint acquired_price
    timestamp acquired_at
    timestamp unlock_at
    string source "primary|secondary|treasury"
    bigint lock_months_origin
  }
  Order {
    uuid id PK
    uuid listing_id FK
    uuid lot_id FK
    uuid user_id FK
    string side
    string type
    bigint qty
    bigint limit_price
    bigint filled_qty
    string status
    string idempotency_key UK
  }
  Trade {
    uuid id PK
    uuid listing_id FK
    uuid buy_order_id FK
    uuid sell_order_id FK
    bigint qty
    bigint price
    bigint fee_buyer
    bigint fee_seller
    decimal fx_rate_used
    string kind "primary|secondary|treasury"
    string idempotency_key UK
  }
  Account {
    uuid id PK
    uuid owner_id FK
    string type "user_cash|escrow|priepo_revenue|priepo_treasury|founder_proceeds"
    string currency
  }
  LedgerEntry {
    uuid id PK
    uuid journal_id
    uuid account_id FK
    uuid trade_id FK
    bigint debit
    bigint credit
    string currency
  }
  Policy {
    string key PK
    jsonb value
    uuid updated_by FK
    timestamp updated_at
  }
  QuarterlyUpdate {
    uuid id PK
    uuid startup_id FK
    string period
    int version
    jsonb metrics "revenue burn runway headcount KPIs"
    text narrative
    text risks
    date due_date
    string status "draft|published|late"
    timestamp published_at
  }
  VCInvestment {
    uuid id PK
    uuid startup_id FK
    string investor_name
    string round
    bigint amount
    date invested_on
    string instrument
    string source_doc_url
    string verification_status
  }
  BoardMeeting {
    uuid id PK
    uuid startup_id FK
    timestamp scheduled_at
    string agenda
    string minutes_url
    bool priepo_invited
  }
  AttendanceLog {
    uuid id PK
    uuid meeting_id FK
    string attendee
    bool is_priepo
    timestamp attended_at
  }
  Resolution {
    uuid id PK
    uuid startup_id FK
    string title
    string founder_recommendation
    date record_date
    string status
  }
  ProxyVote {
    uuid id PK
    uuid resolution_id FK
    string vote
    bool is_default_policy
    text override_reason
    uuid cast_by FK
  }
  VisibilityConsent {
    uuid id PK
    uuid investor_id FK
    uuid listing_id FK
    bool investor_opt_in
    bool founder_approved
    bool priepo_approved
  }
  AuditLog {
    uuid id PK
    uuid actor_id FK
    string action
    string entity
    uuid entity_id
    jsonb before
    jsonb after
    text reason
    string prev_hash
    string hash
  }
  Notification {
    uuid id PK
    uuid user_id FK
    string type
    jsonb payload
    timestamp read_at
  }
```

## Key constraints

- `Listing.code`: unique, 5 chars from the allowed alphabet, immutable (trigger).
- `LedgerEntry`: for each `journal_id`, `SUM(debit) = SUM(credit)` (deferred constraint). Account balances can't go below zero for `user_cash` and `escrow`.
- `ShareLot.qty >= 0`, and `SUM(qty)` per listing never exceeds `total_shares` (row lock plus check).
- `AuditLog`: insert-only (revoked UPDATE/DELETE), hash-chained.
- `Trade.idempotency_key` and `Order.idempotency_key`: unique.
