
import React from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/about/HeroSection';
import StorySection from '@/components/about/StorySection';
import MissionSection from '@/components/about/MissionSection';
import TeamSection from '@/components/about/TeamSection';
import ChooseUsSection from '@/components/about/ChooseUsSection';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-veloz-black text-white">
      <PublicNavbar />
      <HeroSection />
      <StorySection />
      <MissionSection />
      <TeamSection />
      <ChooseUsSection />
      <Footer />
    </div>
  );
};

export default AboutUs;
