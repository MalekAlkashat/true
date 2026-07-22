import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/guest-room-management-kuwait")({
  head: () => ({
    meta: [
      {
        title:
          "Guest Room Management System (GRMS) Kuwait | Hospitality | TRUE",
      },
      {
        name: "description",
        content:
          "Guest Room Management Systems (GRMS) in Kuwait for hotels and serviced residences — lighting, curtains, HVAC and DND from a single bedside panel.",
      },
      {
        property: "og:title",
        content:
          "Guest Room Management System (GRMS) Kuwait | Hospitality | TRUE",
      },
      {
        property: "og:description",
        content:
          "Guest Room Management Systems (GRMS) in Kuwait for hotels and serviced residences — lighting, curtains, HVAC and DND from a single bedside panel.",
      },
      { property: "og:url", content: "/guest-room-management-kuwait" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/guest-room-management-kuwait" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://true.com.kw/guest-room-management-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "ar",
        href: "https://true.com.kw/ar/guest-room-management-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://true.com.kw/guest-room-management-kuwait",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      slug="guest-room-management-kuwait"
      locale="en"
      eyebrow="Hospitality Automation"
      h1="Guest Room Management System (GRMS)"
      highlight="in Kuwait"
      heroLead="Every guest room becomes a responsive environment — lighting, curtains, HVAC, DND and doorbell, all orchestrated from a single bedside panel or the guest's own phone."
      overviewHeading="Hospitality-grade automation, guest-simple control"
      overviewParagraphs={[
        "Guest Room Management Systems (GRMS) are how modern hotels and serviced residences in Kuwait deliver a consistently premium in-room experience while cutting energy costs across hundreds of rooms. Instead of separate switches, thermostats and curtain controls, guests get one intuitive touch panel — or their own phone — that runs the whole room.",
        "For operations teams, the same system reports room status, occupancy and energy use back to a central dashboard, integrating with your Property Management System (PMS) so housekeeping, engineering and front desk all see the same real-time picture. HVAC automatically steps down in unoccupied rooms and recovers before check-in, which is often the single largest energy saving a hotel property can make.",
        "TRUE designs and installs GRMS for hospitality projects across Kuwait, from boutique serviced residences to full-scale hotel towers, with a focus on reliability guests never have to think about and reporting operators actually use.",
      ]}
      features={[
        {
          title: "Bedside panel & touch control",
          text: "One intuitive panel controlling lighting, climate, curtains and service requests.",
        },
        {
          title: "Lighting scenes & dimming",
          text: "Pre-set arrival, sleep and reading scenes guests can adjust or trigger with one touch.",
        },
        {
          title: "Motorized curtains & shutters",
          text: "Automated window treatments synced to scenes, time of day, or manual override.",
        },
        {
          title: "HVAC & occupancy-based control",
          text: "Climate that steps down automatically when the room is unoccupied and recovers before arrival.",
        },
        {
          title: "DND / Make Up Room signage",
          text: "Digital door signage synced with housekeeping systems, replacing manual door hangers.",
        },
        {
          title: "Mobile app & PMS integration",
          text: "Guest control via their own phone, with room status feeding directly into your PMS.",
        },
      ]}
      faqs={[
        {
          q: "What size properties is GRMS suitable for?",
          a: "GRMS scales from boutique serviced residences with a handful of rooms to full hotel towers with hundreds — the architecture and central dashboard scale with the property.",
        },
        {
          q: "Does GRMS integrate with our existing PMS?",
          a: "Yes, integration with common Property Management Systems is a standard part of GRMS deployment so room status and guest data stay synchronized.",
        },
        {
          q: "How much energy does GRMS typically save?",
          a: "Occupancy-based HVAC control is usually the largest saving, since unoccupied rooms are a major source of wasted cooling in hotel properties — actual figures depend on occupancy patterns and prior control state.",
        },
        {
          q: "Can GRMS be installed during a renovation without disrupting operations?",
          a: "Yes — we sequence installation floor-by-floor or wing-by-wing to minimize disruption for properties that need to stay operational during the upgrade.",
        },
        {
          q: "Does the guest need an app to use the room controls?",
          a: "No — the in-room bedside panel handles full control without any app. Mobile app control is available as an added convenience, not a requirement.",
        },
      ]}
      serviceType="Guest Room Management System"
      schemaDescription="Guest Room Management System (GRMS) design and installation for hotels and serviced residences in Kuwait, covering lighting, curtains, HVAC, DND signage and PMS integration."
    />
  ),
});
