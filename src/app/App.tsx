import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { StudioGearSection } from "./components/StudioGearSection";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import heroBg from "figma:asset/7d1fec66758143679af54c226abd71383aaaec31.png";

type Page = "home" | "about";

export default function App() {
  const [page, setPage] = useState<Page>(() =>
    window.location.hash === "#qui-suis-je" ? "about" : "home"
  );

  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash === "#qui-suis-je" ? "about" : "home");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavigate = useCallback((targetPage: Page, sectionId?: string) => {
    if (targetPage === "about") {
      window.location.hash = "qui-suis-je";
      setPage("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (window.location.hash === "#qui-suis-je") {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    setPage("home");

    if (sectionId) {
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="size-full min-h-screen">
      <Header
        studioName="Studio Labaz"
        alwaysVisible={page === "about"}
        onNavigate={handleNavigate}
      />
      {page === "home" ? (
        <main>
          <HeroSection
            title="Studio Labaz"
            description={[
              "Chez Studio Labaz, je propose en ligne mes services de mixage et de mastering. Grace à mon experience dans le live et en studio, je saurais m'adapter à vos demandes et votre style musical.",
            ]}
            backgroundImage={heroBg}
          />
          <ServicesSection />
          <StudioGearSection />
        </main>
      ) : (
        <main>
          <AboutSection onBack={() => handleNavigate("home")} />
        </main>
      )}
      <Footer studioName="Studio Labaz" onNavigate={handleNavigate} />
    </div>
  );
}
