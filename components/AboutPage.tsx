import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, TrendingUp, Users, ShieldCheck, Leaf, Anchor, Building2, Quote, Linkedin } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const GLOBAL_FALLBACK_IMAGE = "https://www.estithmarholding.com/assets/images/businesses/ventures/rixos/11.jpg";

// --- Types ---
interface LeaderProps {
  name: string;
  role: string;
  image: string;
  quote: string;
}

interface BentoCardProps {
  title: string;
  sub: string;
  icon: React.ElementType;
  size?: 'large' | 'tall' | 'wide';
  image?: string;
  delay?: number;
}

// --- Data ---
const leaders: LeaderProps[] = [
  {
    name: "Mohamad Moataz Al-Khayat",
    role: "Chairman",
    quote: "We are architects of experience, building the foundations for generations to come.",
    // Reliable Executive Image
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Ramez Al-Khayyat",
    role: "Vice Chairman & President",
    quote: "Agility is our currency. We move faster than the market to secure the best opportunities.",
    // Reliable Executive Image
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Eng. Mohammed Bin Badr",
    role: "Group CEO",
    quote: "Operational excellence is not a goal; it is our baseline for every project.",
    // Reliable Executive Image
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  }
];

const timelineEvents = [
  { year: "2008", title: "The Foundation", desc: "Roots of Elegancia Group established." },
  { year: "2019", title: "Rapid Expansion", desc: "Diversifying into healthcare and services." },
  { year: "2022", title: "Historic Merger", desc: "Reverse merger listing as Estithmar Holding." },
  { year: "2022", title: "World Cup Delivery", desc: "Al Maha Island delivered in record time." },
  { year: "2023", title: "Global Reach", desc: "Expansion into KSA, Iraq, and Maldives." },
  { year: "2025", title: "Vision 2030", desc: "FTSE Russell Inclusion & Strategic Growth." },
];

// --- Sub-Components ---

const BentoCard: React.FC<BentoCardProps> = ({ title, sub, icon: Icon, size, image, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`group relative rounded-3xl overflow-hidden border border-white/10 hover:border-estithmar-gold/50 transition-all duration-500
        ${size === 'large' ? 'col-span-1 md:col-span-2 row-span-2' : ''}
        ${size === 'tall' ? 'col-span-1 row-span-2' : ''}
        ${size === 'wide' ? 'col-span-1 md:col-span-2' : ''}
        bg-white/5 backdrop-blur-sm
      `}
    >
      {image && (
        <>
           <img 
             src={image} 
             alt={title} 
             className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
             onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-estithmar-navy via-estithmar-navy/50 to-transparent" />
        </>
      )}
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="mb-auto p-3 bg-white/10 w-fit rounded-xl backdrop-blur-md group-hover:bg-estithmar-gold group-hover:text-estithmar-navy transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{sub}</p>
      </div>
    </motion.div>
  );
};

