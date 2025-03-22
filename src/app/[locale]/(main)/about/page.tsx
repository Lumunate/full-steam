import AboutAvalSpots from '@/features/about/about-aval-spots/AboutAvalSpot';
import AboutHowItWorks from '@/features/about/about-how-it-works/AboutHowItWorks';
import ActionToday from '@/features/about/action-today/ActionToday';
import DayCareSpot from '@/features/about/daycare-spot/DaycareSpot';
import AboutHero from '@/features/about/hero/Hero';
import WhyChooseFSA from '@/features/about/why-choose-fsa/WhyChooseFSA';
export default function Home() {
  return (
    <>
      <AboutHero />
      <DayCareSpot />
      <AboutHowItWorks />
      <AboutAvalSpots />
      <WhyChooseFSA />
      <ActionToday />
    </>
  );
}
