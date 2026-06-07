import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const halfwayPoint = document.documentElement.scrollHeight * 0.5;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isBelowHalfway = currentScrollY > halfwayPoint;

      setScrolled(currentScrollY > 12);
      setHidden(isBelowHalfway && isScrollingDown);
      lastScrollY = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-20 transition-all duration-300",
        scrolled ? "glass border-b border-border/60" : "",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6 md:px-10 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="TRUE Automation" className="h-18 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-primary/15 ring-1 ring-primary/30" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            aria-label="Open the quick quote form"
            title="Quick quote form"
            className="inline-flex items-center rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Get a Quote
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="container mx-auto mt-2 flex flex-col gap-1 rounded-2xl border border-border/60 bg-card/95 p-3 backdrop-blur">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              aria-label="Open the quick quote form"
              className="mt-1 rounded-lg bg-gradient-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
