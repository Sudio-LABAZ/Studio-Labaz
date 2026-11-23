import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "figma:asset/854caf8d83a4cab840cb39cfae19be346aed551c.png";

interface HeaderProps {
  studioName?: string;
  alwaysVisible?: boolean;
  onNavigate?: (page: "home" | "about", sectionId?: string) => void;
}

export function Header({ studioName = "Studio AG", alwaysVisible = false, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastFirstViewport = alwaysVisible || window.scrollY >= window.innerHeight * 0.9;
      setScrolled(pastFirstViewport);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [alwaysVisible]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate("home", id);
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAboutClick = () => {
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate("about");
      return;
    }
    scrollToSection("about");
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate("home");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled || alwaysVisible || mobileOpen
          ? "bg-background/80 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full px-5 md:px-10 py-4 md:py-5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group"
          >
            <img src={logoImage} alt="Studio AG Logo" className="w-9 h-9 object-contain" />
            <span
              className="text-lg md:text-xl font-bold tracking-tight text-white whitespace-nowrap"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              {studioName}
            </span>
          </a>

          {/* Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9">
            <button
              onClick={() => scrollToSection("services")}
              className="text-xs uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("studio-gear")}
              className="text-xs uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
            >
              Équipement
            </button>
            <button
              onClick={handleAboutClick}
              className="text-xs uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
            >
              Qui suis-je ?
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.instagram.com/studiolabaz?fqnt=MWw4a3V1Z2hnanMxbA=="
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex border border-white/20 hover:border-primary text-white/85 hover:text-white hover:bg-primary/15 px-4 md:px-5 py-2 rounded-full transition-all font-medium text-xs md:text-sm"
            >
              Instagram
            </a>
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1uk5hj8jmAWLE2SUnANhgc1HG1_--n6CeSk5DW1A0G65CVgUHne-pkVjWn3b8dNE-4u2TWw1zS"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 md:px-5 py-2 rounded-full transition-all font-medium text-xs md:text-sm shadow-md shadow-primary/25 hover:shadow-primary/45 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Planifier un échange
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 transition-colors"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden pt-5 pb-3 border-t border-white/[0.08] mt-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("services")}
              className="text-left py-2 text-sm uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("studio-gear")}
              className="text-left py-2 text-sm uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors"
            >
              Équipement
            </button>
            <button
              onClick={handleAboutClick}
              className="text-left py-2 text-sm uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors"
            >
              Qui suis-je ?
            </button>
            <a
              href="https://www.instagram.com/studiolabaz?fqnt=MWw4a3V1Z2hnanMxbA=="
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center justify-center border border-white/20 text-white/90 px-4 py-2.5 rounded-full text-sm font-medium mt-1"
            >
              Instagram
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
