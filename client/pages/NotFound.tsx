import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">Page not found</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </section>
  );
};

export default NotFound;
