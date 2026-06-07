import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Home as HomeIcon,
  Building2,
  Gauge,
  BedDouble,
  Lightbulb,
  Wind,
  Cog,
  Phone as PhoneIcon,
  Camera,
  Headphones,
  Droplets,
  Music2,
  Network,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-home.jpg";
import bmsImg from "@/assets/bms.jpg";
import usgbcLogo from "@/assets/usgbc.png";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { ClientsCarousel } from "@/components/site/ClientsCarousel";
import { PartnersSection } from "@/components/site/partners-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRUE Automation — Smart Home, BAS & BMS Solutions in Kuwait" },
      { name: "description", content: "Smart home automation, Building Automation Systems (BAS), Building Management Systems (BMS) and low-voltage control by TRUE in Kuwait." },
      { property: "og:title", content: "TRUE Automation — Kuwait" },
      { property: "og:description", content: "Engineering intelligent spaces — Home Automation, BAS, BMS, Control." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const pillars = [
  {
    icon: HomeIcon,
    title: "Home Automation",
    blurb: "Lighting scenes, climate, curtains, music and security — orchestrated from a single touch or your voice.",
    accent: "from-primary to-primary-glow",
  },
  {
    icon: Building2,
    title: "Building Automation (BAS)",
    blurb: "Integrated HVAC, lighting and energy control that learns your building's rhythm and trims operating costs.",
    accent: "from-primary to-primary-glow",
  },
  {
    icon: Gauge,
    title: "Building Management (BMS)",
    blurb: "Centralized monitoring and analytics over BACnet, KNX and Modbus — every system, one pane of glass.",
    accent: "from-primary to-primary-glow",
  },
  {
    icon: BedDouble,
    title: "Guest Room Management (GRMS)",
    blurb: "Seamless control of lighting, curtains, HVAC and DND from a single bedside panel � engineered for hospitality.",
    accent: "from-primary to-primary-glow",
  },
];

const capabilities = [
  { icon: Lightbulb, label: "Lighting Control" },
  { icon: Wind, label: "HVAC Control" },
  { icon: Cog, label: "Motor Monitor & Control" },
  { icon: PhoneIcon, label: "IoT Smart Intercom" },
  { icon: Camera, label: "Smart IP Cameras" },
  { icon: Headphones, label: "IP Telephony" },
  { icon: Droplets, label: "Irrigation Control" },
  { icon: Music2, label: "Smart Sound Systems" },
  { icon: Network, label: "Full Network Solutions" },
  { icon: Sparkles, label: "& much more" },
];

const stats = [
  { label: "Villas", value: 120 },
  { label: "Fine Dining", value: 35 },
  { label: "Show Rooms", value: 60 },
  { label: "Clothing Outlets", value: 80 },
  { label: "Years in the Market", value: 15, caption: "Est. 2010" },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Luxury smart home interior at dusk with ambient lighting"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-background/95 via-background/70 to-transparent md:w-1/2" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>

        <div className="container mx-auto px-6 md:px-10 lg:px-12 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl xl:text-7xl">
              Intelligent spaces,{" "}
              <span className="text-gradient">seamlessly controlled.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              From luxury villas to commercial towers, TRUE delivers LEED Certified
              automation systems that unite smart homes, BAS, BMS and low-voltage
              control into spaces built for comfort, performance and sustainability.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                See What We Do
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                aria-label="Contact an engineer directly about your automation project"
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur transition-colors hover:border-white hover:bg-card"
              >
                Talk to an Engineer
              </Link>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <span>LEED Certified — U.S. Green Building Council</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="border-y border-border/60 bg-card/30 py-32 md:py-27">
        <div className="container mx-auto grid gap-12 px-6 md:px-10 lg:px-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Who We Are</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Architects of a smarter, more connected lifestyle.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              TRUE is Kuwait's premier destination for cutting-edge smart
              automation and low-voltage solutions. As the certified distributor
              of world-class brands, we integrate the latest advancements
              seamlessly into your spaces — making living and working
              environments effortlessly responsive and intuitive.
            </p>
            <Link
              to="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-glow"
            >
              See what we do <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ClientsCarousel />

      {/* PILLARS */}
      <section id="pillars-section" className="py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Pillars</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Four disciplines. One integrated system.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card"
                >
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.accent} opacity-60`} />
                  <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.accent} text-primary-foreground shadow-glow`}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold" dangerouslySetInnerHTML={{ __html: p.title }} />
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    <Link to="/services">Learn more</Link>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BMS SPLIT */}
      <section className="bg-card/40 py-28">
        <div className="container mx-auto grid gap-12 px-6 md:px-10 lg:px-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-card before:absolute before:inset-x-10 before:bottom-0 before:h-12 before:translate-y-1/2 before:rounded-full before:bg-primary/20 before:blur-2xl">
              <img
                src={bmsImg}
                alt="BMS control room dashboard with HVAC and energy analytics"
                width={1600}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">BAS · BMS</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Every system, one pane of glass.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              We integrate HVAC, lighting, energy, access and safety into a
              single, vendor-neutral BMS — speaking BACnet, KNX and Modbus
              fluently. Operators see what matters, owners see what it costs,
              tenants just feel the comfort.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
              {[
                "Centralized monitoring & control",
                "Energy analytics and reporting",
                "Predictive maintenance alerts",
                "Multi-site dashboards",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-28">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Capabilities</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Everything low-voltage, under one roof.</h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((c, i) => (
              <Reveal key={c.label} delay={(i % 5) * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{c.label}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-gradient-hero py-20">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-6 md:px-10 lg:px-12 md:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="text-5xl font-bold text-gradient md:text-6xl">
                  <Counter to={s.value} />
                </div>
                <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">{s.label}</div>
                {"caption" in s && <div className="mt-1 text-xs text-muted-foreground">{s.caption}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-40">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Technology Partners</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Certified by the best. Built to last.
              </h2>
              <p className="mt-4 text-muted-foreground">
                We are an authorised partner of the world's leading automation brands.
              </p>
            </div>
          </Reveal>

          <PartnersSection />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-hero p-12 shadow-glow md:p-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  Ready to make your space smarter?
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Drop us the details — we'll handle the rest.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  Tell Us About Your Project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}





