import { createFileRoute } from "@tanstack/react-router";
import { type ChangeEvent, type DragEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
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
const ACCEPTED_FILE_EXTENSIONS = new Set(["pdf", "dwg", "dwf", "jpg", "jpeg", "png", "zip"]);
const ACCEPTED_FILE_TYPES = ".pdf,.dwg,.dwf,.jpg,.jpeg,.png,.zip";
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const MAX_FILES = 5;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact TRUE Automation - Kuwait" },
      { name: "description", content: "Talk to TRUE Automation's engineers in Kuwait about smart home, BAS, BMS and low-voltage projects. Call +965 5222 0900 or email info@true.com.kw." },
      { property: "og:title", content: "Contact TRUE Automation" },
      { property: "og:description", content: "Get a free consultation for your smart home or building automation project in Kuwait." },
      { property: "og:url", content: "/contact" },
    ],
    links: [
      { rel: "canonical", href: "/contact" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://true.com.kw/contact",
      },
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
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "BH", name: "Bahrain", dial: "+973" },
  { code: "OM", name: "Oman", dial: "+968" },
];

const steps = ["Who are you?", "Project", "Drawings"];
const spaceTypes = ["Villa / Residence", "Commercial Building", "Hospitality", "Retail", "Other"];
const systems = [
  { label: "Home Automation", icon: Home },
  { label: "Building Automation (BAS)", icon: Building2 },
  { label: "Building Management (BMS)", icon: Gauge },
  { label: "Guest Room Management System (GRMS)", icon: BedDouble },
  { label: "Low Voltage Systems", icon: Cable },
];
const wiringOptions = ["Wired", "Wireless", "Not Sure Yet"];
const homeSystems = [
  "Lighting Control",
  "Curtains & Shutters",
  "HVAC Control",
  "Sound System",
  "Intercom System",
  "Irrigation Control",
  "Facility Monitoring",
];
const systemSubOptions: Record<string, string[]> = {
  "Home Automation": homeSystems,
  "Building Automation (BAS)": [
    "HVAC Control & Scheduling",
    "Lighting Automation",
    "Energy Monitoring",
    "Access Control Integration",
    "Fire Alarm Integration",
    "Elevator & Escalator Monitoring",
  ],
  "Building Management (BMS)": [
    "Centralized Dashboard & Reporting",
    "Multi-Floor / Multi-Zone Control",
    "Predictive Maintenance Alerts",
    "Energy Analytics",
    "BACnet / KNX / Modbus Integration",
    "Remote Access & Diagnostics",
  ],
  "Guest Room Management System (GRMS)": [
    "Bedside panel & touch control",
    "Lighting scenes & dimming",
    "Motorized curtains & shutters",
    "HVAC & temperature control",
    "DND / Make Up Room signage",
    "Mobile app & PMS integration",
  ],
  "Low Voltage Systems": [
    "Structured Cabling & Network",
    "IP Camera & CCTV",
    "Intercom & Video Door Entry",
    "Public Address & Audio System",
    "Satellite & TV Distribution",
    "Access Control & Biometrics",
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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get in Touch</p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
              Let's build something <span className="text-gradient">intelligent.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Tell us about your project - our engineers reply within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-10 px-6 md:px-10 lg:px-12 lg:grid-cols-5">
          <Reveal className="contents lg:col-span-2 lg:block">
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Call", value: "+965 5222 0900", href: "tel:+96552220900" },
                { icon: Phone, label: "Mobile", value: "+965 5054 4882", href: "tel:+96550544882" },
                { icon: Mail, label: "Email", value: "info@true.com.kw", href: "mailto:info@true.com.kw" },
                { icon: MapPin, label: "Office", value: "Shoaa' Center, Ibn Khaldoun Street, 5th Fl, Hawally, Kuwait" },
                { icon: Clock, label: "Hours", value: "Sun - Thu - 9:00 - 17:00" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm font-medium text-foreground">
                      {c.href ? <a href={c.href} className="hover:text-primary">{c.value}</a> : <span>{c.value}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-last mt-6 overflow-hidden rounded-2xl border border-border shadow-card md:order-none">
              <iframe
                title="TRUE Automation office location"
                src="https://www.google.com/maps?q=Ibn+Khaldoun+St,+Shoaa+Center,+Hawally,+Kuwait&output=embed"
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

  const selectedCountry = countries.find((country) => country.dial === data.countryCode) ?? countries[0];

  function scrollToFormTop() {
    const formTop = (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 100;
    window.scrollTo({ top: formTop, behavior: "smooth" });
  }

  function updateField<K extends keyof WizardData>(field: K, value: WizardData[K]) {
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
          wiringPreference: selected || value !== "Home Automation" ? "" : current.wiringPreference,
          homeSystems: [],
        };
      }

      const nextValues = selected
        ? current[field].filter((item) => item !== value)
        : [...current[field], value];

      return {
        ...current,
        [field]: nextValues,
        ...(field === "systems" && selected && value === "Home Automation"
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
      if (!data.fullName.trim()) nextErrors.fullName = "Full name is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) nextErrors.email = "Enter a valid email address.";
      if (!data.mobile.trim()) nextErrors.mobile = "Mobile number is required.";
    }

    if (step === 1) {
      if (!data.spaceType) nextErrors.spaceType = "Choose the type of space.";
      if (!data.systems.length) nextErrors.systems = "Choose at least one system.";
      if (data.systems.includes("Home Automation") && !data.wiringPreference) {
        nextErrors.wiringPreference = "Choose a wiring preference.";
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
      setFileError("Only PDF, DWG, DWF, JPG, PNG, and ZIP files are accepted.");
      return;
    }

    if (incoming.some((file) => file.size > MAX_FILE_SIZE)) {
      setFileError("Each file must be 25MB or smaller.");
      return;
    }

    setFiles((current) => {
      const merged = [...current, ...incoming].slice(0, MAX_FILES);
      if (current.length + incoming.length > MAX_FILES) {
        setFileError("You can upload up to 5 files.");
      } else {
        setFileError("");
      }
      return merged;
    });
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
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
      files: files.map((file) => ({ name: file.name, size: file.size, type: file.type })),
    };
  }

  async function submitToBackend(submissionChannel: "email" | "whatsapp") {
    const payload = getPayload();
    const submissionPayload = {
      ...Object.fromEntries(Object.entries(payload).filter(([key]) => key !== "files")),
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
      setFileError("Something went wrong. Please try again or reach us directly at info@true.com.kw");
    } finally {
      setSending(false);
    }
  }

  function buildWhatsappMessage(filesSubmitted: boolean) {
    return [
      `Good day, I am reaching out to inquire about ${data.systems.join(" & ")} solutions for my ${data.spaceType}.`,
      "I would appreciate the opportunity to discuss this project further at your earliest convenience.",
      "",
      `Name: ${data.fullName}`,
      `Mobile: ${data.mobile} ${data.countryCode}`,
      `Email: ${data.email}`,
      data.wiringPreference ? `Preferred wiring: ${data.wiringPreference}` : "",
      data.homeSystems.length > 0 ? `Systems of interest: ${data.homeSystems.join(", ")}` : "",
      data.notes ? `Additional notes: ${data.notes}` : "",
      filesSubmitted ? "Please note that I have submitted project drawings via the website form." : "",
      files.length > 0 && !filesSubmitted ? "I will attach the project drawings manually in this WhatsApp chat." : "",
    ].filter(Boolean).join("\n");
  }

  async function sendViaWhatsapp() {
    setSending(true);
    setFileError("");

    try {
      const result = await submitToBackend("whatsapp");
      const message = buildWhatsappMessage(result.uploadedFiles);
      window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
      setComplete(true);
    } catch (error) {
      console.error("WhatsApp backend submission failed:", error);
      const message = buildWhatsappMessage(false);
      window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
      setFileError("WhatsApp opened, but your website submission or files were not saved. Please attach files manually in WhatsApp.");
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
    <div ref={formRef} className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-10">
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
                initial={{ opacity: 0, x: direction > 0 ? 36 : -36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -36 : 36 }}
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
                  Please complete the required fields before continuing.
                </p>
              ) : null}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card disabled:pointer-events-none disabled:opacity-40"
                >
                  Back
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
                  Next
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
                Back
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StepBar({ activeStep, onStepClick }: { activeStep: number; onStepClick: (step: number) => void }) {
  const progressWidth = `${(activeStep / (steps.length - 1)) * 100}%`;

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-4 h-px bg-border" />
      <div className="absolute left-0 top-4 h-px bg-primary transition-all duration-300 ease-out" style={{ width: progressWidth }} />
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
            <div className={cn("text-xs font-semibold uppercase tracking-wider transition-colors", completed || active ? "text-white" : "text-muted-foreground")}>
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
  onChange: <K extends keyof WizardData>(field: K, value: WizardData[K]) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Who are you?</h2>
      <p className="mt-1 text-sm text-muted-foreground">A few details so our engineers can reach you.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <TextField label="Full Name *" value={data.fullName} error={errors.fullName} onChange={(value) => onChange("fullName", value)} />
        <TextField label="Email Address *" type="email" value={data.email} error={errors.email} onChange={(value) => onChange("email", value)} />
        <div className="md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mobile Number *</label>
          <div className="mt-2 grid gap-3 md:grid-cols-[180px_1fr]">
            <CountrySelect selected={selectedCountry} onSelect={(country) => onChange("countryCode", country.dial)} />
            <input
              type="tel"
              value={data.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          {errors.mobile ? <p className="mt-2 text-xs font-medium text-destructive">{errors.mobile}</p> : null}
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
  onChange: <K extends keyof WizardData>(field: K, value: WizardData[K]) => void;
  onToggle: (field: "systems" | "homeSystems", value: string) => void;
}) {
  const selectedSystem = data.systems[0] ?? "";
  const homeSelected = data.systems.includes("Home Automation");
  const selectedSubOptions = selectedSystem ? systemSubOptions[selectedSystem] : [];
  const hasSelectedSystem = data.systems.length > 0;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Tell us about your project</h2>
      <div className="mt-8">
        <p className="text-sm font-semibold text-foreground">What type of space are we working with?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {spaceTypes.map((space) => (
            <PillButton key={space} selected={data.spaceType === space} onClick={() => onChange("spaceType", space)}>
              {space}
            </PillButton>
          ))}
        </div>
        {errors.spaceType ? <p className="mt-2 text-xs font-medium text-destructive">{errors.spaceType}</p> : null}
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold text-foreground">What systems are you interested in?</p>
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
                  selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/60",
                  inactive ? "opacity-35" : "",
                )}
              >
                <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary", inactive ? "text-muted-foreground" : "")}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={cn("text-sm font-semibold text-foreground", inactive ? "text-muted-foreground" : "")}>{label}</span>
              </button>
            );
          })}
        </div>
        {errors.systems ? <p className="mt-2 text-xs font-medium text-destructive">{errors.systems}</p> : null}
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
                  <p className="text-sm font-semibold text-foreground">Wiring preference</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {wiringOptions.map((option) => (
                      <PillButton key={option} selected={data.wiringPreference === option} onClick={() => onChange("wiringPreference", option)}>
                        {option}
                      </PillButton>
                    ))}
                  </div>
                  {errors.wiringPreference ? <p className="mt-2 text-xs font-medium text-destructive">{errors.wiringPreference}</p> : null}
                </>
              ) : null}

              <p className={cn("text-sm font-semibold text-foreground", homeSelected ? "mt-6" : "")}>Which systems?</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {selectedSubOptions.map((system) => (
                  <label key={system} className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground">
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
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Anything else we should know?</label>
        <textarea
          value={data.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          placeholder="Project size, timeline, special requirements..."
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
      <h2 className="text-2xl font-semibold">Got drawings? Drop them here.</h2>
      <p className="mt-1 text-sm text-muted-foreground">We'll review them before getting back to you. Completely optional.</p>

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
        <span className="mt-4 text-sm font-semibold text-foreground">Drag files here or click to upload</span>
        <span className="mt-1 text-xs text-muted-foreground">PDF, DWG, DWF, JPG, PNG, ZIP. Max 25MB each, up to 5 files.</span>
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

      {fileError ? <p className="mt-3 text-xs font-medium text-destructive">{fileError}</p> : null}

      {files.length ? (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <span className="truncate text-sm text-foreground">{file.name}</span>
              <button type="button" onClick={() => onRemoveFile(index)} className="rounded-full p-1 text-muted-foreground hover:text-foreground" aria-label={`Remove ${file.name}`}>
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
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send via Email
        </button>
        <button
          type="button"
          onClick={onSendWhatsapp}
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
          Send via WhatsApp
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Your files cannot be sent via WhatsApp - please attach them manually in the chat.</p>
    </div>
  );
}

function ConfirmationScreen({ onStartOver }: { onStartOver: () => void }) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
        <Check className="h-7 w-7" />
      </div>
      <h2 className="mt-6 text-3xl font-semibold tracking-tight">We've got it — we'll be in touch shortly.</h2>
      <button
        type="button"
        onClick={onStartOver}
        className="mt-8 inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
      >
        Start Over
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
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
      {error ? <p className="mt-2 text-xs font-medium text-destructive">{error}</p> : null}
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
      `${country.code} ${country.name} ${country.dial}`.toLowerCase().includes(normalizedQuery),
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
        <span>{selected.code} {selected.dial}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>
      {open ? (
        <div className="absolute z-20 mt-2 w-72 rounded-xl border border-border bg-card p-2 shadow-card">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country..."
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
                <span>{country.code} - {country.name}</span>
                <span className="text-muted-foreground">{country.dial}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PillButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
        selected ? "border-primary bg-primary/15 text-primary" : "border-border bg-background text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
