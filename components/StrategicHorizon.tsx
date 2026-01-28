import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Building, Activity, Quote, Leaf, HardHat, ArrowRight } from 'lucide-react';

const GLOBAL_FALLBACK_IMAGE = "https://www.estithmarholding.com/assets/images/businesses/ventures/rixos/11.jpg";

// --- Types ---

interface SlideProps {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  details: { icon: any; text: string }[];
  image: string;
  align: 'left' | 'right' | 'center';
}

// --- Data ---

const slides: SlideProps[] = [
  {
    id: 1,
    title: "Specialized Healthcare Leadership",
    subtitle: "The Flagship Sector",
    description: "Our goal is to become the premier healthcare operator in the MENA region. We are replicating the success of The View Hospital (affiliated with Cedars-Sinai) in international markets.",
    details: [
      { icon: Building, text: "Iraq: Developing the 400-bed Baghdad International Hospital." },
      { icon: Building, text: "Algeria: Constructing the 300-bed Algerian-Qatari-German Hospital." },
      { icon: Activity, text: "Kazakhstan & Libya: Managing hospitals under long-term agreements." }
    ],
    // Reliable Hospital Image
    image: "https://images.unsplash.com/photo-1516549882906-894213fe3218?q=80&w=1200&auto=format&fit=crop", 
    align: 'left'
  },
  {
    id: 2,
    title: "Patriotic Capital & Vision 2030",
    subtitle: "The Engine of Sustainability",
    description: "We are the primary private-sector engine for Qatar National Vision 2030, shifting the economy from oil-reliance to service-led sustainability through tourism and ESG excellence.",
    details: [
      { icon: Leaf, text: "ESG: Heavy focus to attract global institutional investors (FTSE Russell)." },
      { icon: Building, text: "Key Assets: Al Maha Island, Katara Hills, Maysan Doha." }
    ],
    // Reliable Modern Architecture (Doha/Futuristic)
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
    align: 'right'
  },
  {
    id: 3,
    title: "Industrial Expansion in KSA",
    subtitle: "Capturing the Vision 2030 Boom",
    description: "Positioning Elegancia as the quality execution partner for Saudi giga-projects. Our industrial arm is securing massive contracts with Red Sea Global and NEOM.",
    details: [
      { icon: HardHat, text: "NEOM & Red Sea Global: Securing massive infrastructure contracts." },
      { icon: ArrowRight, text: "Strategy: Exporting Qatari execution quality to the Kingdom." }
    ],
    // Reliable Industrial/Construction
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
    align: 'left'
  }
];

// --- Components ---

const IntroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-estithmar-navy overflow-hidden py-24">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          {/* Reliable Earth/Space Image */}
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop" 
            alt="Strategic Vision" 
            className="w-full h-full object-cover opacity-20"
            onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-estithmar-navy via-estithmar-navy/80 to-estithmar-navy" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block py-2 px-4 border border-estithmar-gold/50 rounded-full bg-estithmar-gold/10 text-estithmar-gold text-sm font-bold uppercase tracking-widest mb-8">
            The Pulse of the Future
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            A Vision Beyond <span className="text-estithmar-gold">Borders</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-12">
            Estithmar’s vision is to evolve from a local Qatari powerhouse into a regional conglomerate that exports Qatari excellence to the world. We are not just investing; we are exporting a successful operational model to high-growth markets.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
             <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="p-2 bg-estithmar-gold/20 rounded-full text-estithmar-gold">
                   <Quote className="w-5 h-5" />
                </div>
                <span className="text-white text-left font-medium">Creating a brighter future from Qatar to the world.</span>
             </div>
             <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="p-2 bg-estithmar-gold/20 rounded-full text-estithmar-gold">
                   <Globe2 className="w-5 h-5" />
                </div>
                <span className="text-white text-left font-medium">From Local Powerhouse to Regional Conglomerate</span>
             </div>
          </div>
        </motion.div>
      </div>
      
      {/* Connecting Line Start */}
      <div className="absolute bottom-0 left-1/2 w-px h-24 bg-gradient-to-b from-transparent to-estithmar-gold/50 transform -translate-x-1/2"></div>
    </section>
  );
};

const ContentSection: React.FC<{ slide: SlideProps; index: number }> = ({ slide, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="relative py-24 md:py-32 bg-estithmar-navy overflow-hidden">
      {/* Connecting Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 transform -translate-x-1/2 hidden md:block"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? '' : 'md:flex-row-reverse'}`}>
          
          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
              />
              <div className="absolute inset-0 bg-estithmar-navy/20 group-hover:bg-transparent transition-colors duration-500" />
              
              {/* Decorative Number */}
              <div className={`absolute -bottom-6 -right-6 text-[120px] font-bold text-white/5 leading-none select-none z-0 ${isEven ? 'right-0' : 'left-0 right-auto'}`}>
                0{slide.id}
              </div>
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
               <div className="flex items-center gap-3 mb-6">
                  <span className="text-estithmar-gold font-bold uppercase tracking-widest text-sm">
                    {slide.subtitle}
                  </span>
                  <div className="h-px w-12 bg-estithmar-gold/50"></div>
               </div>

               <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                 {slide.title}
               </h3>

               <p className="text-gray-300 text-lg leading-relaxed mb-10 pl-6 border-l-2 border-estithmar-gold/30">
                 {slide.description}
               </p>

               <div className="space-y-4">
                 {slide.details.map((detail, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 + (i * 0.1) }}
                     viewport={{ once: true }}
                     className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                   >
                     <div className="mt-1 text-estithmar-gold shrink-0">
                       <detail.icon className="w-5 h-5" />
                     </div>
                     <p className="text-gray-300 text-sm font-medium">{detail.text}</p>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const StrategicHorizon: React.FC = () => {
  return (
    <div className="bg-estithmar-navy">
      <IntroSection />
      {slides.map((slide, index) => (
        <ContentSection key={slide.id} slide={slide} index={index} />
      ))}
      
      {/* Final Spacer */}
      <div className="h-24 bg-estithmar-navy"></div>
    </div>
  );
};

export default StrategicHorizon;