const LeaderCard: React.FC<{ leader: LeaderProps }> = ({ leader }) => {
  return (
    <div className="group h-[400px] w-full perspective-1000 cursor-pointer">
      <div className="relative h-full w-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
        
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl">
          <img 
            src={leader.image} 
            alt={leader.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-estithmar-navy to-transparent opacity-90" />
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="text-2xl font-bold text-white">{leader.name}</h3>
            <p className="text-estithmar-gold uppercase tracking-widest text-sm font-semibold">{leader.role}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-estithmar-gold text-estithmar-navy p-8 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center shadow-xl">
          <Quote className="w-12 h-12 mb-6 opacity-50" />
          <p className="text-xl font-medium leading-relaxed mb-8">"{leader.quote}"</p>
          <a href="#" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:opacity-70 transition-opacity">
            View Biography <ArrowRight className="w-4 h-4" />
          </a>
          <div className="mt-8 flex gap-4">
             <Linkedin className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Main Page Component ---

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Use scroll on the specific container if wrapping the content, or default to window
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"] 
  });
  
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef });
  
  // Hero Effect
  // FIX: Provide full filter string to avoid MotionValue interpolation crash in render
  const grayScale = useTransform(scrollYProgress, [0, 0.1], ["grayscale(100%)", "grayscale(0%)"]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  
  // Timeline Transform
  const x = useTransform(timelineProgress, [0, 1], ["0%", "-85%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen relative font-sans selection:bg-estithmar-gold selection:text-white overflow-x-hidden">
      <Navbar />

      {/* 1. Hero Section: The Visionary Canvas */}
      <section className="relative h-[120vh] sticky top-0 z-0 overflow-hidden bg-black">
        <motion.div style={{ filter: grayScale }} className="absolute inset-0 w-full h-full">
           {/* Fallback to static image as video might be unreliable */}
           <img 
             className="w-full h-full object-cover opacity-60"
             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
             alt="About Hero"
             onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
           />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 pb-40">
           <motion.h1 
             style={{ y: heroTextY }}
             className="text-6xl md:text-9xl font-extrabold text-white tracking-tighter mb-6 leading-none"
           >
             CREATING A <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-estithmar-gold to-white">BRIGHTER FUTURE</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="text-xl md:text-2xl text-gray-300 font-light tracking-wide"
           >
             From Qatar to the World. The Architects of Experience.
           </motion.p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50">
          <span className="text-xs uppercase tracking-widest mb-2">Scroll to Explore</span>
          <div className="w-px h-12 bg-white/20 overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-estithmar-gold" 
            />
          </div>
        </div>
      </section>

      {/* 2. Corporate DNA: Bento Grid */}
      <section className="relative z-10 bg-estithmar-navy py-32 px-6">
        <div className="container mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Our DNA</h2>
            <div className="w-20 h-1 bg-estithmar-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
             <BentoCard 
               title="Leadership" 
               sub="Setting the global benchmark for operational excellence." 
               icon={TrendingUp} 
               size="large"
               image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
             />
             <BentoCard 
               title="Quality" 
               sub="Excellence is our baseline." 
               icon={ShieldCheck} 
               size="tall"
               image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
               delay={0.1}
             />
             <BentoCard 
               title="Agility" 
               sub="Moving faster than the market." 
               icon={Users} 
               delay={0.2}
             />
             <BentoCard 
               title="Global" 
               sub="9 Countries. 105 Companies." 
               icon={Globe} 
               delay={0.3}
             />
             <BentoCard 
               title="Boldness" 
               sub="Daring to expand beyond borders." 
               icon={Anchor} 
               size="wide"
               image="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop"
               delay={0.4}
             />
          </div>
        </div>
      </section>

      {/* 3. The Journey: Horizontal Scrollytelling */}
      <section ref={timelineRef} className="relative h-[300vh] bg-white">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="container mx-auto px-6 mb-12">
             <span className="text-estithmar-gold font-bold tracking-widest uppercase mb-2 block">Our History</span>
             <h2 className="text-5xl font-bold text-estithmar-navy">The Journey</h2>
          </div>
          
          <div className="w-full bg-gray-50 border-y border-gray-100 py-20 overflow-hidden relative">
             <div className="absolute top-1/2 left-0 w-full h-px bg-estithmar-gold/30" />
             
             <motion.div style={{ x }} className="flex gap-20 px-20">
               {timelineEvents.map((event, i) => (
                 <div key={i} className="relative flex-shrink-0 w-[85vw] md:w-[400px] group">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 rounded-full bg-estithmar-navy border-4 border-white shadow-lg z-10 group-hover:scale-150 group-hover:bg-estithmar-gold transition-all duration-300" />
                    
                    <div className={`ml-8 pl-8 border-l border-gray-200 transition-all duration-500 group-hover:border-estithmar-gold ${i % 2 === 0 ? '-mt-40 pb-20' : 'mt-20 pt-20'}`}>
                       <span className="text-6xl font-bold text-gray-200 group-hover:text-estithmar-navy transition-colors">{event.year}</span>
                       <h3 className="text-2xl font-bold text-estithmar-navy mt-2">{event.title}</h3>
                       <p className="text-gray-500 mt-2">{event.desc}</p>
                    </div>
                 </div>
               ))}
               {/* End Padding */}
               <div className="w-[50vw]" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Leadership: The Minds Behind the Vision */}
      <section className="py-32 bg-gray-50">
         <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-estithmar-navy mb-4">Visionary Leadership</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Guided by a board of directors committed to sustainable growth and corporate governance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {leaders.map((leader, i) => (
                 <LeaderCard key={i} leader={leader} />
               ))}
            </div>
         </div>
      </section>

      {/* 5. Global Operational Depth: Vector Map */}
      <section className="py-32 bg-estithmar-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center bg-no-repeat" />
        
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <span className="text-estithmar-gold font-bold tracking-widest uppercase mb-2 block">Operational Depth</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white">Boots on the Ground</h2>
              </div>
              <div className="flex gap-4 mt-8 md:mt-0">
                 <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10">
                    <span className="block text-2xl font-bold text-white">60+</span>
                    <span className="text-xs text-gray-400 uppercase">Companies</span>
                 </div>
                 <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10">
                    <span className="block text-2xl font-bold text-white">9</span>
                    <span className="text-xs text-gray-400 uppercase">Countries</span>
                 </div>
              </div>
           </div>

           {/* Stylized Vector Map Representation */}
           <div className="relative h-[500px] w-full bg-[#0B101E] rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center">
              <p className="text-gray-600 font-mono text-sm">[ Interactive Vector Map Visualization Loaded ]</p>
              
              {/* Animated Hotspots */}
              {[
                { top: '45%', left: '55%', label: 'Qatar' },
                { top: '48%', left: '56%', label: 'KSA' },
                { top: '42%', left: '54%', label: 'Iraq' },
                { top: '40%', left: '48%', label: 'Algeria' },
                { top: '60%', left: '65%', label: 'Maldives' }
              ].map((spot, i) => (
                <div key={i} className="absolute group cursor-pointer" style={{ top: spot.top, left: spot.left }}>
                   <div className="w-3 h-3 bg-estithmar-gold rounded-full relative z-10" />
                   <div className="absolute inset-0 bg-estithmar-gold rounded-full animate-ping opacity-75" />
                   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-estithmar-navy px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     {spot.label}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. ESG & Sustainability */}
      <section className="py-32 bg-gradient-to-br from-teal-900 to-estithmar-navy text-white relative">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-800/50 rounded-full text-teal-300 text-sm font-bold uppercase tracking-widest mb-6">
                     <Leaf className="w-4 h-4" /> ESG Committed
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">Sustainable Impact</h2>
                  <p className="text-teal-100 text-lg leading-relaxed mb-8">
                    We are building a legacy that goes beyond profit. Our commitment to environmental stewardship, social responsibility, and robust governance is weaving a greener future for the region.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-teal-400">
                           <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg">GSAS Certified</h4>
                           <p className="text-sm text-gray-300">All new developments meet Global Sustainability Assessment System standards.</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-teal-400">
                           <Users className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg">91 Nationalities</h4>
                           <p className="text-sm text-gray-300">A diverse, inclusive workforce driving innovation.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute -inset-4 bg-teal-500/20 blur-3xl rounded-full" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                     <span className="block text-teal-400 font-mono text-sm mb-2">Live Metric</span>
                     <span className="block text-6xl md:text-8xl font-bold text-white mb-4">28M+</span>
                     <span className="block text-xl text-gray-300">Safe Man-Hours Achieved</span>
                     <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '85%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-teal-400" 
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 7. CTA */}
      <section className="py-24 bg-white text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-estithmar-navy mb-8">Join Our Journey</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
               <button className="bg-estithmar-navy text-white px-8 py-4 rounded font-bold hover:bg-estithmar-gold transition-colors duration-300">
                  View Career Opportunities
               </button>
               <button className="bg-gray-100 text-estithmar-navy px-8 py-4 rounded font-bold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2">
                  <ArrowRight className="w-4 h-4" /> Download Corporate Profile
               </button>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;