import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { WaveRippleBackground } from "./WaveRippleBackground";

interface HeroSectionProps {
  title?: string;
  description?: string[];
  backgroundImage?: string;
}

export function HeroSection({
  title = "Studio Labaz",
}: HeroSectionProps) {
  const wordmarkContainerRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const [wordmarkFontSize, setWordmarkFontSize] = useState<number | null>(null);

  useEffect(() => {
    const container = wordmarkContainerRef.current;
    const heading = wordmarkRef.current;
    if (!container || !heading) return;

    const fitText = () => {
      const style = window.getComputedStyle(container);
      const padLeft = parseFloat(style.paddingLeft) || 0;
      const padRight = parseFloat(style.paddingRight) || 0;
      const availableWidth = container.clientWidth - padLeft - padRight;
      if (availableWidth <= 0) return;

      const refSize = 100;
      heading.style.fontSize = `${refSize}px`;
      const measuredWidth = heading.getBoundingClientRect().width;
      if (measuredWidth > 0) {
        const exactSize = (availableWidth / measuredWidth) * refSize;
        heading.style.fontSize = `${exactSize}px`;
        setWordmarkFontSize(exactSize);
      }
    };

    fitText();
    const observer = new ResizeObserver(fitText);
    observer.observe(container);
    document.fonts?.ready?.then(fitText);

    return () => observer.disconnect();
  }, [title]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-background">
      {/* Interactive Vector Wave Background */}
      <WaveRippleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background pointer-events-none" />

      {/* Upper / Middle Editorial Content */}
      <div className="relative z-10 w-full px-5 md:px-10 pt-28 md:pt-36 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Right-aligned Upper / Middle Editorial Content + CTA */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-6">
            <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-white/75">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Mix & Mastering — En ligne & Enregistrement</span>
            </div>
            <p className="text-xl md:text-2xl lg:text-2xl font-medium text-white/95 leading-snug max-w-md">
              Donnez vie à vos idées en faisant confiance à un professionnel expérimenté, passioné et minutieux. En ligne ou au studio basé à Saint-Germain-en-Laye, pour tout type de projet musical, je vous accompagne de B à Z.
            </p>
            
          </div>
        </div>
      </div>

      {/* Giant Display Wordmark Pinned to Base of Viewport (Davide Carusio style) */}
      <div
        ref={wordmarkContainerRef}
        className="relative z-10 w-full px-5 md:px-10 pt-10 pb-8 md:pb-10 mt-auto flex justify-center"
      >
        <h1
          ref={wordmarkRef}
          className="inline-block leading-[0.9] tracking-[0.04em] mr-[-0.04em] lowercase font-normal text-white whitespace-nowrap select-none text-center"
          style={{
            fontFamily: "'Michroma', sans-serif",
            fontSize: wordmarkFontSize ? `${wordmarkFontSize}px` : "8.5vw",
          }}
        >
          {title.toLowerCase()}
        </h1>
      </div>
    </section>
  );
}
