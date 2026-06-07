import { motion, useReducedMotion } from "framer-motion";

import { clients } from "@/lib/brand-data";

const marqueeItems = [...clients, ...clients];

export function ClientsCarousel() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden border-b border-border/60 bg-background py-27">
      <div className="container mx-auto px-6 md:px-10 lg:px-12">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary py-7">
          Clients Who Trust Us
        </p>
        <div
          className="relative overflow-hidden before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent md:before:w-36 md:after:w-36"
          aria-label="Client logos"
        >
          <motion.div
            className="flex w-max items-center gap-12 md:gap-18"
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 200,
                    ease: "linear",
                    repeat: Infinity,
                  }
            }
          >
            {marqueeItems.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex h-16 w-36 shrink-0 items-center justify-center opacity-80 transition-opacity hover:opacity-100 md:w-44"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  width={176}
                  height={64}
                  draggable={false}
                  className="max-h-12 w-full object-contain"
                  style={{ transform: `scale(${client.scale ?? 1})` }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
