import { useState } from "react";
import { ArrowUp, Instagram, Youtube } from "lucide-react";
import logoImage from "figma:asset/854caf8d83a4cab840cb39cfae19be346aed551c.png";

interface FooterProps {
  studioName?: string;
  onNavigate?: (page: "home" | "about", sectionId?: string) => void;
}

export function Footer({ studioName = "Studio LABAZ", onNavigate }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const scrollToSection = (id: string) => {
    if (onNavigate) {
      onNavigate("home", id);
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAboutClick = () => {
    if (onNavigate) {
      onNavigate("about");
      return;
    }
    scrollToSection("about");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@studiolabaz.com");
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = "contact@studiolabaz.com";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="bg-background border-t border-white/[0.08]">
      <div className="w-full px-5 md:px-10 pt-[51px] md:pt-16 pb-16 md:pb-20">
        {/* Top Editorial Callout (Davide Carusio inspired) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
          <div className="space-y-2">
            <div className="inline-flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-white/80">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <button
                type="button"
                onClick={handleCopyEmail}
                className="hover:text-white transition-colors cursor-pointer text-left uppercase tracking-[0.2em]"
              >
                contact@studiolabaz.com
              </button>
              {copied && (
                <span className="text-[10px] tracking-[0.14em] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40">
                  Copié
                </span>
              )}
            </div>
            <div>
              <a
                href="tel:+33614321539"
                className="inline-block text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors pl-4.5"
              >
                06 14 32 15 39
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/studiolabaz?fqnt=MWw4a3V1Z2hnanMxbA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors pl-4.5"
              >
                @studiolabaz
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start md:self-end inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2.5 rounded-full transition-all"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main Grid: Brand on left, Quick Links toward right margin */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-9 pb-10">
          {/* Logo & Studio Name */}
          <div className="flex items-center gap-2.5">
            <img src={logoImage} alt="Studio AG Logo" className="w-10 h-10 object-contain" />
            <span
              className="text-2xl font-bold text-white whitespace-nowrap"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              {studioName}
            </span>
          </div>

          {/* Horizontal Quick Links aligned to right margin */}
          <nav aria-label="Liens rapides">
            <ul className="flex flex-wrap items-center gap-6 md:gap-8 md:justify-end">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("studio-gear")}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Équipement
                </button>
              </li>
              <li>
                <button
                  onClick={handleAboutClick}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Qui suis-je ?
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/studiolabaz?fqnt=MWw4a3V1Z2hnanMxbA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/15 hover:border-primary hover:bg-primary rounded-full flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-4 h-4 text-white/75 group-hover:text-white" />
              </a>
              <span
                aria-label="YouTube"
                className="w-9 h-9 border border-white/15 rounded-full flex items-center justify-center text-white/50"
              >
                <Youtube className="w-4 h-4" />
              </span>
            </div>

            {/* Copyright */}
            <p className="text-white/50 text-xs tracking-wide">
              © 2026 {studioName}. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
