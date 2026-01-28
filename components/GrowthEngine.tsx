import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Globe, Map, ArrowRight, Activity } from 'lucide-react';

const GLOBAL_FALLBACK_IMAGE = "https://www.estithmarholding.com/assets/images/businesses/ventures/rixos/11.jpg";

interface Milestone {
  id: number;
  category: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    category: "Financial Excellence",
    title: "Record Profitability",
    metric: "99%",
    metricLabel: "Net Profit Growth",
    description: "Generated QAR 703 Mn in Net Profit, driven by operational efficiency and strategic acquisitions that have redefined our financial baseline.",
    icon: TrendingUp,
    // Reliable Finance/Growth
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=800&auto=format&fit=crop" 
  },
  {
    id: 2,
    category: "Global Validation",
    title: "FTSE Russell Inclusion",
    metric: "Global",
    metricLabel: "Index Member",
    description: "Officially included in the FTSE Russell Qatar Mid-Cap Index starting September 2025, validating our market strength to international investors.",
    icon: Globe,
    // Reliable Market Data
    image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=800&auto=format&fit=crop" 
  },
  {
    id: 3,
    category: "Regional Powerhouse",
    title: "Expansion Beyond Borders",
    metric: "KSA & Iraq",
    metricLabel: "Strategic Markets",
    description: "Delivering award-winning projects for Red Sea Global in Saudi Arabia and leading major infrastructure developments across Iraq.",
    icon: Map,
    // Reliable Global/Map/Handshake
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop" 
  }
];

const PatternBackground = ({ type }: { type: number }) => {
  return (
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden z-0">
      {type === 1 && (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L20 80 L40 90 L60 40 L80 50 L100 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-current" />
          <path d="M0 100 L20 85 L40 95 L60 45 L80 55 L100 15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-current" transform="translate(0, 10)" />
        </svg>
      )}
      {type === 2 && (
        <svg className="w-full h-full" viewBox="0 0 100 100">
           <circle cx="80" cy="20" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-current" />
           <circle cx="80" cy="20" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-current" />
           <circle cx="80" cy="20" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-current" />
        </svg>
      )}
      {type === 3 && (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-current" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      )}
    </div>
  );
};

const GrowthEngine: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-estithmar-gold font-bold tracking-widest uppercase mb-3 block text-sm">
              Strategic Milestones
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-estithmar-navy mb-6 leading-tight">
              The Growth Engine
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Delivering consistent value through operational excellence and strategic global expansion. 
              We are building a legacy of sustainable growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex items-center space-x-2 text-estithmar-navy font-semibold text-sm uppercase tracking-wider mt-6 md:mt-0"
          >
            <Activity className="w-5 h-5 text-estithmar-gold" />
            <span>Real-time Momentum</span>
          </motion.div>
        </div>

        {/* Interactive Accordion Cards */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px]">
          {milestones.map((milestone) => {
            const isActive = activeId === milestone.id;
            return (
              <motion.div
                key={milestone.id}
                layout
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onMouseEnter={() => setActiveId(milestone.id)}
                onClick={() => setActiveId(milestone.id)} // Touch support
                className={`relative rounded-3xl overflow-hidden cursor-pointer shadow-xl group
                  ${isActive ? 'lg:flex-[3] bg-estithmar-navy text-white' : 'lg:flex-[1] bg-white text-estithmar-navy hover:bg-gray-50'}
                  flex flex-col
                `}
              >
                
                {/* Top Half: Image */}
                <motion.div layout className="h-64 lg:h-[45%] relative overflow-hidden">
                  <motion.img 
                    src={milestone.image} 
                    alt={milestone.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'bg-estithmar-navy/30' : 'bg-white/10 group-hover:bg-transparent'}`} />
                  
                  {/* Floating Icon Badge */}
                  <div className={`absolute top-6 left-6 p-3 rounded-2xl backdrop-blur-md shadow-lg transition-colors duration-300
                    ${isActive ? 'bg-white/20 text-estithmar-gold border border-white/20' : 'bg-white/90 text-estithmar-navy'}
                  `}>
                    <milestone.icon className="w-6 h-6" />
                  </div>

                  {/* Arrow Indicator (Desktop) */}
                  <div className="absolute top-6 right-6 hidden lg:block">
                     <motion.div 
                      animate={{ rotate: isActive ? 0 : -45, opacity: isActive ? 1 : 0.6 }}
                      className={`p-2 rounded-full ${isActive ? 'bg-estithmar-gold text-estithmar-navy' : 'bg-black/30 text-white'}`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Bottom Half: Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative">
                  {/* Background Pattern */}
                  <PatternBackground type={milestone.id} />
                  
                  <div className="relative z-10">
                    <motion.span 
                      layout="position" 
                      className={`text-xs font-bold uppercase tracking-widest mb-3 block ${isActive ? 'text-estithmar-gold' : 'text-gray-400'}`}
                    >
                      {milestone.category}
                    </motion.span>
                    
                    <motion.h3 
                      layout="position"
                      className={`text-2xl font-bold mb-6 leading-tight ${isActive ? 'text-white' : 'text-estithmar-navy'}`}
                    >
                      {milestone.title}
                    </motion.h3>

                    {/* Metric */}
                    <div className="mb-4">
                       <span className={`font-bold tracking-tight block leading-none transition-all duration-300
                         ${isActive ? 'text-5xl md:text-6xl text-white' : 'text-4xl text-estithmar-navy/90'}
                       `}>
                         {milestone.metric}
                       </span>
                       <span className={`text-sm font-medium mt-2 block ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                         {milestone.metricLabel}
                       </span>
                    </div>

                    {/* Description - Only visible when active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="h-px w-16 bg-estithmar-gold/50 my-6"></div>
                          <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-lg">
                            {milestone.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GrowthEngine;