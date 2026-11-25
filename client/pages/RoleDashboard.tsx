import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { findRole } from "@/lib/dashboard";
import NotFound from "./NotFound";

export default function RoleDashboard() {
  const { role: roleSlug } = useParams();
  const role = findRole(roleSlug);
  if (!role) return <NotFound />;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> All dashboards
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {role.label} dashboard
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{role.tagline}</p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {role.sections.map((section) => (
          <Link
            key={section.slug}
            to={`/dashboard/${role.slug}/${section.slug}`}
            className="group flex items-center justify-between rounded-xl border bg-card px-5 py-4 text-sm font-semibold transition-colors hover:border-brand"
          >
            {section.title}
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
          </Link>
        ))}
      </div>
    </section>
  );
}
