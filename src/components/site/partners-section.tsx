import { motion, useReducedMotion } from "framer-motion";

import { partners } from "@/lib/brand-data";

const repeated = [...partners, ...partners, ...partners];

export function PartnersSection() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative mt-14 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent md:before:w-36 md:after:w-36"
      aria-label="Technology partners"
    >
      <motion.div
        className="flex w-max items-center gap-12 md:gap-20"
        animate={reduceMotion ? undefined : { x: ["0%", "-33.333%"] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 140,
                ease: "linear",
                repeat: Infinity,
              }
        }
      >
        {repeated.map((partner, idx) => (
          <div
            key={`${partner.name}-${idx}`}
            className="flex h-20 w-44 shrink-0 items-center justify-center md:w-52"
          >
            <img
              src={partner.src}
              alt={partner.name}
              width={208}
              height={56}
              className="h-14 w-auto max-w-full object-contain opacity-80 grayscale brightness-200 transition duration-300 hover:opacity-100 hover:grayscale-0 hover:brightness-100"
              draggable={false}
              style={{ transform: `scale(${partner.scale ?? 1})` }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
