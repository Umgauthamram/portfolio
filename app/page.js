import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import CustomCursor from "../components/ui/CustomCursor";
import Loader from "../components/ui/Loader";
import SmoothScroll from "../components/SmoothScroll";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Achievements from "../components/sections/Achievements";
import Contact from "../components/sections/Contact";

import { personalInfo, workExperience, projects, skills, achievements } from "../lib/data";

export default function Home() {
    return (
        <main className="min-h-screen bg-[var(--color-background)] overflow-x-hidden relative">
            <SmoothScroll />
            <Loader />
            <CustomCursor />
            <Navbar />

            <Hero personalInfo={personalInfo} />
            <About personalInfo={personalInfo} />
            <Experience workExperience={workExperience} />
            <Projects projects={projects} />
            <Skills skills={skills} />
            <Achievements achievements={achievements} />
            <Contact personalInfo={personalInfo} />

            <Footer />
        </main>
    );
}
