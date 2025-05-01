import { AppContentWrapper } from '@/components/common/Global.style';
import Hero from '@/features/home/hero/Hero';
import HowItWorks from '@/features/home/how-it-works/HowItWorks';
import NewService from '@/features/home/new-service/NewService';
import PerfectHelper from '@/features/home/perfect-helper/PerfectHelper';
import Testimonials from '@/features/home/testimonials/Testimonials';
import Services from '@/features/home/what-we-offer/Services';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <NewService />
      <Testimonials />
      <PerfectHelper />
    </>
  );
}
