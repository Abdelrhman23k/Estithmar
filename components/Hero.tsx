import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Define the structure for video sources
interface VideoSource {
  type: 'youtube' | 'direct';
  url: string;
}

// CONFIGURATION: Direct MP4 Links
const videoSources: VideoSource[] = [
  // 1. Elegancia Joinery
  { 
    type: 'direct', 
    url: "https://res.cloudinary.com/duvfgbslh/video/upload/v1769512250/YTDown.com_YouTube_Elegancia-Joinery_Media_TnWOLYagLr0_001_1080p_cnq4wv.mp4" 
  },
  // 2. Estithmar Reveal
  { 
    type: 'direct', 
    url: "https://res.cloudinary.com/duvfgbslh/video/upload/v1769511945/YTDown.com_YouTube_Estithmar-Holding-reveals-its-new-tradem_Media_uLMDh_uQRig_001_1080p_mcgr9c.mp4" 
  },
  // 3. Elegancia Marine
  { 
    type: 'direct', 
    url: "https://res.cloudinary.com/duvfgbslh/video/upload/v1769511869/YTDown.com_YouTube_Elegancia-Marine_Media_J0xY74c6UnM_001_1080p_blqdok.mp4" 
  },
  // 4. Elegancia Catering
  {
    type: 'direct',
    url: "https://res.cloudinary.com/duvfgbslh/video/upload/v1769511584/YTDown.com_YouTube_Elegancia-Catering_Media_ph8ZOJ9Mfcg_001_1080p_kbsa7q.mp4"
  }
];

// Fallback image: Estithmar Rixos
const FALLBACK_IMAGE = "https://www.estithmarholding.com/assets/images/businesses/ventures/rixos/11.jpg";

// Market Indicators Data
const indicators = [
  { symbol: "IGRD", name: "Estithmar Holding", price: "2.45", currency: "QAR", change: "+1.24%", isUp: true, highlight: true },
  { symbol: "QSE", name: "Qatar Stock Exchange", price: "10,245.30", currency: "PTS", change: "+0.45%", isUp: true },
  { symbol: "BRENT", name: "Brent Crude", price: "82.40", currency: "USD", change: "+0.80%", isUp: true },
  { symbol: "QERI", name: "Al Rayan Islamic", price: "2,340.12", currency: "PTS", change: "+0.12%", isUp: true },
  { symbol: "QGTS", name: "Nakilat", price: "3.80", currency: "QAR", change: "+0.15%", isUp: true },
  { symbol: "NATGAS", name: "Natural Gas", price: "2.85", currency: "USD", change: "-1.50%", isUp: false },
  { symbol: "USD/QAR", name: "Exchange Rate", price: "3.64", currency: "QAR", change: "0.00%", isUp: null },
  { symbol: "GOLD", name: "Gold Spot", price: "2,045.50", currency: "USD", change: "+0.30%", isUp: true },
];

const BackgroundVideoPlayer: React.FC<{ source: VideoSource; isActive: boolean }> = ({ source, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Optimization: Pause video when not active to save resources
    if (videoRef.current) {
      if (isActive) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Auto-play prevented:", error);
          });
        }
      } else {
        // Optional: Pause when not visible, or keep playing for seamless transition. 
        // Keeping it playing creates smoother cross-fades but uses more CPU.
        // videoRef.current.pause(); 
      }
    }
  }, [isActive]);

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
        isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
      }`}
    >
      <div className="relative w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          src={source.url}
          autoPlay
          muted
          loop
          playsInline
          poster={FALLBACK_IMAGE}
        />
      </div>
    </div>
  );
};

const TickerItem: React.FC<{ item: typeof indicators[0] }> = ({ item }) => (
  <div className={`
    flex-shrink-0 flex items-center space-x-4 px-8 py-4 border-r border-white/5 
    ${item.highlight 
      ? 'bg-estithmar-gold/[0.04] relative overflow-hidden' 
      : 'bg-white/[0.02]'
    }
  `}>
    {item.highlight && (
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-estithmar-gold animate-pulse"></div>
    )}
    <div className="flex flex-col">
      <span className={`text-xs font-bold tracking-wider uppercase ${item.highlight ? 'text-estithmar-gold' : 'text-white/70'}`}>
        {item.symbol}
      </span>
      {item.highlight && (
        <span className="text-[10px] text-estithmar-gold/80 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          LIVE
        </span>
      )}
    </div>
    
    <div className="flex flex-col items-end min-w-[80px]">
      <span className="text-sm font-bold text-white tabular-nums leading-none mb-1">
        {item.price} <span className="text-[10px] font-normal text-white/50">{item.currency}</span>
      </span>
      <span className={`text-[11px] font-medium flex items-center ${
        item.isUp === true ? 'text-green-400' : 
        item.isUp === false ? 'text-red-400' : 'text-gray-400'
      }`}>
        {item.isUp === true && <TrendingUp className="w-3 h-3 mr-1" />}
        {item.isUp === false && <TrendingDown className="w-3 h-3 mr-1" />}
        {item.isUp === null && <Minus className="w-3 h-3 mr-1" />}
        {item.change}
      </span>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoSources.length);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Create a quadrupled list for seamless scrolling
  const tickerData = [...indicators, ...indicators, ...indicators, ...indicators];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-estithmar-dark">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 bg-black">
        {videoSources.map((source, index) => (
          <BackgroundVideoPlayer
            key={index}
            source={source}
            isActive={index === currentVideoIndex}
          />
        ))}
        
        {/* Cinematic Noise/Grain Overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
        
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-estithmar-navy/60 via-estithmar-navy/30 to-estithmar-navy/80 mix-blend-multiply" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pointer-events-none pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg"
        >
          Building Qatar's <span className="text-estithmar-gold">Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-2xl text-gray-100 max-w-3xl font-light tracking-wide drop-shadow-md px-4"
        >
          A diversified portfolio driving excellence in <br className="hidden md:block"/> Healthcare, Services, and Ventures.
        </motion.p>
      </div>

      {/* Full Width Ticker Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-estithmar-navy/10 backdrop-blur-[2px] border-t border-white/5 h-20 flex items-center overflow-hidden pointer-events-auto">
        {/* Gradient Masks for smooth fade at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-estithmar-navy/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-estithmar-navy/80 to-transparent z-10 pointer-events-none"></div>
        
        <motion.div 
          className="flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          // Pause on hover
          whileHover={{ animationPlayState: "paused" }}
        >
          {tickerData.map((item, index) => (
             <TickerItem key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;