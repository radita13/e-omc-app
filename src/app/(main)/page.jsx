import HeroSection from "@/components/section/HeroSection";
import FeaturesSection from "@/components/section/FeaturesSection";
import EducationModuleSection from "@/components/section/EducationModuleSection";
import HowItWorksSection from "@/components/section/HowItWorksSection";
import FaqSection from "@/components/section/FaqSection";
import CtaSection from "@/components/section/CtaSection";
import AboutSection from "@/components/section/AboutSection";
import TeamSection from "@/components/section/TeamSection";
import AcknowledgementSection from "@/components/section/AcknowledgementSection";
import VideoAnimationSection from "@/components/section/VideoAnimationSection";

export const metadata = {
  title: "Beranda",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <VideoAnimationSection />
        <EducationModuleSection />
        <HowItWorksSection />
        <TeamSection />
        <AcknowledgementSection />
        <FaqSection />
        <CtaSection />
      </main>
    </div>
  );
}
