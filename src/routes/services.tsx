import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Home as HomeIcon,
  Building2,
  Gauge,
  BedDouble,
  Cable,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { solutions, type SolutionSlug } from "@/data/solutions";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Home Automation, BAS, BMS &amp; Control | TRUE" },
      { name: "description", content: "Smart Home Automation, Building Automation Systems (BAS), Building Management Systems (BMS) and low-voltage control & networking services in Kuwait." },
      { property: "og:title", content: "TRUE Services — Home Automation, BAS, BMS, Control" },
      { property: "og:description", content: "Full-stack automation and low-voltage engineering for residential and commercial projects in Kuwait." },
      { property: "og:url", content: "/services" },
    ],
    links: [
      { rel: "canonical", href: "/services" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://true.com.kw/services",
      },
      {
        rel: "alternate",
        hrefLang: "ar",
        href: "https://true.com.kw/ar/services",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://true.com.kw/services",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: HomeIcon,
    eyebrow: "Residential",
    title: "Smart Home Automation",
    description:
      "Turn your villa or apartment into a responsive, scene-based environment. One tap or one voice command sets the mood, the temperature, the music and the security.",
    features: [
      "Lighting control & dimming scenes",
      "Smart climate & HVAC integration",
      "Motorized curtains, shades & shutters",
      "Multi-room audio & video distribution",
      "Voice control (Alexa, Google, Siri)",
      "Smartphone & touch-panel UI",
    ],
  },
  {
    icon: Building2,
    eyebrow: "Commercial",
    title: "Building Automation Systems (BAS)",
    description:
      "We engineer BAS that quietly reduce running costs while keeping occupants comfortable — HVAC, lighting, occupancy and energy, all integrated and scheduled.",
    features: [
      "HVAC sequencing & scheduling",
      "Demand-controlled ventilation",
      "Occupancy- & daylight-based lighting",
      "Energy sub-metering",
      "Open protocols: BACnet, KNX, Modbus",
      "LEED / sustainability support",
    ],
  },
  {
    icon: Gauge,
    eyebrow: "Operations",
    title: "Building Management Systems (BMS)",
    description:
      "A single, vendor-neutral platform to monitor and manage every building system — with analytics, alerts and reports that turn operations from reactive into predictive.",
    features: [
      "Central monitoring dashboards",
      "Multi-site & multi-tenant views",
      "Alarm management & escalation",
      "Energy & sustainability analytics",
      "Predictive & condition-based maintenance",
      "Secure remote access",
    ],
  },
  {
    icon: BedDouble,
    eyebrow: "HOSPITALITY",
    title: "Guest Room Management (GRMS)",
    description:
      "Every guest room becomes a responsive environment — lighting, curtains, HVAC, DND and doorbell, all orchestrated from a single bedside panel or the guest's phone.",
    features: [
      "Bedside panel & touch control",
      "Lighting scenes & dimming",
      "Motorized curtains & shutters",
      "HVAC & temperature control",
      "DND / Make Up Room signage",
      "Mobile app & PMS integration",
    ],
  },
  {
    icon: Cable,
    eyebrow: "Infrastructure",
    title: "Control &amp; Low-Voltage Systems",
    description:
      "The backbone that makes the rest work — certified structured cabling, IP networks, CCTV, access control, intercom, telephony, irrigation and pro audio.",
    features: [
      "Smart IP cameras & CCTV",
      "IoT smart intercom",
      "IP telephony",
      "Structured network solutions",
      "Smart irrigation control",
      "Pro sound systems",
    ],
  },
];

const process = [
  { step: "01", title: "Consult", text: "We listen to how you live or operate, then map the systems that will serve you best." },
  { step: "02", title: "Design", text: "Detailed schematics, equipment selection, and a transparent BOQ — no surprises." },
  { step: "03", title: "Install", text: "Certified technicians execute on-site with clean cabling, commissioning, and testing." },
  { step: "04", title: "Support", text: "Ongoing service, software updates and remote diagnostics keep your system at its peak." },
];

const processContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const processCardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: "easeOut" as const,
    },
  },
};

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero py-24 md:py-32">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="container relative mx-auto px-6 md:px-10 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What We Do</p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
              Services <span className="text-gradient">built around intelligence.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              From a single smart switch to a fully integrated building management
              platform — TRUE delivers automation that is engineered, certified
              and supported end-to-end.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto flex flex-col gap-16 px-6 md:px-10 lg:px-12">
          {services.map((s, i) => (
            <Reveal key={s.title}>
              <div className={`grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-5 md:p-12 ${i % 2 ? "md:[&>:first-child]:order-2" : ""}`}>
                <div className="md:col-span-2">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{s.eyebrow}</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl" dangerouslySetInnerHTML={{ __html: s.title }} />
                  <p className="mt-4 text-muted-foreground">{s.description}</p>
                </div>
                <div className="md:col-span-3">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/40 p-4 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore by Solution</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Go deeper on each solution.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol) => (
              <Link
                key={sol.slug}
                to={`/${sol.slug}` as `/${SolutionSlug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <h3 className="font-semibold group-hover:text-primary">{sol.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{sol.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40 py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Process</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">From idea to integrated, in four steps.</h2>
            </div>
          </Reveal>
          <motion.div
            className="mt-14 grid gap-6 md:grid-cols-4"
            variants={processContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {process.map((p) => (
              <motion.div key={p.step} variants={processCardVariants}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-7">
                  <div className="text-5xl font-bold text-gradient">{p.step}</div>
                  <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <div className="rounded-3xl border border-border bg-gradient-hero p-12 text-center shadow-glow md:p-16">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Bring TRUE into your project.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Get a free consultation with our automation engineers.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
