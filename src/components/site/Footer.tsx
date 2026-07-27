import { Link, useRouterState } from "@tanstack/react-router";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { solutions, type SolutionSlug } from "@/data/solutions";

const WHATSAPP_URL = "https://wa.me/96552220900";

const t = {
  en: {
    blurb:
      "Kuwait's premier destination for smart automation, BAS, BMS and low-voltage solutions. We engineer intelligent spaces that respond, adapt, and save energy.",
    explore: "Explore",
    home: "Home",
    services: "Services",
    contact: "Contact",
    solutions: "Solutions",
    reachUs: "Reach Us",
    address: "Shoaa' Center, Ibn Khaldoun Street, 5th Fl, Hawally, Kuwait",
    rights: "TRUE for General Trading & Contracting Co. — Automation & More.",
    homeHref: "/",
    servicesHref: "/services",
    contactHref: "/contact",
  },
  ar: {
    blurb:
      "الوجهة الأولى في الكويت للأتمتة الذكية وأنظمة BAS وBMS وحلول التيار المنخفض. نصمم مساحات ذكية تستجيب وتتكيف وتوفر الطاقة.",
    explore: "استكشف",
    home: "الرئيسية",
    services: "الخدمات",
    contact: "تواصل معنا",
    solutions: "الحلول",
    reachUs: "تواصل معنا",
    address: "مركز الشعاع، شارع ابن خلدون، الطابق الخامس، حولي، الكويت",
    rights: "شركة TRUE للتجارة العامة والمقاولات — الأتمتة وأكثر.",
    homeHref: "/ar",
    servicesHref: "/ar/services",
    contactHref: "/ar/contact",
  },
} as const;

export function Footer() {
  const { location } = useRouterState();
  const isAr = location.pathname.startsWith("/ar");
  const s = isAr ? t.ar : t.en;

  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="container mx-auto grid gap-12 px-6 md:px-10 lg:px-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="TRUE Automation" className="h-18 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {s.blurb}
          </p>
          <div className="mt-6 flex gap-3">
            {[
              {
                Icon: Instagram,
                href: "https://www.instagram.com/true.automation",
              },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/company/true-for-genral-trading-&-contracting-co-",
              },
              { Icon: MessageCircle, href: WHATSAPP_URL },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {s.explore}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to={s.homeHref as never} className="hover:text-foreground">
                {s.home}
              </Link>
            </li>
            <li>
              <Link
                to={s.servicesHref as never}
                className="hover:text-foreground"
              >
                {s.services}
              </Link>
            </li>
            <li>
              <Link
                to={s.contactHref as never}
                className="hover:text-foreground"
              >
                {s.contact}
              </Link>
            </li>
          </ul>
          <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground">
            {s.solutions}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {solutions.slice(0, 4).map((sol) => (
              <li key={sol.slug}>
                <Link
                  to={
                    (isAr
                      ? `/ar/${sol.slug}`
                      : `/${sol.slug}`) as `/${SolutionSlug}`
                  }
                  className="hover:text-foreground"
                >
                  {isAr ? sol.labelAr : sol.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {s.reachUs}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex flex-wrap gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href="tel:+96552220900"
                className="hover:text-foreground"
                dir="ltr"
              >
                +965 5222 0900
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href="tel:+96550544882"
                className="hover:text-foreground"
                dir="ltr"
              >
                +965 5054 4882
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href="mailto:info@true.com.kw"
                className="hover:text-foreground"
              >
                info@true.com.kw
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{s.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {s.rights}
      </div>
    </footer>
  );
}
