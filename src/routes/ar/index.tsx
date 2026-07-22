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
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { ClientsCarousel } from "@/components/site/ClientsCarousel";
import { PartnersSection } from "@/components/site/partners-section";

export const Route = createFileRoute("/ar/")({
  head: () => ({
    meta: [
      { title: "TRUE Automation — حلول أتمتة المنزل وBAS وBMS في الكويت" },
      {
        name: "description",
        content:
          "أتمتة المنزل الذكي وأنظمة أتمتة المباني (BAS) وأنظمة إدارة المباني (BMS) والتحكم بالتيار المنخفض بواسطة TRUE في الكويت.",
      },
      { property: "og:title", content: "TRUE Automation — الكويت" },
      {
        property: "og:description",
        content: "هندسة مساحات ذكية — أتمتة المنزل، BAS، BMS، التحكم.",
      },
      { property: "og:url", content: "/ar/" },
    ],
    links: [
      { rel: "canonical", href: "/ar/" },
      { rel: "alternate", hrefLang: "en", href: "https://true.com.kw/" },
      { rel: "alternate", hrefLang: "ar", href: "https://true.com.kw/ar/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://true.com.kw/" },
    ],
  }),
  component: HomePage,
});

const pillars = [
  {
    icon: HomeIcon,
    title: "أتمتة المنزل",
    blurb:
      "مشاهد إضاءة ومناخ وستائر وموسيقى وأمن — منسّقة من لمسة واحدة أو بصوتك.",
    accent: "from-primary to-primary-glow",
  },
  {
    icon: Building2,
    title: "أتمتة المباني (BAS)",
    blurb:
      "تحكم متكامل بالتكييف والإضاءة والطاقة يتعلم إيقاع مبناك ويقلل تكاليف التشغيل.",
    accent: "from-primary to-primary-glow",
  },
  {
    icon: Gauge,
    title: "إدارة المباني (BMS)",
    blurb:
      "مراقبة وتحليلات مركزية عبر BACnet وKNX وModbus — كل نظام، في لوحة واحدة.",
    accent: "from-primary to-primary-glow",
  },
  {
    icon: BedDouble,
    title: "إدارة الغرف الفندقية (GRMS)",
    blurb:
      "تحكم سلس بالإضاءة والستائر والتكييف وعدم الإزعاج من لوحة واحدة بجانب السرير — مصممة للضيافة.",
    accent: "from-primary to-primary-glow",
  },
];

const capabilities = [
  { icon: Lightbulb, label: "تحكم بالإضاءة" },
  { icon: Wind, label: "تحكم بالتكييف" },
  { icon: Cog, label: "مراقبة وتحكم بالمحركات" },
  { icon: PhoneIcon, label: "اتصال داخلي ذكي" },
  { icon: Camera, label: "كاميرات IP ذكية" },
  { icon: Headphones, label: "اتصالات هاتفية عبر IP" },
  { icon: Droplets, label: "تحكم بالري" },
  { icon: Music2, label: "أنظمة صوت ذكية" },
  { icon: Network, label: "حلول شبكات كاملة" },
  { icon: Sparkles, label: "والمزيد" },
];

const stats = [
  { label: "فلل", value: 120 },
  { label: "مطاعم راقية", value: 35 },
  { label: "صالات عرض", value: 60 },
  { label: "محلات ملابس", value: 80 },
  { label: "سنوات في السوق", value: 15, caption: "تأسست 2010" },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="منزل ذكي فاخر عند الغسق بإضاءة هادئة"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-y-0 right-0 w-3/4 bg-gradient-to-l from-background/95 via-background/70 to-transparent md:w-1/2" />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/85 to-background/30" />
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
              مساحات ذكية،{" "}
              <span className="text-gradient">تحكم سلس تمامًا.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              من الفلل الفاخرة إلى الأبراج التجارية، تقدم TRUE أنظمة أتمتة
              معتمدة من LEED توحّد المنازل الذكية وBAS وBMS والتحكم بالتيار
              المنخفض في مساحات مبنية للراحة والأداء والاستدامة.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/ar/services"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                شاهد ماذا نقدم
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                to="/ar/contact"
                aria-label="تواصل مباشرة مع مهندس بخصوص مشروع الأتمتة الخاص بك"
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur transition-colors hover:border-white hover:bg-card"
              >
                تحدث مع مهندس
              </Link>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <span>معتمد LEED — من مجلس المباني الخضراء الأمريكي</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="border-y border-border/60 bg-card/30 py-32 md:py-27">
        <div className="container mx-auto grid gap-12 px-6 md:px-10 lg:px-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              من نحن
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              مهندسو أسلوب حياة أذكى وأكثر ترابطًا.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              TRUE هي الوجهة الأولى في الكويت للأتمتة الذكية المتطورة وحلول
              التيار المنخفض. بصفتنا الموزع المعتمد لعلامات عالمية رائدة، ندمج
              أحدث التطورات بسلاسة في مساحاتك — لتصبح بيئات العيش والعمل مستجيبة
              وبديهية دون عناء.
            </p>
            <Link
              to="/ar/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-glow"
            >
              شاهد ماذا نقدم <ArrowRight className="h-4 w-4 rotate-180" />
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                ركائزنا
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                أربعة تخصصات. نظام واحد متكامل.
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
                  <div
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.accent} opacity-60`}
                  />
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.accent} text-primary-foreground shadow-glow`}
                  >
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.blurb}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    <Link to="/ar/services">اعرف المزيد</Link>
                    <ArrowRight className="h-4 w-4 rotate-180" />
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
                alt="غرفة تحكم BMS بلوحة تحليلات التكييف والطاقة"
                width={1600}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              BAS · BMS
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              كل نظام، في لوحة واحدة.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              ندمج التكييف والإضاءة والطاقة والدخول والسلامة في نظام BMS واحد
              محايد تجاه الموردين — يتحدث بطلاقة BACnet وKNX وModbus. يرى
              المشغّلون ما يهم، ويرى الملّاك التكلفة، ويشعر المستأجرون بالراحة
              فقط.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
              {[
                "مراقبة وتحكم مركزي",
                "تحليلات وتقارير الطاقة",
                "تنبيهات صيانة تنبؤية",
                "لوحات تحكم متعددة المواقع",
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                القدرات
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                كل ما يخص التيار المنخفض، تحت سقف واحد.
              </h2>
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
                <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
                {"caption" in s && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {s.caption}
                  </div>
                )}
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                شركاء التقنية
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                معتمدون من الأفضل. مبنيون ليدوموا.
              </h2>
              <p className="mt-4 text-muted-foreground">
                نحن شريك معتمد لأبرز علامات الأتمتة العالمية.
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
                  هل أنت مستعد لجعل مساحتك أذكى؟
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  أرسل لنا التفاصيل — وسنتولى الباقي.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link
                  to="/ar/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  أخبرنا عن مشروعك <ArrowRight className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
