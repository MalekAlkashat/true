type ClientLogo = {
  name?: string;
  logo: string;
  scale?: number;
};

interface ClientsStripProps {
  logos: ClientLogo[];
}

function getAltText(src: string) {
  return (
    src
      .split("/")
      .pop()
      ?.replace(/\.(svg|png|webp)$/i, "")
      .replace(/[-_]/g, " ") ?? "Client logo"
  );
}

function getLogoSlug(src: string) {
  return getAltText(src).toLowerCase().replace(/\s+/g, "-");
}

export function ClientsStrip({ logos }: ClientsStripProps) {
  if (!logos.length) return null;

  const repeated = [...logos, ...logos];

  return (
    <section className="overflow-hidden bg-background py-12">
      <div className="container mx-auto px-6 md:px-10 lg:px-12">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Clients</p>
        <div className="relative overflow-hidden" aria-label="Our Clients">
          <div className="flex w-max animate-[marquee_80s_linear_infinite] items-center gap-12">
            {repeated.map((logo, idx) => {
              const src = logo.logo;
              const altText = logo.name || getAltText(src);

              return (
                <div
                  key={`${src}-${idx}`}
                  className="flex h-16 w-36 shrink-0 items-center justify-center"
                  data-logo={getLogoSlug(src)}
                >
                  <img
                    src={src}
                    alt={altText}
                    width={120}
                    height={52}
                    className="h-full w-full object-contain"
                    draggable={false}
                    style={{ transform: `scale(${logo.scale ?? 1})` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
