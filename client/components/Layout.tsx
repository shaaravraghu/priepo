import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/listings", label: "Browse listings" },
  { to: "/founders", label: "For founders" },
  { to: "/investors", label: "For investors" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/compliance", label: "Compliance" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="priepo home">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-brand-foreground text-lg font-extrabold">
        p
      </span>
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight",
          light ? "text-white" : "text-ink",
        )}
      >
        priepo
      </span>
    </Link>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <div
        role="status"
        className="bg-amber-300 px-4 py-1.5 text-center text-xs font-bold tracking-wider text-ink"
      >
        SIMULATION - NOT REAL SECURITIES
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-ink",
                    isActive && "text-ink",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/sign-in"
              className="rounded-md px-3 py-2 text-sm font-semibold text-ink hover:bg-muted"
            >
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
          </div>
          <button
            className="rounded-md p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t bg-background px-4 pb-4 lg:hidden">
            {[...nav, { to: "/sign-in", label: "Sign in" }, { to: "/sign-up", label: "Get started" }].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-medium hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-ink text-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div className="space-y-3">
            <Logo light />
            <p className="max-w-xs text-sm">
              A marketplace where early-stage startups list share lots and
              individuals buy them.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Platform</p>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="block hover:text-white">
                {n.label}
              </Link>
            ))}
          </div>
          <p className="text-xs leading-relaxed">
            Investing in early-stage companies is high risk. You may lose all
            of the money you put in. Shares are illiquid and locked after
            purchase. priepo is currently running in sandbox mode with
            simulated money. Nothing here is investment advice or a promise of
            returns.
          </p>
        </div>
      </footer>
    </div>
  );
}
