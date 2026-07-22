export const solutions = [
  {
    slug: "smart-home-automation-kuwait",
    label: "Smart Home Automation",
    short:
      "Lighting, climate, curtains, audio and security — one system, one touch.",
    labelAr: "أتمتة المنزل الذكي",
    shortAr: "إضاءة ومناخ وستائر وصوت وأمن — نظام واحد بلمسة واحدة.",
  },
  {
    slug: "building-automation-system-kuwait",
    label: "Building Automation System (BAS)",
    short:
      "HVAC, lighting and energy control engineered to cut operating costs.",
    labelAr: "نظام أتمتة المباني (BAS)",
    shortAr: "تحكم متكامل بالتكييف والإضاءة والطاقة لخفض تكاليف التشغيل.",
  },
  {
    slug: "building-management-system-kuwait",
    label: "Building Management System (BMS)",
    short: "Centralized monitoring and analytics over BACnet, KNX and Modbus.",
    labelAr: "نظام إدارة المباني (BMS)",
    shortAr: "مراقبة وتحليلات مركزية عبر BACnet وKNX وModbus.",
  },
  {
    slug: "guest-room-management-kuwait",
    label: "Guest Room Management (GRMS)",
    short: "Lighting, curtains, HVAC and DND from a single bedside panel.",
    labelAr: "نظام إدارة الغرف الفندقية (GRMS)",
    shortAr: "إضاءة وستائر وتكييف وعدم الإزعاج من لوحة واحدة بجانب السرير.",
  },
  {
    slug: "automation-control-systems-kuwait",
    label: "Automation & Low-Voltage Control",
    short:
      "CCTV, access control, intercom, networking and smart control, unified.",
    labelAr: "أنظمة التحكم بالأتمتة والتيار المنخفض",
    shortAr: "كاميرات مراقبة وتحكم بالدخول واتصال داخلي وشبكات، موحّدة.",
  },
  {
    slug: "system-integration-kuwait",
    label: "Smart Systems Integration",
    short:
      "Every subsystem, every protocol, unified into one intelligent platform.",
    labelAr: "تكامل الأنظمة الذكية",
    shortAr: "كل الأنظمة الفرعية والبروتوكولات موحّدة في منصة ذكية واحدة.",
  },
] as const;

export type SolutionSlug = (typeof solutions)[number]["slug"];
