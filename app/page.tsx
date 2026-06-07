import AuroraBackground from "@/components/ui/AuroraBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import SectionScroll from "@/components/ui/section-scroll";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <AuroraBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SectionScroll>
          <About />
        </SectionScroll>
        <SectionScroll>
          <Experience />
        </SectionScroll>
        <SectionScroll>
          <Projects />
        </SectionScroll>
        <SectionScroll>
          <Skills />
        </SectionScroll>
        <SectionScroll>
          <Achievements />
        </SectionScroll>
        <SectionScroll>
          <Contact />
        </SectionScroll>
        <Footer />
      </main>
    </>
  );
}
