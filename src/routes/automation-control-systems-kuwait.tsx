import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/automation-control-systems-kuwait")({
  head: () => ({
    meta: [
      {
        title:
          "Automation & Low-Voltage Control Systems Kuwait | CCTV, Access, Networks | TRUE",
      },
      {
        name: "description",
        content:
          "Automation control systems in Kuwait: CCTV, access control, intercom, structured networking, irrigation and pro audio — engineered and installed by TRUE.",
      },
      {
        property: "og:title",
        content:
          "Automation & Low-Voltage Control Systems Kuwait | CCTV, Access, Networks | TRUE",
      },
      {
        property: "og:description",
        content:
          "Automation control systems in Kuwait: CCTV, access control, intercom, structured networking, irrigation and pro audio — engineered and installed by TRUE.",
      },
      { property: "og:url", content: "/automation-control-systems-kuwait" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/automation-control-systems-kuwait" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://true.com.kw/automation-control-systems-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "ar",
        href: "https://true.com.kw/ar/automation-control-systems-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://true.com.kw/automation-control-systems-kuwait",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      slug="automation-control-systems-kuwait"
      locale="en"
      eyebrow="Infrastructure & Control"
      h1="Automation & Low-Voltage Control Systems"
      highlight="in Kuwait"
      heroLead="The backbone that makes everything else work — certified structured cabling, IP networks, CCTV, access control, intercom, telephony, irrigation and pro audio, unified under one automation control layer."
      overviewHeading="Every low-voltage control system, engineered together"
      overviewParagraphs={[
        "Automation control systems are the infrastructure layer beneath every smart home, BAS or BMS project — structured cabling, IP networking, CCTV, access control, intercom and telephony all need to be designed together, not bolted on separately by different contractors. When they aren't, buildings end up with fragile point solutions that don't talk to each other.",
        "TRUE engineers this layer as a single, coordinated control system for residential and commercial projects across Kuwait. Smart IP cameras integrate with access control and lighting for security automation. Structured networks are built to carry the load of every other automated system reliably, not just internet traffic. Irrigation and pro sound integrate into the same scene-based control as the rest of the property.",
        "The result is a control foundation that scales — add rooms, add cameras, add a new automation zone, and the underlying infrastructure already supports it.",
      ]}
      features={[
        {
          title: "Smart IP cameras & CCTV",
          text: "Surveillance integrated with access control and automation triggers, not a standalone silo.",
        },
        {
          title: "IoT smart intercom",
          text: "Video intercom tied into mobile apps and access control for remote visitor management.",
        },
        {
          title: "IP telephony",
          text: "Unified voice infrastructure over the same structured network as everything else.",
        },
        {
          title: "Structured network solutions",
          text: "Certified cabling and networking engineered to reliably carry every automated system.",
        },
        {
          title: "Smart irrigation control",
          text: "Scheduled, weather-aware irrigation integrated into the same control platform.",
        },
        {
          title: "Pro sound systems",
          text: "Multi-zone audio engineered for commercial and residential spaces alike.",
        },
      ]}
      faqs={[
        {
          q: "Do these systems work with a smart home or BAS I'm already installing?",
          a: "Yes — this infrastructure layer is designed to be the foundation those systems run on, whether installed at the same time or added later.",
        },
        {
          q: "Can CCTV and access control be managed from one app?",
          a: "Yes, we integrate camera and access control systems into a unified interface rather than leaving them as separate standalone apps.",
        },
        {
          q: "Is structured cabling really necessary if we're mostly wireless?",
          a: "Wireless devices still rely on a wired backbone for reliability and bandwidth. Structured cabling is what keeps a growing number of automated devices from overloading a home or office network.",
        },
        {
          q: "Do you handle commercial and residential projects?",
          a: "Yes, we deliver automation control infrastructure for villas, apartments, showrooms, restaurants and full commercial buildings across Kuwait.",
        },
        {
          q: "Can irrigation and audio really integrate with a smart home system?",
          a: "Yes — irrigation schedules and multi-zone audio are controlled through the same platform and scenes as lighting, climate and security, rather than needing separate apps.",
        },
      ]}
      serviceType="Automation and Low-Voltage Control Systems"
      schemaDescription="Automation and low-voltage control system design and installation in Kuwait, covering CCTV, access control, intercom, IP telephony, structured networking, irrigation and pro audio."
    />
  ),
});
