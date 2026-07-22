import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/smart-home-automation-kuwait")({
  head: () => ({
    meta: [
      {
        title:
          "Smart Home Automation Kuwait | Villa & Apartment Systems | TRUE",
      },
      {
        name: "description",
        content:
          "Smart home automation in Kuwait: lighting, climate, curtains, audio, security and voice control engineered and installed by TRUE Automation.",
      },
      {
        property: "og:title",
        content:
          "Smart Home Automation Kuwait | Villa & Apartment Systems | TRUE",
      },
      {
        property: "og:description",
        content:
          "Smart home automation in Kuwait: lighting, climate, curtains, audio, security and voice control engineered and installed by TRUE Automation.",
      },
      { property: "og:url", content: "/smart-home-automation-kuwait" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/smart-home-automation-kuwait" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://true.com.kw/smart-home-automation-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "ar",
        href: "https://true.com.kw/ar/smart-home-automation-kuwait",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://true.com.kw/smart-home-automation-kuwait",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      slug="smart-home-automation-kuwait"
      locale="en"
      eyebrow="Residential Automation"
      h1="Smart Home Automation"
      highlight="in Kuwait"
      heroLead="Turn your villa or apartment into a responsive, scene-based environment. One tap or one voice command sets the mood, the temperature, the music and the security — engineered and installed by TRUE's certified team across Kuwait."
      overviewHeading="What smart home automation means for your space"
      overviewParagraphs={[
        "Smart home automation in Kuwait is no longer a luxury add-on — it's how modern villas, apartments and penthouses are designed from the ground up. TRUE Automation builds systems that unify lighting, climate, curtains, audio, security and access into a single, intuitive layer you control from a wall panel, your phone, or your voice.",
        "Every project starts with how you actually live in the space, not a generic package. Morning routines, entertaining, movie nights, away-mode security — we design scenes around your household, then wire, program and commission the system so it just works, every day, without you thinking about it.",
        "We work with certified global automation brands and open protocols, so your smart home stays reliable, serviceable and upgradeable for years — not locked into a single vendor's roadmap.",
        "Every subsystem gets its own dedicated attention: light control with smart lighting scenes, HVAC control with smart AC scheduling, curtain control and shutter control with smart curtain and smart shutter motors, plus smart intercom and smart sound distribution — all unified under one automation platform instead of five separate remotes.",
      ]}
      features={[
        {
          title: "Light control & smart lighting",
          text: "Circadian and mood-based smart lighting scenes for every room, triggered by time, occupancy or a single tap.",
        },
        {
          title: "HVAC control & smart AC",
          text: "Zone-by-zone smart HVAC and AC control that learns your schedule and cuts energy waste.",
        },
        {
          title: "Curtain control & shutter control",
          text: "Smart curtain and smart shutter automation synced to sun position, scenes or voice command.",
        },
        {
          title: "Multi-room audio & smart sound",
          text: "Whole-home audio and video streamed to any room, controlled from one app.",
        },
        {
          title: "Voice control integration",
          text: "Works with Alexa, Google Assistant and Siri for hands-free control of every subsystem.",
        },
        {
          title: "Smart security, access & smart intercom",
          text: "Smart locks, cameras, smart intercom and alarm integration tied into the same automation platform.",
        },
      ]}
      faqs={[
        {
          q: "How much does smart home automation cost in Kuwait?",
          a: "Cost depends on villa size, the number of rooms and systems involved (lighting only vs. full lighting + climate + AV + security). We provide a transparent, itemized quote after a free on-site consultation — there's no one-size-fits-all package.",
        },
        {
          q: "Can smart home automation be retrofitted into an existing villa?",
          a: "Yes. While new-build projects give us the most flexibility for concealed wiring, we regularly retrofit existing homes in Kuwait using wireless and hybrid solutions that avoid major structural work.",
        },
        {
          q: "Which brands does TRUE install for home automation?",
          a: "We are certified installers of leading global automation brands and design around open protocols like KNX, so your system isn't locked to a single manufacturer.",
        },
        {
          q: "How long does installation take?",
          a: "A typical villa automation project takes a few weeks from design sign-off to commissioning, depending on scope and whether it's new construction or a retrofit.",
        },
        {
          q: "Do you provide after-installation support?",
          a: "Yes — every project includes commissioning, a walkthrough, and ongoing remote diagnostics and support after handover.",
        },
      ]}
      serviceType="Smart Home Automation"
      schemaDescription="Smart home automation services in Kuwait including lighting control, climate integration, motorized curtains, multi-room audio/video, voice control and smart security."
    />
  ),
});
