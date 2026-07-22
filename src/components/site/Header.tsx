import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { solutions, type SolutionSlug } from "@/data/solutions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navEn = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
] as const;

const navAr = [
  { to: "/ar", label: "الرئيسية" },
  { to: "/ar/services", label: "الخدمات" },
] as const;

function counterpartPath(pathname: string, isAr: boolean) {
  if (isAr) {
    const stripped = pathname.replace(/^\/ar\/?/, "/");
    return stripped === "" ? "/" : stripped;
  }
  return pathname === "/" ? "/ar/" : `/ar${pathname}`;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const isAr = location.pathname.startsWith("/ar");
  const nav = isAr ? navAr : navEn;
  const solutionsLabel = isAr ? "الحلول" : "Solutions";
  const quoteLabel = isAr ? "اطلب عرض سعر" : "Get a Quote";
  const switchHref = counterpartPath(location.pathname, isAr);

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
        <Link to={isAr ? "/ar" : "/"} className="flex items-center gap-3">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  solutions.some(
                    (s) =>
                      location.pathname === `${isAr ? "/ar" : ""}/${s.slug}`,
                  )
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {solutionsLabel}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={isAr ? "end" : "start"}
              className="w-72"
            >
              {solutions.map((s) => (
                <DropdownMenuItem key={s.slug} asChild>
                  <Link
                    to={
                      (isAr
                        ? `/ar/${s.slug}`
                        : `/${s.slug}`) as `/${SolutionSlug}`
                    }
                  >
                    <div>
                      <div className="font-medium">
                        {isAr ? s.labelAr : s.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isAr ? s.shortAr : s.short}
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to={switchHref as never}
            aria-label={isAr ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Globe className="h-3.5 w-3.5" />
            {isAr ? "EN" : "عربي"}
          </Link>
          <Link
            to={isAr ? "/ar/contact" : "/contact"}
            aria-label={
              isAr ? "افتح نموذج طلب عرض السعر" : "Open the quick quote form"
            }
            title={isAr ? "نموذج طلب عرض السعر" : "Quick quote form"}
            className="inline-flex items-center rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            {quoteLabel}
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
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {solutionsLabel}
            </div>
            {solutions.map((s) => (
              <Link
                key={s.slug}
                to={
                  (isAr ? `/ar/${s.slug}` : `/${s.slug}`) as `/${SolutionSlug}`
                }
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {isAr ? s.labelAr : s.label}
              </Link>
            ))}
            <Link
              to={switchHref as never}
              className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {isAr ? "English" : "العربية"}
            </Link>
            <Link
              to={isAr ? "/ar/contact" : "/contact"}
              aria-label={
                isAr ? "افتح نموذج طلب عرض السعر" : "Open the quick quote form"
              }
              className="mt-1 rounded-lg bg-gradient-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              {quoteLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
