import { Mic, Music, AudioWaveform } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import servicesImage from "figma:asset/3a85a66b2853080b8fbd6951987b5facc0c8ab24.png";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  title?: string;
  description?: string;
  image?: string;
  services?: Service[];
}

export function ServicesSection({
  title = "Votre musique, perfectionnée.",
  description = "A l'aide d'outils professionnels et d'années d'expériences, je m'occupe de perfectionner votre projet pour atteindre les standards de diffusion sur tous les supports.",
  image = servicesImage,
  services = [
    {
      icon: Mic,
      title: "Enregistrement",
      description:
        "Capturez vos voix et instruments dans des conditions optimales grâce à un équipement analogique et numérique professionnel. Bénéficiez d'un accompagnement sur mesure pour des prises précises et prêtes pour le mixage.",
    },
    {
      icon: Music,
      title: "Mixage",
      description:
        "Le mixage est une étape cruciale dans la production d'un projet musical avant le mastering. Il transforme un multipiste en morceau structuré, équilibré et produit pour en faire une démo ou un futur titre !",
    },
    {
      icon: AudioWaveform,
      title: "Mastering",
      description:
        "Indispensable, le mastering est la dernière couche de vernis, la cerise sur le gâteau qui permetra à votre projet d'être compétitif en s'alignant avec les standards de l'industrie musicale. Il donnera également une cohérence entre vos titres avant la sortie de votre EP ou Album.",
    },
  
  ],
}: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Header with Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-white/60 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Services</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              {title}
            </h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <img
              src={image}
              alt="Music production equipment"
              className="w-full h-full object-cover saturate-0 opacity-80 mix-blend-luminosity hover:saturate-50 hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Service Cards */}
        <div id="pricing" className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3
                  className="text-sm uppercase tracking-[0.18em] font-semibold text-white mb-4"
                  style={{ fontFamily: "'Inria Sans', sans-serif" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-white/70 mb-4 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
