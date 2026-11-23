import { useState } from "react";

interface GearItem {
  name: string;
  spec: string;
}

interface GearCategory {
  index: string;
  title: string;
  items: GearItem[];
}

const GEAR_CATEGORIES: GearCategory[] = [
  {
    index: "01",
    title: "Monitoring",
    items: [
      { name: "ADAM AUDIO T7V", spec: "PRINCIPALE" },
      { name: "AURATONE 5C ACTIVE", spec: "SECONDAIRE" },
      { name: "SENNNHEISER HD 490 PRO", spec: "CASQUE" },
      { name: "LAKE AUDIO G103-P MKII", spec: "AMPLI CASQUE" },
      { name: "4x SUPERLUX HA3D", spec: "AMPLI CASQUE" },
    ],
  },
  {
    index: "02",
    title: "Interface et Pré-amplis",
    items: [
      { name: "APOLLO 8XP", spec: "INTERFACE + PREAMP" },
      { name: "SSL 12", spec: "INTERFACE + PREAMP" },
      { name: "UNIVERSAL AUDIO 4-710D", spec: "PREAMP A LAMPE" },
      { name: "WARM AUDIO WA-412", spec: "PREAMP A TRANSISTOR" },

    ],
  },
  {
    index: "03",
    title: "Parc micro",
    items: [
      { name: "ROSWELL MINI K87", spec: "STATIQUE" },
      { name: "2x SE ELECTRONICS SE8", spec: "STATIQUE" },
      { name: "AKG P220", spec: "STATIQUE" },
      { name: "2x SUPERLUX S241", spec: "STATIQUE" },
      { name: "2x SUPERLUX HI 10", spec: "STATIQUE" },
      { name: "FAME PRO SERIES VRM-12", spec: "RUBAN" },
      { name: "SHURE SM7B", spec: "DYNAMIQUE" },
      { name: "2x SHURE SM58", spec: "DYNAMIQUE" },
      { name: "4x SHURE SM57", spec: "DYNAMIQUE" },
      { name: "AUDIX D6", spec: "DYNAMIQUE" },
      { name: "SENNHEISER E902", spec: "DYNAMIQUE" },
      { name: "SENNHEISER BF509", spec: "DYNAMIQUE" },
      
    ],
  },
  {
    index: "04",
    title: "DAW & Suites",
    items: [
      { name: "PRO TOOLS STUDIO", spec: "TRACKING & MIXAGE" },
      { name: "ABLETON LIVE 12", spec: "PRODUCTION" },
      { name: "FABFILTER PRO BUNDLE", spec: "MIXAGE" },
      { name: "WAVES HORIZON", spec: "MIXAGE" },
      { name: "SOUNDTOYS V 5.5", spec: "PRODUCTION" },
    ],
  },
];

export function StudioGearSection() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopyItem = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = name;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedItem(name);
    window.setTimeout(() => {
      setCopiedItem((prev) => (prev === name ? null : prev));
    }, 1800);
  };

  return (
    <section
      id="studio-gear"
      className="relative py-20 md:py-24 bg-background overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.13) 1.05px, transparent 1.05px)",
        backgroundSize: "32px 32px",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full px-5 md:px-10">
        {/* Compact Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-white/60">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Équipement</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              Le matériel du studio
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">
            Hybride analogique & numérique
          </p>
        </div>

        {/* 4 Side-by-Side Lists (Editorial Viewfinder Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {GEAR_CATEGORIES.map((category) => (
            <div
              key={category.index}
              className="group relative bg-background/75 backdrop-blur-[2px] border border-white/[0.08] p-6 transition-colors hover:border-white/20"
            >
              {/* Corner Viewfinder Ticks */}
              <span className="pointer-events-none absolute -top-px -left-px w-2.5 h-2.5 border-t border-l border-primary/80 transition-colors group-hover:border-primary" />
              <span className="pointer-events-none absolute -top-px -right-px w-2.5 h-2.5 border-t border-r border-primary/80 transition-colors group-hover:border-primary" />
              <span className="pointer-events-none absolute -bottom-px -left-px w-2.5 h-2.5 border-b border-l border-primary/80 transition-colors group-hover:border-primary" />
              <span className="pointer-events-none absolute -bottom-px -right-px w-2.5 h-2.5 border-b border-r border-primary/80 transition-colors group-hover:border-primary" />

              {/* Category Title */}
              <div className="flex items-baseline justify-between gap-2 pb-4 mb-4 border-b border-white/[0.08]">
                <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
                  {category.title}
                </h3>
                <span className="text-[11px] font-mono text-primary">
                  {category.index}
                </span>
              </div>

              {/* 5 Tabular Items */}
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() => handleCopyItem(item.name)}
                      className="w-full flex items-baseline justify-between gap-3 text-[11px] uppercase tracking-[0.12em] text-white/70 hover:text-primary transition-colors cursor-pointer text-left"
                    >
                      <span className="truncate">{item.name}</span>
                      {copiedItem === item.name ? (
                        <span className="shrink-0 text-[10px] tracking-[0.14em] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40">
                          Copié
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] text-white/40 font-mono">
                          {item.spec}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
