import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/building-automation-system-kuwait")({
  head: () => ({
    meta: [
      {
        title:
          "Building Automation System (BAS) Kuwait | Smart Building Automation | TRUE",
      },
      {
        name: "description",
        content:
          "Building Automation Systems (BAS) in Kuwait: smart building automation for HVAC sequencing, lighting control and energy management engineered by TRUE to cut operating costs.",
      },
      {
        property: "og:title",
        content:
          "Building Automation System (BAS) Kuwait | Smart Building Automation | TRUE",
      },
      {
        property: "og:description",
        content:
          "Building Automation Systems (BAS) in Kuwait: smart building automation for HVAC sequencing, lighting control and energy management engineered by TRUE to cut operating costs.",
      },
      { property: "og:url", content: "/building-automation-system-kuwait" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/building-automation-system-kuwait" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://true.com.kw/building-automation-system-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "ar",
        href: "https://true.com.kw/ar/building-automation-system-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://true.com.kw/building-automation-system-kuwait",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      slug="building-automation-system-kuwait"
      locale="en"
      eyebrow="Commercial Automation"
      h1="Building Automation System (BAS)"
      highlight="in Kuwait"
      heroLead="We engineer BAS that quietly reduce running costs while keeping occupants comfortable — HVAC, lighting, occupancy and energy, all integrated, scheduled and monitored across Kuwait's commercial and hospitality buildings. This is what smart buildings actually look like in practice."
      overviewHeading="Building automation engineered for Kuwait's climate and costs"
      overviewParagraphs={[
        "A Building Automation System (BAS) is the layer that ties HVAC, lighting, ventilation and energy metering into one coordinated, scheduled system — instead of dozens of subsystems each fighting for control. In Kuwait's climate, where cooling is the single largest operating cost for most commercial buildings, a well-engineered BAS is one of the highest-return investments a facility can make.",
        "TRUE designs BAS installations using open protocols — BACnet, KNX and Modbus — so your building isn't locked into a single vendor's hardware for the next twenty years. We sequence HVAC to match real occupancy and outdoor conditions, tie lighting to daylight and occupancy sensors, and sub-meter energy so facility managers can see exactly where consumption is happening.",
        "This is the practical definition of a smart building: every system aware of the others, adjusting automatically instead of relying on manual overrides. From showrooms and fine-dining outlets to full commercial towers, we've delivered smart building automation projects across Kuwait that pay for themselves through measurable energy savings within a few years of commissioning.",
      ]}
      features={[
        {
          title: "HVAC control & AC control scheduling",
          text: "Smart HVAC and smart AC start/stop and setpoint scheduling matched to real occupancy patterns.",
        },
        {
          title: "Demand-controlled ventilation",
          text: "CO2 and occupancy-based ventilation that avoids over-conditioning empty spaces.",
        },
        {
          title: "Occupancy- & daylight-based lighting",
          text: "Lighting that dims or switches off automatically when spaces are unoccupied or naturally lit.",
        },
        {
          title: "Energy sub-metering",
          text: "Granular consumption data by zone or tenant, feeding directly into reporting dashboards.",
        },
        {
          title: "Open protocols: BACnet, KNX, Modbus",
          text: "Vendor-neutral integration that protects your investment long-term.",
        },
        {
          title: "LEED & sustainability support",
          text: "BAS documentation and controls strategy aligned with LEED certification requirements.",
        },
      ]}
      faqs={[
        {
          q: "What's the difference between BAS and BMS?",
          a: "BAS (Building Automation System) is the control layer — the logic that runs HVAC, lighting and ventilation. BMS (Building Management System) sits above it as the monitoring and management dashboard. Most projects need both, and TRUE designs them together.",
        },
        {
          q: "Is a BAS the same thing as a smart building?",
          a: "BAS is the core technology that makes a building smart. 'Smart building' describes the outcome — a space where systems sense conditions and adjust automatically; BAS (plus BMS and integration) is how we deliver that outcome.",
        },
        {
          q: "How much can a BAS save on energy costs in Kuwait?",
          a: "Savings vary by building type and prior control state, but HVAC scheduling and demand-controlled ventilation typically deliver double-digit percentage reductions in cooling energy — the largest line item in most Kuwaiti commercial energy bills.",
        },
        {
          q: "Can BAS be added to an existing building?",
          a: "Yes. We regularly retrofit BAS into operating buildings, sequencing the rollout to minimize disruption to tenants or operations.",
        },
        {
          q: "What protocols does TRUE's BAS work use?",
          a: "We build on open, vendor-neutral protocols — primarily BACnet, KNX and Modbus — so the system stays serviceable and expandable regardless of future hardware changes.",
        },
      ]}
      serviceType="Building Automation System"
      schemaDescription="Building Automation System (BAS) and smart building automation design and installation in Kuwait covering HVAC sequencing, demand-controlled ventilation, lighting automation and energy sub-metering."
    />
  ),
});
