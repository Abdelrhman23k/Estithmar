import React, { useState, useEffect } from 'react';
import { Menu, Search, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScroll = window.scrollY;
        const heroHeight = window.innerHeight;
        
        // Update scrolled state
        setIsScrolled(currentScroll > 50);
        
        // Update past hero state (using hero height minus a small buffer)
        setIsPastHero(currentScroll > heroHeight - 80);
      }
    };

    // Initial check on mount
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Sectors', 'Investors', 'Media', 'Careers'];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-estithmar-navy/95 backdrop-blur-md py-4 shadow-xl border-b border-white/5' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#/" className="flex items-center space-x-3 group z-50 relative" onClick={() => setIsMobileMenuOpen(false)}>
            <div className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-500 ${
              isPastHero || isMobileMenuOpen ? 'bg-estithmar-gold' : 'bg-estithmar-gold'
            }`}>
               <span className="text-estithmar-navy font-bold text-xl">E</span>
            </div>
            <div className="flex flex-col justify-center">
              <span 
                className={`font-bold text-xl tracking-tight leading-none transition-colors duration-500 ${
                  isPastHero || isMobileMenuOpen ? 'text-estithmar-gold' : 'text-white'
                }`}
              >
                ESTITHMAR
              </span>
              <span 
                className={`font-light text-sm tracking-widest uppercase leading-none transition-colors duration-500 ${
                  isPastHero || isMobileMenuOpen ? 'text-estithmar-gold/80' : 'text-white/80'
                }`}
              >
                HOLDING
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#/about" 
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-500 ${
                isPastHero 
                  ? 'text-estithmar-gold hover:text-white' 
                  : 'text-white/90 hover:text-estithmar-gold'
              }`}
            >
              About
            </a>
            
            {['Sectors', 'Investors', 'Media', 'Careers'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-500 ${
                  isPastHero 
                    ? 'text-estithmar-gold hover:text-white' 
                    : 'text-white/90 hover:text-estithmar-gold'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Icons & Mobile Toggle */}
          <div className={`flex items-center space-x-6 transition-colors duration-500 z-50 relative ${
            (isPastHero || isMobileMenuOpen) ? 'text-estithmar-gold' : 'text-white'
          }`}>
            <Globe className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity hidden sm:block" />
            <Search className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity hidden sm:block" />
            <button className="md:hidden focus:outline-none" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-estithmar-navy flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col space-y-8 text-center">
              <a 
                href="#/about" 
                onClick={toggleMobileMenu}
                className="text-2xl font-bold text-white hover:text-estithmar-gold transition-colors uppercase tracking-widest"
              >
                About
              </a>
              {navLinks.slice(1).map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={toggleMobileMenu}
                  className="text-2xl font-bold text-white hover:text-estithmar-gold transition-colors uppercase tracking-widest"
                >
                  {item}
                </a>
              ))}
              
              <div className="h-px w-20 bg-white/10 mx-auto my-8"></div>
              
              <div className="flex space-x-8 justify-center text-white/70">
                 <div className="flex flex-col items-center gap-2">
                    <Globe className="w-6 h-6" />
                    <span className="text-xs uppercase">EN</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Search className="w-6 h-6" />
                    <span className="text-xs uppercase">Search</span>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;