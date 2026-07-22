import { createFileRoute } from "@tanstack/react-router";
import {
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  BedDouble,
  Cable,
  Check,
  ChevronDown,
  Clock,
  Gauge,
  Home,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  UploadCloud,
  X,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/96552220900";
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const ACCEPTED_FILE_EXTENSIONS = new Set([
  "pdf",
  "dwg",
  "dwf",
  "jpg",
  "jpeg",
  "png",
  "zip",
]);
const ACCEPTED_FILE_TYPES = ".pdf,.dwg,.dwf,.jpg,.jpeg,.png,.zip";
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const MAX_FILES = 5;

export const Route = createFileRoute("/ar/contact")({
  head: () => ({
    meta: [
      { title: "تواصل مع TRUE Automation - الكويت" },
      {
        name: "description",
        content:
          "تحدث مع مهندسي TRUE Automation في الكويت حول مشاريع المنزل الذكي وBAS وBMS والتيار المنخفض. اتصل على 0900 5222 965+ أو راسلنا على info@true.com.kw.",
      },
      { property: "og:title", content: "تواصل مع TRUE Automation" },
      {
        property: "og:description",
        content:
          "احصل على استشارة مجانية لمشروع المنزل الذكي أو أتمتة المباني في الكويت.",
      },
      { property: "og:url", content: "/ar/contact" },
    ],
    links: [
      { rel: "canonical", href: "/ar/contact" },
      { rel: "alternate", hrefLang: "en", href: "https://true.com.kw/contact" },
      {
        rel: "alternate",
        hrefLang: "ar",
        href: "https://true.com.kw/ar/contact",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://true.com.kw/contact",
      },
    ],
  }),
  component: ContactPage,
});

const countries = [
  { code: "KW", name: "الكويت", dial: "+965" },
  { code: "SA", name: "السعودية", dial: "+966" },
  { code: "AE", name: "الإمارات العربية المتحدة", dial: "+971" },
  { code: "QA", name: "قطر", dial: "+974" },
  { code: "BH", name: "البحرين", dial: "+973" },
  { code: "OM", name: "عُمان", dial: "+968" },
];

const steps = ["من أنت؟", "المشروع", "المخططات"];
const spaceTypes = ["فيلا / سكن", "مبنى تجاري", "ضيافة", "تجزئة", "أخرى"];
const systems = [
  { label: "أتمتة المنزل", icon: Home },
  { label: "أتمتة المباني (BAS)", icon: Building2 },
  { label: "إدارة المباني (BMS)", icon: Gauge },
  { label: "نظام إدارة الغرف الفندقية (GRMS)", icon: BedDouble },
  { label: "أنظمة التيار المنخفض", icon: Cable },
];
const wiringOptions = ["سلكي", "لاسلكي", "غير متأكد بعد"];
const homeSystems = [
  "التحكم بالإضاءة",
  "الستائر والشدات",
  "التحكم بالتكييف",
  "نظام الصوت",
  "نظام الاتصال الداخلي",
  "التحكم بالري",
  "مراقبة المنشأة",
];
const systemSubOptions: Record<string, string[]> = {
  "أتمتة المنزل": homeSystems,
  "أتمتة المباني (BAS)": [
    "التحكم بالتكييف والجدولة",
    "أتمتة الإضاءة",
    "مراقبة الطاقة",
    "تكامل التحكم بالدخول",
    "تكامل إنذار الحريق",
    "مراقبة المصاعد والسلالم الكهربائية",
  ],
  "إدارة المباني (BMS)": [
    "لوحة مركزية وتقارير",
    "تحكم متعدد الطوابق / المناطق",
    "تنبيهات صيانة تنبؤية",
    "تحليلات الطاقة",
    "تكامل BACnet / KNX / Modbus",
    "وصول وتشخيص عن بُعد",
  ],
  "نظام إدارة الغرف الفندقية (GRMS)": [
    "لوحة تحكم بجانب السرير",
    "مشاهد إضاءة وإعتام",
    "ستائر وشدات آلية",
    "تحكم بالتكييف ودرجة الحرارة",
    "لافتات عدم الإزعاج / نظفوا الغرفة",
    "تكامل تطبيق الجوال ونظام PMS",
  ],
  "أنظمة التيار المنخفض": [
    "تمديدات وشبكات منظمة",
    "كاميرات IP ومراقبة",
    "اتصال داخلي وفيديو للباب",
    "نظام صوت ونداء عام",
    "توزيع الأقمار الصناعية والتلفاز",
    "التحكم بالدخول والقياسات الحيوية",
  ],
};

type WizardData = {
  fullName: string;
  email: string;
  countryCode: string;
  mobile: string;
  spaceType: string;
  systems: string[];
  wiringPreference: string;
  homeSystems: string[];
  notes: string;
};

const initialData: WizardData = {
  fullName: "",
  email: "",
  countryCode: "+965",
  mobile: "",
  spaceType: "",
  systems: [],
  wiringPreference: "",
  homeSystems: [],
  notes: "",
};

function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero py-24 md:py-28">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="container relative mx-auto px-6 md:px-10 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              تواصل معنا
            </p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
              لنبنِ شيئًا <span className="text-gradient">ذكيًا.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              أخبرنا عن مشروعك - يرد مهندسونا خلال يوم عمل واحد.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-10 px-6 md:px-10 lg:px-12 lg:grid-cols-5">
          <Reveal className="contents lg:col-span-2 lg:block">
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: "اتصال",
                  value: "+965 5222 0900",
                  href: "tel:+96552220900",
                },
                {
                  icon: Phone,
                  label: "جوال",
                  value: "+965 5054 4882",
                  href: "tel:+96550544882",
                },
                {
                  icon: Mail,
                  label: "البريد الإلكتروني",
                  value: "info@true.com.kw",
                  href: "mailto:info@true.com.kw",
                },
                {
                  icon: MapPin,
                  label: "المكتب",
                  value:
                    "شارع بن خلدون، مجمع الشعاع، الطابق الخامس، حولي، الكويت",
                },
                {
                  icon: Clock,
                  label: "ساعات العمل",
                  value: "الأحد - الخميس - 9:00 - 18:00",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm font-medium text-foreground">
                      {c.href ? (
                        <a
                          href={c.href}
                          className="hover:text-primary"
                          dir="ltr"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span>{c.value}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-last mt-6 overflow-hidden rounded-2xl border border-border shadow-card md:order-none">
              <iframe
                title="موقع مكتب TRUE Automation"
                src="https://www.google.com/maps?q=Ben+Khaldoun+St,+Shoaa+Complex,+Hawally,+Kuwait&output=embed"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3">
            <ContactWizard />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactWizard() {
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);
  const [fileError, setFileError] = useState("");
  const [complete, setComplete] = useState(false);
  const [sending, setSending] = useState(false);

  const selectedCountry =
    countries.find((country) => country.dial === data.countryCode) ??
    countries[0];

  function scrollToFormTop() {
    const formTop =
      (formRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      100;
    window.scrollTo({ top: formTop, behavior: "smooth" });
  }

  function updateField<K extends keyof WizardData>(
    field: K,
    value: WizardData[K],
  ) {
    setData((current) => ({ ...current, [field]: value }));
    setShowRequiredMessage(false);
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function toggleArrayField(field: "systems" | "homeSystems", value: string) {
    setData((current) => {
      const selected = current[field].includes(value);
      if (field === "systems") {
        return {
          ...current,
          systems: selected ? [] : [value],
          wiringPreference:
            selected || value !== "أتمتة المنزل"
              ? ""
              : current.wiringPreference,
          homeSystems: [],
        };
      }

      const nextValues = selected
        ? current[field].filter((item) => item !== value)
        : [...current[field], value];

      return {
        ...current,
        [field]: nextValues,
        ...(field === "systems" && selected && value === "أتمتة المنزل"
          ? { wiringPreference: "", homeSystems: [] }
          : {}),
      };
    });
    setShowRequiredMessage(false);
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validateCurrentStep() {
    const nextErrors: Record<string, string> = {};

    if (step === 0) {
      if (!data.fullName.trim()) nextErrors.fullName = "الاسم الكامل مطلوب.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
        nextErrors.email = "أدخل بريدًا إلكترونيًا صحيحًا.";
      if (!data.mobile.trim()) nextErrors.mobile = "رقم الجوال مطلوب.";
    }

    if (step === 1) {
      if (!data.spaceType) nextErrors.spaceType = "اختر نوع المساحة.";
      if (!data.systems.length)
        nextErrors.systems = "اختر نظامًا واحدًا على الأقل.";
      if (data.systems.includes("أتمتة المنزل") && !data.wiringPreference) {
        nextErrors.wiringPreference = "اختر تفضيل التمديد.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    scrollToFormTop();
    if (!validateCurrentStep()) {
      setShowRequiredMessage(true);
      return;
    }
    setShowRequiredMessage(false);
    setDirection(1);
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    scrollToFormTop();
    if (step === 0) {
      return;
    }
    setDirection(-1);
    setStep((current) => Math.max(current - 1, 0));
  }

  function goToCompletedStep(targetStep: number) {
    if (targetStep >= step) {
      return;
    }
    scrollToFormTop();
    setShowRequiredMessage(false);
    setDirection(-1);
    setStep(targetStep);
  }

  function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    const invalidType = incoming.some((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      return !ACCEPTED_FILE_EXTENSIONS.has(extension);
    });

    if (invalidType) {
      setFileError("يُقبل فقط ملفات PDF وDWG وDWF وJPG وPNG وZIP.");
      return;
    }

    if (incoming.some((file) => file.size > MAX_FILE_SIZE)) {
      setFileError("يجب ألا يتجاوز حجم كل ملف 25 ميجابايت.");
      return;
    }

    setFiles((current) => {
      const merged = [...current, ...incoming].slice(0, MAX_FILES);
      if (current.length + incoming.length > MAX_FILES) {
        setFileError("يمكنك رفع حتى 5 ملفات.");
      } else {
        setFileError("");
      }
      return merged;
    });
  }

  function removeFile(index: number) {
    setFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index),
    );
    setFileError("");
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }

  function getPayload() {
    return {
      ...data,
      mobile: `${data.countryCode} ${data.mobile}`,
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    };
  }

  async function submitToBackend(submissionChannel: "email" | "whatsapp") {
    const payload = getPayload();
    const submissionPayload = {
      ...Object.fromEntries(
        Object.entries(payload).filter(([key]) => key !== "files"),
      ),
      submissionChannel,
    };

    const submitResponse = await fetch(`${API_BASE}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionPayload),
    });

    if (!submitResponse.ok) {
      throw new Error("Submission failed");
    }

    const submitResult = await submitResponse.json();
    const submissionId = submitResult.id;

    if (!submissionId) {
      throw new Error("Missing submission id");
    }

    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("submissionId", String(submissionId));

      const uploadResponse = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }
    }

    return { uploadedFiles: files.length > 0 };
  }

  async function sendViaEmail() {
    setSending(true);

    try {
      await submitToBackend("email");
      setComplete(true);
    } catch {
      setFileError(
        "حدث خطأ ما. يرجى المحاولة مجددًا أو التواصل معنا مباشرة على info@true.com.kw",
      );
    } finally {
      setSending(false);
    }
  }

  function buildWhatsappMessage(filesSubmitted: boolean) {
    return [
      `مرحبًا، أتواصل معكم للاستفسار عن حلول ${data.systems.join(" و")} لـ${data.spaceType} الخاص بي.`,
      "أقدّر إتاحة الفرصة لمناقشة هذا المشروع بالتفصيل في أقرب وقت يناسبكم.",
      "",
      `الاسم: ${data.fullName}`,
      `الجوال: ${data.mobile} ${data.countryCode}`,
      `البريد الإلكتروني: ${data.email}`,
      data.wiringPreference ? `تفضيل التمديد: ${data.wiringPreference}` : "",
      data.homeSystems.length > 0
        ? `الأنظمة المطلوبة: ${data.homeSystems.join("، ")}`
        : "",
      data.notes ? `ملاحظات إضافية: ${data.notes}` : "",
      filesSubmitted
        ? "يرجى العلم أنني أرسلت مخططات المشروع عبر نموذج الموقع."
        : "",
      files.length > 0 && !filesSubmitted
        ? "سأقوم بإرفاق مخططات المشروع يدويًا في محادثة واتساب هذه."
        : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function sendViaWhatsapp() {
    setSending(true);
    setFileError("");

    try {
      const result = await submitToBackend("whatsapp");
      const message = buildWhatsappMessage(result.uploadedFiles);
      window.open(
        `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noreferrer",
      );
      setComplete(true);
    } catch (error) {
      console.error("WhatsApp backend submission failed:", error);
      const message = buildWhatsappMessage(false);
      window.open(
        `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noreferrer",
      );
      setFileError(
        "تم فتح واتساب، لكن لم يتم حفظ بيانات الموقع أو الملفات. يرجى إرفاق الملفات يدويًا في واتساب.",
      );
    } finally {
      setSending(false);
    }
  }

  function startOver() {
    setStep(0);
    setDirection(1);
    setData(initialData);
    setFiles([]);
    setErrors({});
    setShowRequiredMessage(false);
    setFileError("");
    setComplete(false);
    setSending(false);
  }

  return (
    <div
      ref={formRef}
      className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-10"
    >
      {complete ? (
        <ConfirmationScreen onStartOver={startOver} />
      ) : (
        <>
          <StepBar activeStep={step} onStepClick={goToCompletedStep} />
          <div className="mt-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? -36 : 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? 36 : -36 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {step === 0 ? (
                  <StepOne
                    data={data}
                    errors={errors}
                    selectedCountry={selectedCountry}
                    onChange={updateField}
                  />
                ) : null}
                {step === 1 ? (
                  <StepTwo
                    data={data}
                    errors={errors}
                    onChange={updateField}
                    onToggle={toggleArrayField}
                  />
                ) : null}
                {step === 2 ? (
                  <StepThree
                    files={files}
                    fileError={fileError}
                    onAddFiles={addFiles}
                    onRemoveFile={removeFile}
                    onDrop={onDrop}
                    onSendEmail={sendViaEmail}
                    onSendWhatsapp={sendViaWhatsapp}
                    sending={sending}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {step < 2 ? (
            <div className="mt-8">
              {showRequiredMessage ? (
                <p className="mb-3 text-sm font-medium text-destructive">
                  يرجى إكمال الحقول المطلوبة قبل المتابعة.
                </p>
              ) : null}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card disabled:pointer-events-none disabled:opacity-40"
                >
                  رجوع
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-transform",
                    showRequiredMessage
                      ? "bg-secondary text-muted-foreground"
                      : "bg-gradient-primary text-primary-foreground shadow-glow hover:-translate-y-0.5",
                  )}
                >
                  التالي
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
              >
                رجوع
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StepBar({
  activeStep,
  onStepClick,
}: {
  activeStep: number;
  onStepClick: (step: number) => void;
}) {
  const progressWidth = `${(activeStep / (steps.length - 1)) * 100}%`;

  return (
    <div className="relative">
      <div className="absolute right-0 left-0 top-4 h-px bg-border" />
      <div
        className="absolute right-0 top-4 h-px bg-primary transition-all duration-300 ease-out"
        style={{ width: progressWidth }}
      />
      <div className="relative z-10 grid grid-cols-3 gap-3">
        {steps.map((label, index) => {
          const completed = index < activeStep;
          const active = index === activeStep;
          const clickable = completed;

          return (
            <button
              key={label}
              type="button"
              onClick={() => clickable && onStepClick(index)}
              disabled={!clickable}
              className={cn(
                "flex flex-col items-center gap-2 text-center transition-colors",
                clickable ? "cursor-pointer" : "cursor-default",
              )}
            >
              <div
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors",
                  completed || active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {completed ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <div
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider transition-colors",
                  completed || active ? "text-white" : "text-muted-foreground",
                )}
              >
                {label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepOne({
  data,
  errors,
  selectedCountry,
  onChange,
}: {
  data: WizardData;
  errors: Record<string, string>;
  selectedCountry: { code: string; name: string; dial: string };
  onChange: <K extends keyof WizardData>(
    field: K,
    value: WizardData[K],
  ) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">من أنت؟</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        بضعة تفاصيل ليتمكن مهندسونا من التواصل معك.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <TextField
          label="الاسم الكامل *"
          value={data.fullName}
          error={errors.fullName}
          onChange={(value) => onChange("fullName", value)}
        />
        <TextField
          label="البريد الإلكتروني *"
          type="email"
          value={data.email}
          error={errors.email}
          onChange={(value) => onChange("email", value)}
        />
        <div className="md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            رقم الجوال *
          </label>
          <div className="mt-2 grid gap-3 md:grid-cols-[180px_1fr]" dir="ltr">
            <CountrySelect
              selected={selectedCountry}
              onSelect={(country) => onChange("countryCode", country.dial)}
            />
            <input
              type="tel"
              value={data.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          {errors.mobile ? (
            <p className="mt-2 text-xs font-medium text-destructive">
              {errors.mobile}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StepTwo({
  data,
  errors,
  onChange,
  onToggle,
}: {
  data: WizardData;
  errors: Record<string, string>;
  onChange: <K extends keyof WizardData>(
    field: K,
    value: WizardData[K],
  ) => void;
  onToggle: (field: "systems" | "homeSystems", value: string) => void;
}) {
  const selectedSystem = data.systems[0] ?? "";
  const homeSelected = data.systems.includes("أتمتة المنزل");
  const selectedSubOptions = selectedSystem
    ? systemSubOptions[selectedSystem]
    : [];
  const hasSelectedSystem = data.systems.length > 0;

  return (
    <div>
      <h2 className="text-2xl font-semibold">أخبرنا عن مشروعك</h2>
      <div className="mt-8">
        <p className="text-sm font-semibold text-foreground">
          ما نوع المساحة التي نعمل عليها؟
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {spaceTypes.map((space) => (
            <PillButton
              key={space}
              selected={data.spaceType === space}
              onClick={() => onChange("spaceType", space)}
            >
              {space}
            </PillButton>
          ))}
        </div>
        {errors.spaceType ? (
          <p className="mt-2 text-xs font-medium text-destructive">
            {errors.spaceType}
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold text-foreground">
          ما الأنظمة التي تهمك؟
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {systems.map(({ label, icon: Icon }) => {
            const selected = data.systems.includes(label);
            const inactive = hasSelectedSystem && !selected;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onToggle("systems", label)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border bg-background p-4 text-left transition-colors",
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/60",
                  inactive ? "opacity-35" : "",
                )}
              >
                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
                    inactive ? "text-muted-foreground" : "",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold text-foreground",
                    inactive ? "text-muted-foreground" : "",
                  )}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
        {errors.systems ? (
          <p className="mt-2 text-xs font-medium text-destructive">
            {errors.systems}
          </p>
        ) : null}
      </div>

      <AnimatePresence>
        {selectedSystem ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-2xl border border-border bg-background p-5">
              {homeSelected ? (
                <>
                  <p className="text-sm font-semibold text-foreground">
                    تفضيل التمديد
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {wiringOptions.map((option) => (
                      <PillButton
                        key={option}
                        selected={data.wiringPreference === option}
                        onClick={() => onChange("wiringPreference", option)}
                      >
                        {option}
                      </PillButton>
                    ))}
                  </div>
                  {errors.wiringPreference ? (
                    <p className="mt-2 text-xs font-medium text-destructive">
                      {errors.wiringPreference}
                    </p>
                  ) : null}
                </>
              ) : null}

              <p
                className={cn(
                  "text-sm font-semibold text-foreground",
                  homeSelected ? "mt-6" : "",
                )}
              >
                أي الأنظمة؟
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {selectedSubOptions.map((system) => (
                  <label
                    key={system}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={data.homeSystems.includes(system)}
                      onChange={() => onToggle("homeSystems", system)}
                      className="h-4 w-4 accent-primary"
                    />
                    {system}
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          أي شيء آخر تودّ إخبارنا به؟
        </label>
        <textarea
          value={data.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          placeholder="حجم المشروع، الجدول الزمني، المتطلبات الخاصة..."
        />
      </div>
    </div>
  );
}

function StepThree({
  files,
  fileError,
  onAddFiles,
  onRemoveFile,
  onDrop,
  onSendEmail,
  onSendWhatsapp,
  sending,
}: {
  files: File[];
  fileError: string;
  onAddFiles: (files: FileList | File[]) => void;
  onRemoveFile: (index: number) => void;
  onDrop: (e: DragEvent<HTMLLabelElement>) => void;
  onSendEmail: () => void;
  onSendWhatsapp: () => void;
  sending: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2 className="text-2xl font-semibold">لديك مخططات؟ ضعها هنا.</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        سنراجعها قبل الرد عليك. اختياري تمامًا.
      </p>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onDrop(e);
        }}
        className="mt-8 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 py-10 text-center transition-colors hover:border-primary/60"
      >
        <UploadCloud className="h-10 w-10 text-primary" />
        <span className="mt-4 text-sm font-semibold text-foreground">
          اسحب الملفات هنا أو انقر للرفع
        </span>
        <span className="mt-1 text-xs text-muted-foreground">
          PDF وDWG وDWF وJPG وPNG وZIP. حتى 25 ميجابايت لكل ملف، بحد أقصى 5
          ملفات.
        </span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_FILE_TYPES}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) onAddFiles(e.target.files);
          e.target.value = "";
        }}
        className="hidden"
      />

      {fileError ? (
        <p className="mt-3 text-xs font-medium text-destructive">{fileError}</p>
      ) : null}

      {files.length ? (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3"
            >
              <span className="truncate text-sm text-foreground">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="rounded-full p-1 text-muted-foreground hover:text-foreground"
                aria-label={`إزالة ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={onSendEmail}
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4 rotate-180" />
          )}
          إرسال عبر البريد الإلكتروني
        </button>
        <button
          type="button"
          onClick={onSendWhatsapp}
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MessageCircle className="h-4 w-4" />
          )}
          إرسال عبر واتساب
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        لا يمكن إرسال ملفاتك عبر واتساب - يرجى إرفاقها يدويًا في المحادثة.
      </p>
    </div>
  );
}

function ConfirmationScreen({ onStartOver }: { onStartOver: () => void }) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
        <Check className="h-7 w-7" />
      </div>
      <h2 className="mt-6 text-3xl font-semibold tracking-tight">
        استلمنا طلبك — سنتواصل معك قريبًا.
      </h2>
      <button
        type="button"
        onClick={onStartOver}
        className="mt-8 inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
      >
        البدء من جديد
      </button>
    </div>
  );
}

function TextField({
  label,
  type = "text",
  value,
  error,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
      {error ? (
        <p className="mt-2 text-xs font-medium text-destructive">{error}</p>
      ) : null}
    </div>
  );
}

function CountrySelect({
  selected,
  onSelect,
}: {
  selected: { code: string; name: string; dial: string };
  onSelect: (country: { code: string; name: string; dial: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return countries;
    return countries.filter((country) =>
      `${country.code} ${country.name} ${country.dial}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left text-sm outline-none transition-colors hover:border-primary/60"
      >
        <span>
          {selected.code} {selected.dial}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>
      {open ? (
        <div className="absolute z-20 mt-2 w-72 rounded-xl border border-border bg-card p-2 shadow-card">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن دولة..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <div className="mt-2 max-h-56 overflow-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onSelect(country);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-secondary"
              >
                <span>
                  {country.code} - {country.name}
                </span>
                <span className="text-muted-foreground">{country.dial}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PillButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
        selected
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-background text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
