import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PortfolioItem } from '../types';

const GLOBAL_FALLBACK_IMAGE = "https://www.estithmarholding.com/assets/images/businesses/ventures/rixos/11.jpg";

// Enhanced data with specific capabilities for the new layout
interface EnhancedPortfolioItem extends PortfolioItem {
  capabilities: string[];
  stat: string;
}

const sectors: EnhancedPortfolioItem[] = [
  {
    id: 'health',
    name: 'Apex Health',
    description: 'Redefining healthcare standards with world-class facilities and advanced medical technology. We manage state-of-the-art hospitals that prioritize patient outcomes and operational excellence.',
    // Reliable Hospital Image
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', 
    capabilities: ['Hospital Management', 'Medical Technology', 'Patient Care Services'],
    stat: '5 World-Class Hospitals'
  },
  {
    id: 'services',
    name: 'Elegancia Services',
    description: 'Delivering premium facility management, high-end catering, and human resource solutions. We ensure operational continuity and excellence for Qatar’s most critical infrastructures.',
    // Reliable Service/Event Image
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop', 
    capabilities: ['Facility Management', 'Industrial Catering', 'Resources & Manpower'],
    stat: '15,000+ Workforce'
  },
  {
    id: 'ventures',
    name: 'Estithmar Ventures',
    description: 'Curating iconic tourism assets and luxury hospitality destinations. We create immersive experiences that drive Qatar’s tourism sector forward.',
    // Reliable Resort Image
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop', 
    capabilities: ['Luxury Hospitality', 'Entertainment Hubs', 'Tourism Assets'],
    stat: '3 Iconic Destinations'
  },
  {
    id: 'contracting',
    name: 'Elegancia Contracting',
    description: 'Leading the infrastructure and engineering projects shaping the nation’s skyline. From MEP to landscape, we build the foundations of the future.',
    // Reliable Construction Image
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop', 
    capabilities: ['MEP Engineering', 'Landscape & Marine', 'Fit-Out & Interiors'],
    stat: 'Grade A Contractor'
  },
];

const SectorContent = ({ 
  item, 
  index, 
  setIndex 
}: { 
  item: EnhancedPortfolioItem; 
  index: number; 
  setIndex: (i: number) => void 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when the element is in the middle of the viewport
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) setIndex(index);
  }, [isInView, index, setIndex]);

  return (
    <div 
      ref={ref} 
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 border-l border-white/5"
    >
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-estithmar-gold font-mono text-xl">0{index + 1}</span>
          <div className="h-px w-12 bg-estithmar-gold/50"></div>
          <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Business Sector</span>
        </div>

        <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          {item.name}
        </h3>

        <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
          {item.description}
        </p>

        <div className="mb-10">
          <h4 className="text-white text-sm uppercase tracking-wider mb-4 font-semibold border-b border-white/10 pb-2 inline-block">Key Capabilities</h4>
          <ul className="space-y-3">
            {item.capabilities.map((cap, i) => (
              <li key={i} className="flex items-center text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-estithmar-gold mr-3" />
                {cap}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-8">
           <div>
             <div className="text-estithmar-gold font-bold text-xl">{item.stat}</div>
             <div className="text-xs text-gray-500 uppercase">Impact Metric</div>
           </div>
           
           <button className="group flex items-center text-white font-bold uppercase text-sm tracking-widest hover:text-estithmar-gold transition-colors">
             Explore <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </motion.div>
    </div>
  );
};

const PortfolioScroll: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="sectors" className="bg-estithmar-navy relative">
      <div className="flex flex-col md:flex-row">
        
        {/* Left Column: Sticky Visuals (Desktop) */}
        <div className="hidden md:block w-1/2 h-screen sticky top-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {sectors.map((sector, index) => (
              index === activeIndex && (
                <motion.div
                  key={sector.id}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <img 
                    src={sector.image} 
                    alt={sector.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
                  />
                  {/* Overlay Gradient for consistency */}
                  <div className="absolute inset-0 bg-gradient-to-r from-estithmar-navy/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-estithmar-navy/20" />
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* Decorative Elements on Image */}
          <div className="absolute bottom-12 left-12 z-10">
            <div className="flex space-x-2">
               {sectors.map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-estithmar-gold' : 'w-2 bg-white/30'}`} 
                 />
               ))}
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable Content */}
        <div className="w-full md:w-1/2 relative z-10 bg-estithmar-navy">
          {/* Header Mobile Only */}
          <div className="md:hidden p-6 pb-0 pt-20">
             <span className="text-estithmar-gold font-bold tracking-widest uppercase mb-2 block">Our Portfolio</span>
             <h2 className="text-3xl font-bold text-white">Diversified Excellence</h2>
          </div>

          {sectors.map((sector, index) => (
            <div key={sector.id}>
              {/* Mobile Image (Visible only on small screens) */}
              <div className="md:hidden h-[40vh] w-full relative mt-8">
                 <img 
                   src={sector.image} 
                   alt={sector.name} 
                   className="w-full h-full object-cover"
                   onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-estithmar-navy to-transparent" />
              </div>
              
              <SectorContent 
                item={sector} 
                index={index} 
                setIndex={setActiveIndex} 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortfolioScroll;