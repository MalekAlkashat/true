import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/system-integration-kuwait")({
  head: () => ({
    meta: [
      {
        title:
          "Smart Systems Integration Kuwait | Home & Building Integration | TRUE",
      },
      {
        name: "description",
        content:
          "Smart systems integration in Kuwait: home integration and building integration unifying automation, BAS, BMS, security and AV into one intelligent, vendor-neutral platform by TRUE Automation.",
      },
      {
        property: "og:title",
        content:
          "Smart Systems Integration Kuwait | Home & Building Integration | TRUE",
      },
      {
        property: "og:description",
        content:
          "Smart systems integration in Kuwait: home integration and building integration unifying automation, BAS, BMS, security and AV into one intelligent, vendor-neutral platform by TRUE Automation.",
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
      heroLead="Every subsystem, every protocol, every vendor — unified into one intelligent platform. TRUE specializes in home integration and building integration, tying disconnected automation systems into a single, coherent experience."
      overviewHeading="Integration is where automation projects succeed or fail"
      overviewParagraphs={[
        "Most buildings and homes don't fail at automation because any single system is weak — they fail because the lighting system, the HVAC controls, the security system and the AV system were each installed by different vendors, on different protocols, that were never designed to talk to each other. Smart systems integration is the discipline of solving exactly that problem, whether it's home integration for a single villa or building integration across a full commercial tower.",
        "TRUE specializes in vendor-neutral integration across KNX, BACnet, Modbus, Zigbee and proprietary manufacturer APIs, bringing previously siloed systems into one control layer — a single app, a single set of scenes, a single point of support. This applies equally to new-build projects designed for integration from day one, and to existing properties in Kuwait with a patchwork of systems installed over the years that never quite worked together.",
        "Home integration means your lighting, climate, security and entertainment respond as one system instead of five separate apps. Building integration means a commercial tower's BAS, BMS, access control and AV report to a single operator dashboard instead of five different vendor logins. Both are the same discipline applied at different scales — and it's where the individual systems actually deliver on their promise.",
      ]}
      features={[
        {
          title: "Vendor-neutral protocol expertise",
          text: "KNX, BACnet, Modbus, Zigbee and proprietary APIs bridged into one platform.",
        },
        {
          title: "Home integration",
          text: "Lighting, climate, security and AV unified into one app and one set of scenes for residential projects.",
        },
        {
          title: "Building integration",
          text: "BAS, BMS, access control and AV unified into a single operator dashboard for commercial properties.",
        },
        {
          title: "Legacy system integration",
          text: "Bringing existing, disconnected systems into a unified control layer without a full rip-and-replace.",
        },
        {
          title: "Cross-system automation logic",
          text: "Scenes and rules that span systems — security triggering lighting, occupancy triggering HVAC and AV together.",
        },
        {
          title: "Future-proof architecture",
          text: "Integration designed so new subsystems can be added later without re-engineering the whole platform.",
        },
      ]}
      faqs={[
        {
          q: "What's the difference between home integration and building integration?",
          a: "Home integration unifies residential systems — lighting, climate, security, AV — into one app and one set of scenes. Building integration applies the same discipline at commercial scale, unifying BAS, BMS, access control and AV into a single operator dashboard. Both use the same vendor-neutral approach, just at different scales.",
        },
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
          q: "How do you approach a project with several different existing vendors on site?",
          a: "We start with a technical audit of what protocols and interfaces each existing system exposes, then design the integration layer and control logic around what's actually achievable — with a clear scope before any work begins.",
        },
      ]}
      serviceType="Smart Systems Integration"
      schemaDescription="Smart systems integration services in Kuwait covering home integration and building integration — unifying home automation, BAS, BMS, security and AV systems across multiple vendors and protocols into one intelligent platform."
    />
  ),
});
