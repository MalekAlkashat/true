import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { JsonLd } from "@/components/site/JsonLd";
import { solutions, type SolutionSlug } from "@/data/solutions";

export interface SolutionFaq {
  q: string;
  a: string;
}

export interface SolutionContent {
  slug: SolutionSlug;
  locale?: "en" | "ar";
  eyebrow: string;
  h1: string;
  highlight: string;
  heroLead: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  features: { title: string; text: string }[];
  faqs: SolutionFaq[];
  serviceType: string;
  schemaDescription: string;
}

const chrome = {
  en: {
    homePath: "/",
    servicesPath: "/services",
    contactPath: "/contact",
    home: "Home",
    services: "Services",
    overview: "Overview",
    featuresHeading: "What's included",
    faqHeading: "Frequently asked questions",
    relatedHeading: "Explore other solutions",
    ctaHeading: "Ready to bring this into your project?",
    ctaText: "Get a free consultation with our automation engineers.",
    ctaButton: "Talk to an Engineer",
  },
  ar: {
    homePath: "/ar",
    servicesPath: "/ar/services",
    contactPath: "/ar/contact",
    home: "الرئيسية",
    services: "الخدمات",
    overview: "نظرة عامة",
    featuresHeading: "ما الذي يشمله الحل",
    faqHeading: "الأسئلة الشائعة",
    relatedHeading: "استكشف حلولاً أخرى",
    ctaHeading: "هل أنت مستعد لدمج هذا في مشروعك؟",
    ctaText: "احصل على استشارة مجانية مع مهندسي الأتمتة لدينا.",
    ctaButton: "تحدث مع مهندس",
  },
} as const;

export function SolutionPage(content: SolutionContent) {
  const locale = content.locale ?? "en";
  const t = chrome[locale];
  const isAr = locale === "ar";
  const origin = "https://true.com.kw";
  const pagePath = isAr ? `/ar/${content.slug}` : `/${content.slug}`;
  const pageUrl = `${origin}${pagePath}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: content.serviceType,
    name: content.h1,
    description: content.schemaDescription,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "TRUE for General Trading & Contracting Co.",
      url: origin,
    },
    areaServed: { "@type": "Country", name: "Kuwait" },
    url: pageUrl,
    inLanguage: locale,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t.home,
        item: `${origin}${t.homePath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.services,
        item: `${origin}${t.servicesPath}`,
      },
      { "@type": "ListItem", position: 3, name: content.h1, item: pageUrl },
    ],
  };

  const related = solutions.filter((s) => s.slug !== content.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav
        aria-label="Breadcrumb"
        className="border-b border-border/60 bg-card/30"
      >
        <div className="container mx-auto flex items-center gap-2 px-6 py-3 text-xs text-muted-foreground md:px-10 lg:px-12">
          <Link to={t.homePath as never} className="hover:text-foreground">
            {t.home}
          </Link>
          <span>/</span>
          <Link to={t.servicesPath as never} className="hover:text-foreground">
            {t.services}
          </Link>
          <span>/</span>
          <span className="text-foreground">{content.h1}</span>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero py-20 md:py-28">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="container relative mx-auto px-6 md:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              {content.h1}{" "}
              <span className="text-gradient">{content.highlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              {content.heroLead}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={t.contactPath as never}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                {t.ctaButton}
                <ArrowRight
                  className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isAr ? "rotate-180" : ""}`}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t.overview}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {content.overviewHeading}
            </h2>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-4 text-muted-foreground">
            {content.overviewParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30 py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t.featuresHeading}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 6) * 0.05}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {f.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6 md:px-10 lg:px-12">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t.faqHeading}
            </h2>
          </Reveal>
          <Accordion type="single" collapsible className="mt-8">
            {content.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30 py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t.relatedHeading}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                to={
                  (isAr ? `/ar/${s.slug}` : `/${s.slug}`) as `/${SolutionSlug}`
                }
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <h3 className="font-semibold group-hover:text-primary">
                  {isAr ? s.labelAr : s.label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isAr ? s.shortAr : s.short}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <div className="rounded-3xl border border-border bg-gradient-hero p-12 text-center shadow-glow md:p-16">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t.ctaHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t.ctaText}
            </p>
            <Link
              to={t.contactPath as never}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              {t.ctaButton}{" "}
              <ArrowRight className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
