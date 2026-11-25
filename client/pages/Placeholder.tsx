import { Link } from "react-router-dom";
import { Construction } from "lucide-react";

export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-brand">
        <Construction />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-3 text-muted-foreground">
        This page isn't built yet. Keep prompting to fill in this page's
        contents.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </section>
  );
}
