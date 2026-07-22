import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/building-management-system-kuwait")({
  head: () => ({
    meta: [
      {
        title:
          "Building Management System (BMS) Kuwait | BACnet · KNX · Modbus | TRUE",
      },
      {
        name: "description",
        content:
          "Building Management Systems (BMS) in Kuwait: centralized monitoring, analytics and alarm management across BACnet, KNX and Modbus, by TRUE Automation.",
      },
      {
        property: "og:title",
        content:
          "Building Management System (BMS) Kuwait | BACnet · KNX · Modbus | TRUE",
      },
      {
        property: "og:description",
        content:
          "Building Management Systems (BMS) in Kuwait: centralized monitoring, analytics and alarm management across BACnet, KNX and Modbus, by TRUE Automation.",
      },
      { property: "og:url", content: "/building-management-system-kuwait" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/building-management-system-kuwait" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://true.com.kw/building-management-system-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "ar",
        href: "https://true.com.kw/ar/building-management-system-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://true.com.kw/building-management-system-kuwait",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      slug="building-management-system-kuwait"
      locale="en"
      eyebrow="Facility Operations"
      h1="Building Management System (BMS)"
      highlight="in Kuwait"
      heroLead="A single, vendor-neutral platform to monitor and manage every building system — with analytics, alerts and reports that turn operations from reactive into predictive."
      overviewHeading="One pane of glass for every building system"
      overviewParagraphs={[
        "A Building Management System (BMS) is the operator-facing dashboard that sits above your building's automation — pulling HVAC, lighting, energy, access and safety systems into one interface, regardless of which vendor's hardware runs underneath. For facility managers running one site or a multi-site portfolio in Kuwait, that visibility is the difference between reacting to complaints and catching problems before they happen.",
        "TRUE builds BMS platforms that speak BACnet, KNX and Modbus fluently, so systems from different manufacturers and different project phases can be unified rather than left as isolated silos. Alarms escalate to the right person automatically, energy trends surface waste before it shows up on the utility bill, and maintenance shifts from calendar-based to condition-based.",
        "Whether you're managing a single commercial tower or a portfolio of retail and hospitality sites across Kuwait, we design the BMS around how your team actually operates — not a generic template.",
      ]}
      features={[
        {
          title: "Central monitoring dashboards",
          text: "Live status across HVAC, lighting, power and access from a single screen.",
        },
        {
          title: "Multi-site & multi-tenant views",
          text: "Portfolio-level visibility with tenant- or site-specific drill-down.",
        },
        {
          title: "Alarm management & escalation",
          text: "Automatic routing of alerts to the right team, with escalation rules for unacknowledged faults.",
        },
        {
          title: "Energy & sustainability analytics",
          text: "Trend reporting that surfaces waste and supports sustainability reporting requirements.",
        },
        {
          title: "Predictive & condition-based maintenance",
          text: "Runtime and performance data that flags equipment before it fails, not after.",
        },
        {
          title: "Secure remote access",
          text: "Authenticated remote access for facility teams and TRUE's support engineers.",
        },
      ]}
      faqs={[
        {
          q: "Do I need a BMS if I already have a BAS?",
          a: "A BAS controls; a BMS monitors and manages across systems and, often, across sites. If you're running a single building with straightforward controls, BAS alone may suffice. Multi-system or multi-site operations almost always benefit from adding a BMS layer.",
        },
        {
          q: "Can a BMS integrate equipment from different manufacturers?",
          a: "Yes — that's the core purpose. We build on open protocols (BACnet, KNX, Modbus) specifically so equipment from different vendors and different construction phases can be unified into one dashboard.",
        },
        {
          q: "Is remote monitoring secure?",
          a: "Remote access is authenticated and access-controlled, built to standard security practice for building management platforms.",
        },
        {
          q: "What kind of reports can a BMS generate?",
          a: "Energy consumption trends, alarm history, equipment runtime, and maintenance logs — configurable to what your facility team and ownership actually need to see.",
        },
        {
          q: "How long does BMS implementation take?",
          a: "It depends on the number of systems being integrated and whether it's new construction or a retrofit across an operating facility — we scope and sequence this during the initial site assessment.",
        },
      ]}
      serviceType="Building Management System"
      schemaDescription="Building Management System (BMS) design and integration in Kuwait, unifying HVAC, lighting, energy, access and safety systems across BACnet, KNX and Modbus into one monitoring platform."
    />
  ),
});
