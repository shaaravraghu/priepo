import { Link } from "react-router-dom";
import {
  Building2,
  Lock,
  Vote,
  Users,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Landmark,
  FileText,
} from "lucide-react";

const stages = ["Bootstrap", "Pre-seed", "Seed", "Series A"];

const locks = [
  { months: 6, floor: "75%" },
  { months: 12, floor: "62.5%" },
  { months: 18, floor: "50%" },
];

const fees = [
  { tier: "Below $100", rate: "1%" },
  { tier: "$100 – $10,000", rate: "0.5%" },
  { tier: "$10,000 – $1,000,000", rate: "0.1%" },
  { tier: "Above $1,000,000", rate: "0.01%" },
];

const features = [
  {
    icon: Lock,
    title: "Locked, then floor-protected",
    body: "First buyers can't resell until the lock ends. After that, resale prices can't go below a set share of the original price.",
  },
  {
    icon: Vote,
    title: "Proxy voting, in the open",
    body: "priepo holds voting rights for investor shares. Every resolution shows how priepo voted on your behalf, and why.",
  },
  {
    icon: Users,
    title: "A seat in the room",
    body: "priepo sits on each company's board as a non-voting associate member and is invited to every meeting.",
  },
  {
    icon: EyeOff,
    title: "Anonymous by default",
    body: "Your name appears on a startup page only if you, the founder and priepo all agree. Otherwise you're Anonymous investor #n.",
  },
  {
    icon: FileText,
    title: "Quarterly updates",
    body: "Founders publish structured updates: revenue, burn, runway, headcount, milestones and risks. Published versions can't be edited.",
  },
  {
    icon: Landmark,
    title: "Escrow-style settlement",
    body: "Every trade moves funds buyer to escrow to seller, with a double-entry ledger and separate accounts for user funds and priepo's own.",
  },
];

export default function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Sandbox mode · simulated money
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Back early startups.
              <br />
              <span className="text-brand">Own a piece of them.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              priepo is a marketplace where bootstrap, pre-seed, seed and
              Series A startups list share lots, and everyday people buy them
              to fund the company.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/listings"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground hover:opacity-90"
              >
                Browse listings <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/founders"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold hover:bg-white/10"
              >
                List your startup
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-xs text-white/50">
              Early-stage investing is high risk and you can lose everything
              you invest. Shares are illiquid.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Example listing
              </span>
              <span className="rounded-md bg-white px-2.5 py-1 font-mono text-sm font-bold tracking-widest text-ink">
                K7M4Q
              </span>
            </div>
            <p className="mt-4 text-xl font-bold">Sample Startup Co.</p>
            <p className="text-sm text-white/60">Seed · Climate software</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[62%] rounded-full bg-brand" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/60">
              <span>62% of offered lot sold</span>
              <span>12-month lock</span>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                ["Price", "$2.50"],
                ["Lock", "12 mo"],
                ["Floor", "62.5%"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-white/5 py-3">
                  <dt className="text-[11px] text-white/50">{k}</dt>
                  <dd className="font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[11px] text-white/40">
              Illustrative only. Not a real company or security.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Three roles, one transparent market
          </h2>
          <p className="mt-3 text-muted-foreground">
            Founders raise. Investors buy. priepo administers, holds
            governance rights and keeps the rules honest.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Building2,
              t: "Founders",
              b: "Register and verify your company, create a listing with its own 5-character code, publish quarterly updates and schedule board meetings.",
            },
            {
              icon: ShieldCheck,
              t: "Investors",
              b: "Complete KYC, link a bank account, read the risk acknowledgement, then buy shares and track lots with unlock dates and floor prices.",
            },
            {
              icon: Landmark,
              t: "priepo",
              b: "Approves listings and KYC, sets fees and policy, manages the treasury lot, casts proxy votes and keeps an immutable audit log.",
            },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-2xl border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold">Stages:</span>
          {stages.map((s) => (
            <span key={s} className="rounded-full bg-muted px-3 py-1 font-medium">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-muted/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight">
            Built around clear rules
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-card p-6 shadow-sm">
                <Icon className="h-6 w-6 text-brand" />
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Lock periods and resale floors
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Founders choose the lock. First buyers can resell after it ends,
            at or above the floor. Later buyers face a 3-month lock and no
            floor.
          </p>
          <table className="mt-5 w-full text-left text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 font-semibold">Lock</th>
                <th className="py-2 font-semibold">Minimum resale price</th>
              </tr>
            </thead>
            <tbody>
              {locks.map((l) => (
                <tr key={l.months} className="border-b last:border-0">
                  <td className="py-3 font-semibold">{l.months} months</td>
                  <td className="py-3">
                    {l.floor} of your purchase price per share
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Simple, tiered fees
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Charged on trade value. Buyers pay value plus fee. Sellers receive
            value minus fee. You see the fee before you confirm.
          </p>
          <table className="mt-5 w-full text-left text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 font-semibold">Trade value</th>
                <th className="py-2 font-semibold">Fee</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f) => (
                <tr key={f.tier} className="border-b last:border-0">
                  <td className="py-3 font-semibold">{f.tier}</td>
                  <td className="py-3">{f.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl bg-accent p-6 sm:p-8">
          <h2 className="text-xl font-extrabold">Governance disclosure</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed">
            priepo holds voting rights for investor shares and generally votes
            with the founders. Every listing shows this, and every vote is
            recorded.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            priepo also takes a transaction fee and a 10% allocation of every
            lot. Treasury sales are logged and shown publicly on the
            startup's cap table.
          </p>
        </div>
      </section>
    </>
  );
}
