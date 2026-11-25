import { Link } from "react-router-dom";
import { ArrowRight, Building2, Landmark, TrendingUp } from "lucide-react";
import { dashboardRoles, type RoleSlug } from "@/lib/dashboard";

const icons: Record<RoleSlug, typeof Landmark> = {
  priepo: Landmark,
  investor: TrendingUp,
  founder: Building2,
};

export default function Dashboard() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">
        Dashboards
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Choose your dashboard
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Sign-in is bypassed for now, so you can open all three dashboards. Each
        one lists the pages for its role.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {dashboardRoles.map((role) => {
          const Icon = icons[role.slug];
          return (
            <Link
              key={role.slug}
              to={`/dashboard/${role.slug}`}
              className="group flex flex-col rounded-2xl border bg-card p-6 transition-colors hover:border-brand"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{role.label} dashboard</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {role.tagline}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Open {role.label.toLowerCase()} dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
