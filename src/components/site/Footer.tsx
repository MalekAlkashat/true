import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const WHATSAPP_URL = "https://wa.me/96552220900";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="container mx-auto grid gap-12 px-6 md:px-10 lg:px-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="TRUE Automation" className="h-18 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Kuwait's premier destination for smart automation, BAS, BMS and
            low-voltage solutions. We engineer intelligent spaces that respond,
            adapt, and save energy.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              //{ Icon: Facebook, href: "https://www.facebook.com/True.Smart.Kuwait" },
              //{ Icon: Twitter, href: "https://twitter.com/TrueKuwait" },
              { Icon: Instagram, href: "https://www.instagram.com/true.automation" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/true-for-genral-trading-&-contracting-co-" },
              { Icon: MessageCircle, href: WHATSAPP_URL },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex flex-wrap gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="tel:+96552220900" className="hover:text-foreground">+965 5222 0900</a></li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="tel:+96550544882" className="hover:text-foreground">+965 5054 4882</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="mailto:info@true.com.kw" className="hover:text-foreground">info@true.com.kw</a></li>
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Ben Khaldoun St., Shoaa Complex, 5th Fl, Hawally, Kuwait</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TRUE for General Trading &amp; Contracting Co. — Automation &amp; More.
      </div>
    </footer>
  );
}
