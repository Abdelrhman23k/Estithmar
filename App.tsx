import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImpactBar from './components/ImpactBar';
import PortfolioScroll from './components/PortfolioScroll';
import GrowthEngine from './components/GrowthEngine';
import VisionSection from './components/VisionSection';
import StrategicHorizon from './components/StrategicHorizon';
import InvestorRadar from './components/InvestorRadar';
import GlobalPresence from './components/GlobalPresence';
import InsightsGrid from './components/InsightsGrid';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Handle hash routing
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentPath(hash);
      
      // If we are at root or specific page route (not an anchor on home)
      if (hash === '' || hash === '#/' || hash === '#/about') {
         window.scrollTo(0, 0);
      } else {
         // Attempt to scroll to anchor, with a delay to allow Home to mount if switching from About
         setTimeout(() => {
             const id = hash.replace('#', '');
             const element = document.getElementById(id);
             if (element) {
                 element.scrollIntoView({ behavior: 'smooth' });
             }
         }, 100);
      }
    };

    // Set initial path
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // If path is #/about, render the About Page
  if (currentPath === '#/about') {
    return <AboutPage />;
  }

  // Default: Render the Homepage
  return (
    <div className="font-sans antialiased text-estithmar-navy bg-white selection:bg-estithmar-gold selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ImpactBar />
        <PortfolioScroll />
        <GrowthEngine />
        <VisionSection />
        <StrategicHorizon />
        <InvestorRadar />
        <GlobalPresence />
        <InsightsGrid />
      </main>
      <Footer />
    </div>
  );
};

export default App;
