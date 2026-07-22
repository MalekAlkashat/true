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

export const Route = createFileRoute("/ar/services")({
  head: () => ({
    meta: [
      { title: "الخدمات — أتمتة المنزل وBAS وBMS والتحكم | TRUE" },
      {
        name: "description",
        content:
          "أتمتة المنزل الذكي وأنظمة أتمتة المباني (BAS) وأنظمة إدارة المباني (BMS) وخدمات التحكم والشبكات بالتيار المنخفض في الكويت.",
      },
      {
        property: "og:title",
        content: "خدمات TRUE — أتمتة المنزل وBAS وBMS والتحكم",
      },
      {
        property: "og:description",
        content:
          "هندسة شاملة للأتمتة والتيار المنخفض للمشاريع السكنية والتجارية في الكويت.",
      },
      { property: "og:url", content: "/ar/services" },
    ],
    links: [
      { rel: "canonical", href: "/ar/services" },
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
    eyebrow: "سكني",
    title: "أتمتة المنزل الذكي",
    description:
      "حوّل فيلتك أو شقتك إلى بيئة ذكية تستجيب لك. لمسة واحدة أو أمر صوتي واحد يضبط الأجواء ودرجة الحرارة والموسيقى والأمن.",
    features: [
      "تحكم بالإضاءة ومشاهد الإعتام",
      "تكامل ذكي مع المناخ والتكييف",
      "ستائر وشدات آلية",
      "توزيع صوت وفيديو متعدد الغرف",
      "تحكم صوتي (Alexa وGoogle وSiri)",
      "واجهة تحكم عبر الهاتف ولوحة اللمس",
    ],
  },
  {
    icon: Building2,
    eyebrow: "تجاري",
    title: "أنظمة أتمتة المباني (BAS)",
    description:
      "نصمم أنظمة BAS تخفض تكاليف التشغيل بهدوء مع الحفاظ على راحة المستخدمين — تكييف وإضاءة وإشغال وطاقة، كلها متكاملة ومجدولة.",
    features: [
      "تسلسل وجدولة التكييف",
      "تهوية بالتحكم حسب الطلب",
      "إضاءة قائمة على الإشغال والضوء الطبيعي",
      "قياس فرعي للطاقة",
      "بروتوكولات مفتوحة: BACnet وKNX وModbus",
      "دعم شهادات LEED والاستدامة",
    ],
  },
  {
    icon: Gauge,
    eyebrow: "العمليات",
    title: "أنظمة إدارة المباني (BMS)",
    description:
      "منصة واحدة محايدة تجاه الموردين لمراقبة وإدارة كل أنظمة المبنى — بتحليلات وتنبيهات وتقارير تحوّل العمليات من رد الفعل إلى الاستباقية.",
    features: [
      "لوحات مراقبة مركزية",
      "عرض متعدد المواقع والمستأجرين",
      "إدارة الإنذارات والتصعيد",
      "تحليلات الطاقة والاستدامة",
      "صيانة تنبؤية قائمة على الحالة",
      "وصول آمن عن بُعد",
    ],
  },
  {
    icon: BedDouble,
    eyebrow: "الضيافة",
    title: "إدارة الغرف الفندقية (GRMS)",
    description:
      "تتحول كل غرفة ضيوف إلى بيئة ذكية — إضاءة وستائر وتكييف وعدم إزعاج وجرس الباب، كلها منسقة من لوحة واحدة بجانب السرير أو من هاتف الضيف.",
    features: [
      "لوحة تحكم بجانب السرير",
      "مشاهد إضاءة وإعتام",
      "ستائر وشدات آلية",
      "تحكم بالتكييف ودرجة الحرارة",
      "لافتات عدم الإزعاج / نظفوا الغرفة",
      "تكامل تطبيق الجوال ونظام PMS",
    ],
  },
  {
    icon: Cable,
    eyebrow: "البنية التحتية",
    title: "أنظمة التحكم والتيار المنخفض",
    description:
      "العمود الفقري الذي يجعل كل شيء آخر يعمل — تمديدات منظمة معتمدة وشبكات IP وكاميرات مراقبة وتحكم بالدخول واتصال داخلي واتصالات وري وصوت احترافي.",
    features: [
      "كاميرات IP ذكية ومراقبة",
      "اتصال داخلي ذكي عبر إنترنت الأشياء",
      "اتصالات هاتفية عبر IP",
      "حلول شبكات منظمة",
      "تحكم ذكي بالري",
      "أنظمة صوت احترافية",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "استشارة",
    text: "نستمع إلى كيفية عيشك أو عملك، ثم نحدد الأنظمة التي ستخدمك أفضل.",
  },
  {
    step: "02",
    title: "تصميم",
    text: "مخططات تفصيلية واختيار للمعدات وجدول كميات شفاف — بلا مفاجآت.",
  },
  {
    step: "03",
    title: "تركيب",
    text: "فنيون معتمدون ينفذون العمل الميداني بتمديدات نظيفة وتشغيل واختبار.",
  },
  {
    step: "04",
    title: "دعم",
    text: "خدمة مستمرة وتحديثات برمجية وتشخيص عن بُعد تحافظ على أداء نظامك في أوجه.",
  },
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              ماذا نقدم
            </p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
              خدمات <span className="text-gradient">مبنية حول الذكاء.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              من مفتاح ذكي واحد إلى منصة إدارة مباني متكاملة بالكامل — تقدم TRUE
              أتمتة مصممة ومعتمدة ومدعومة من الألف إلى الياء.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto flex flex-col gap-16 px-6 md:px-10 lg:px-12">
          {services.map((s, i) => (
            <Reveal key={s.title}>
              <div
                className={`grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-5 md:p-12 ${i % 2 ? "md:[&>:first-child]:order-2" : ""}`}
              >
                <div className="md:col-span-2">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {s.eyebrow}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground">{s.description}</p>
                </div>
                <div className="md:col-span-3">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/40 p-4 text-sm"
                      >
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                استكشف حسب الحل
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                تعمّق في كل حل.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol) => (
              <Link
                key={sol.slug}
                to={`/ar/${sol.slug}` as `/${SolutionSlug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <h3 className="font-semibold group-hover:text-primary">
                  {sol.labelAr}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {sol.shortAr}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40 py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                آلية عملنا
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                من الفكرة إلى التكامل، في أربع خطوات.
              </h2>
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
                  <div className="text-5xl font-bold text-gradient">
                    {p.step}
                  </div>
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
              أدخل TRUE إلى مشروعك.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              احصل على استشارة مجانية مع مهندسي الأتمتة لدينا.
            </p>
            <Link
              to="/ar/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              تواصل معنا <ArrowRight className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
