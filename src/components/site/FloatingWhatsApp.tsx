import { useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const WHATSAPP_URL = "https://wa.me/96552220900";

export function FloatingWhatsApp() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/contact") {
      setVisible(true);
      return;
    }

    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    let animationFrame = 0;
    let observer: IntersectionObserver | undefined;

    const updateVisibility = () => {
      const target = document.getElementById("pillars-section");
      setVisible(Boolean(target && target.getBoundingClientRect().top <= 0));
    };

    const attachObserver = () => {
      const target = document.getElementById("pillars-section");

      if (!target) {
        setVisible(false);
        animationFrame = requestAnimationFrame(attachObserver);
        return;
      }

      observer = new IntersectionObserver(updateVisibility, {
        threshold: [0, 1],
      });

      observer.observe(target);
      window.addEventListener("scroll", updateVisibility, { passive: true });
      window.addEventListener("resize", updateVisibility);
      updateVisibility();
    };

    animationFrame = requestAnimationFrame(attachObserver);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_12px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 ${
        visible ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
      }`}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
