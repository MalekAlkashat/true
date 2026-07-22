import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/site/JsonLd";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "TRUE for General Trading & Contracting Co.",
  alternateName: "TRUE Automation",
  url: "https://true.com.kw",
  logo: "https://true.com.kw/logo.png",
  image: "https://true.com.kw/logo.png",
  telephone: ["+96552220900", "+96550544882"],
  email: "info@true.com.kw",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ben Khaldoun St., Shoaa Complex, 5th Fl",
    addressLocality: "Hawally",
    addressCountry: "KW",
  },
  areaServed: { "@type": "Country", name: "Kuwait" },
  sameAs: [
    "https://www.instagram.com/true.automation",
    "https://www.linkedin.com/company/true-for-genral-trading-&-contracting-co-",
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TRUE Automation — Smart Home, BAS &amp; BMS Solutions in Kuwait" },
      { name: "description", content: "TRUE Automation is Kuwait's premier provider of smart home automation, Building Automation Systems (BAS), Building Management Systems (BMS) and low-voltage control solutions." },
      { name: "author", content: "TRUE Automation" },
      { property: "og:title", content: "TRUE Automation — Smart Home, BAS &amp; BMS in Kuwait" },
      { property: "og:description", content: "Smart automation, BAS, BMS and low-voltage solutions for villas, fine dining, showrooms and outlets across Kuwait." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TRUE Automation" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { location } = useRouterState();
  const isAr = location.pathname.startsWith("/ar");

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = isAr ? "ar" : "en";
  }, [isAr]);

  return (
    <QueryClientProvider client={queryClient}>
      <JsonLd data={organizationJsonLd} />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
