import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/system-integration-kuwait")({
  head: () => ({
    meta: [
      {
        title:
          "Smart Systems Integration Kuwait | Automation Integration | TRUE",
      },
      {
        name: "description",
        content:
          "Smart systems integration in Kuwait: unifying home automation, BAS, BMS, security and AV into one intelligent, vendor-neutral platform by TRUE Automation.",
      },
      {
        property: "og:title",
        content:
          "Smart Systems Integration Kuwait | Automation Integration | TRUE",
      },
      {
        property: "og:description",
        content:
          "Smart systems integration in Kuwait: unifying home automation, BAS, BMS, security and AV into one intelligent, vendor-neutral platform by TRUE Automation.",
      },
      { property: "og:url", content: "/system-integration-kuwait" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/system-integration-kuwait" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://true.com.kw/system-integration-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "ar",
        href: "https://true.com.kw/ar/system-integration-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://true.com.kw/system-integration-kuwait",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      slug="system-integration-kuwait"
      locale="en"
      eyebrow="Integration"
      h1="Smart Systems Integration"
      highlight="in Kuwait"
      heroLead="Every subsystem, every protocol, every vendor — unified into one intelligent platform. TRUE specializes in tying disconnected automation systems into a single, coherent experience."
      overviewHeading="Integration is where automation projects succeed or fail"
      overviewParagraphs={[
        "Most buildings and homes don't fail at automation because any single system is weak — they fail because the lighting system, the HVAC controls, the security system and the AV system were each installed by different vendors, on different protocols, that were never designed to talk to each other. Smart systems integration is the discipline of solving exactly that problem.",
        "TRUE specializes in vendor-neutral integration across KNX, BACnet, Modbus, Zigbee and proprietary manufacturer APIs, bringing previously siloed systems into one control layer — a single app, a single set of scenes, a single point of support. This applies equally to new-build projects designed for integration from day one, and to existing properties in Kuwait with a patchwork of systems installed over the years that never quite worked together.",
        "Whether you need home automation integrated with security, or a full commercial building's BAS, BMS, access control and AV unified into one operator dashboard, integration is where the individual systems actually deliver on their promise.",
      ]}
      features={[
        {
          title: "Vendor-neutral protocol expertise",
          text: "KNX, BACnet, Modbus, Zigbee and proprietary APIs bridged into one platform.",
        },
        {
          title: "Legacy system integration",
          text: "Bringing existing, disconnected systems into a unified control layer without a full rip-and-replace.",
        },
        {
          title: "Unified control interface",
          text: "One app, one set of scenes, controlling every integrated subsystem.",
        },
        {
          title: "Cross-system automation logic",
          text: "Scenes and rules that span systems — security triggering lighting, occupancy triggering HVAC and AV together.",
        },
        {
          title: "Single point of support",
          text: "One team accountable for how integrated systems perform together, not separate vendors pointing at each other.",
        },
        {
          title: "Future-proof architecture",
          text: "Integration designed so new subsystems can be added later without re-engineering the whole platform.",
        },
      ]}
      faqs={[
        {
          q: "We already have several automation systems installed separately — can they be integrated after the fact?",
          a: "In most cases, yes. We assess what protocols and APIs each existing system supports and design an integration layer that unifies them without necessarily replacing hardware that's already working.",
        },
        {
          q: "What does 'vendor-neutral' actually mean in practice?",
          a: "It means we don't design your integration around a single manufacturer's ecosystem. Using open protocols like KNX, BACnet and Modbus keeps you able to add or swap hardware from different vendors in the future.",
        },
        {
          q: "Does integration cost more than buying one brand's complete ecosystem?",
          a: "It depends on the project, but integration typically costs less over the system's lifetime than being locked into a single vendor, since it protects you from forced upgrades and lets you choose best-in-class hardware per subsystem.",
        },
        {
          q: "Can smart home and commercial building systems both benefit from integration?",
          a: "Yes — the same integration discipline applies whether it's a villa unifying lighting, security and AV, or a commercial tower unifying BAS, BMS, access control and AV under one operator dashboard.",
        },
        {
          q: "How do you approach a project with several different existing vendors on site?",
          a: "We start with a technical audit of what protocols and interfaces each existing system exposes, then design the integration layer and control logic around what's actually achievable — with a clear scope before any work begins.",
        },
      ]}
      serviceType="Smart Systems Integration"
      schemaDescription="Smart systems integration services in Kuwait unifying home automation, BAS, BMS, security and AV systems across multiple vendors and protocols into one intelligent platform."
    />
  ),
});
