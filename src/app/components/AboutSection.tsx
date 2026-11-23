import React from "react";
import { ArrowLeft } from "lucide-react";
import aldricPortrait from "figma:asset/464d11717e0ecebf6c6b94d2da561095e0af4506.png";
import studioConsole from "figma:asset/5e86893949705dfe512e150b1aa1e61a372b2eb1.png";

interface AboutSectionProps {
  onBack?: () => void;
}

export function AboutSection({ onBack }: AboutSectionProps) {
  return (
    <section id="about" className="pt-32 pb-24 bg-background min-h-[75vh]">
      <div className="container mx-auto px-6">
        {onBack && (
          <div className="mb-10">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/65 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2 rounded-full transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à l'accueil</span>
            </button>
          </div>
        )}
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Qui suis-je ?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Aldric Granger
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Column 1 */}
          <div className="space-y-12">
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                Je suis Aldric, ingénieur du son diplômé de l’école EMC Malakoff et passionné par l'art de la musique sous toutes ses formes depuis toujours.
              </p>
              <p>
                Basé à Saint-Germain-en-Laye, je propose des services professionnels d’enregistrement, de mixage et de mastering pour les artistes solo ou groupes en tous genres.
              </p>
            </div>
            
            <div className="relative">
              <img
                src={aldricPortrait}
                alt="Aldric portrait"
                className="w-full aspect-[4/3] object-cover rounded-2xl ring-1 ring-white/10 shadow-xl saturate-0 opacity-90 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/10 blur-[80px] -z-10 rounded-full"></div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-12 lg:pt-12">
            <div className="relative">
              <img
                src={studioConsole}
                alt="Recording studio console"
                className="w-full aspect-[4/3] object-cover rounded-2xl ring-1 ring-white/10 shadow-xl saturate-0 opacity-90 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/10 blur-[80px] -z-10 rounded-full"></div>
            </div>

            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                J’accompagne les artistes en concert comme en studio, en mettant un point d’honneur à sublimer leur identité musicale. Je propose également du beatmaking avec une approche à la fois technique et artistique, pour des productions sur mesure.
              </p>
              <p>
                Que vous ayez besoin d’un son prêt à diffuser, d’un mix professionnel, ou d’un environnement de travail créatif pour enregistrer vos idées, je vous offre un accompagnement personnalisé à chaque étape de votre projet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
