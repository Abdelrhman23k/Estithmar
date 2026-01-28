import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, Calendar, Tag, ChevronRight, Filter } from 'lucide-react';
import { NewsItem } from '../types';

const GLOBAL_FALLBACK_IMAGE = "https://www.estithmarholding.com/assets/images/businesses/ventures/rixos/11.jpg";

// Enhanced Mock Data
const allNews: NewsItem[] = [
  {
    id: 1,
    category: 'Corporate',
    title: 'Estithmar Holding achieves historic net profit growth of 99% in Q3 2024',
    date: 'Oct 15, 2023',
    // Reliable Corporate Building
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    category: 'Video',
    title: 'Strategic Vision: CEO discusses the future of healthcare in Qatar',
    date: 'Oct 10, 2023',
    // Reliable Medical/Executive
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ'
  },
  {
    id: 3,
    category: 'ESG',
    title: 'Sustainability Report: Implementing green energy across all assets',
    date: 'Sep 28, 2023',
    // Reliable Green Energy
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    category: 'Projects',
    title: 'Elegancia Marine secures major offshore contract',
    date: 'Sep 15, 2023',
    // Reliable Marine/Ship
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7dd8d36?auto=format&fit=crop&q=80&w=800',
  },
   {
    id: 5,
    category: 'Corporate',
    title: 'Expanding our footprint: New office opening in Riyadh',
    date: 'Aug 30, 2023',
    // Reliable Office Interior
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    category: 'Video',
    title: 'Highlights from the Annual General Assembly 2023',
    date: 'Aug 15, 2023',
    // Reliable Conference
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/'
  }
];

const categories = ['All', 'Corporate', 'Video', 'ESG', 'Projects'];

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const handleClick = () => {
    if (item.videoUrl) {
      window.open(item.videoUrl, '_blank');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={`group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${item.id === 1 ? 'md:col-span-2' : ''}`}
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${item.id === 1 ? 'h-64 md:h-80' : 'h-64'}`}>
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-estithmar-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-estithmar-navy rounded-md shadow-sm">
            {item.category}
          </span>
          {item.isVideo && (
             <span className="bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-md shadow-sm flex items-center gap-1">
               <Play className="w-3 h-3 fill-current" /> Video
             </span>
          )}
        </div>

        {/* Video Play Button Overlay */}
        {item.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/30">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col relative z-10 bg-white">
        <div className="flex items-center text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 gap-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-estithmar-gold" /> {item.date}
          </span>
        </div>

        <h3 className={`font-bold text-estithmar-navy mb-4 leading-snug group-hover:text-estithmar-gold transition-colors duration-300 ${item.id === 1 ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
          {item.title}
        </h3>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between group-hover:border-estithmar-gold/30 transition-colors">
          <span className="text-estithmar-navy font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
            {item.isVideo ? 'Watch Now' : 'Read Article'}
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-estithmar-gold group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FilterTab: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-colors duration-300 ${
      active ? 'text-estithmar-navy' : 'text-gray-400 hover:text-estithmar-navy'
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeFilter"
        className="absolute inset-0 bg-estithmar-gold rounded-full"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className="relative z-10">{label}</span>
  </button>
);

const InsightsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredNews = allNews.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section id="media" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-estithmar-gold/30 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-estithmar-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-estithmar-navy/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="mb-8 md:mb-0">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '3rem' }}
               viewport={{ once: true }}
               className="h-1 bg-estithmar-gold mb-4"
             />
             <motion.span 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-estithmar-navy font-bold tracking-widest uppercase text-sm block mb-2"
             >
               Media Center
             </motion.span>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-bold text-estithmar-navy"
             >
               Latest Insights
             </motion.h2>
          </div>

          {/* Filter Tabs */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex flex-wrap gap-2 bg-white p-1 rounded-full shadow-sm border border-gray-100"
          >
            {categories.map((cat) => (
              <FilterTab 
                key={cat} 
                label={cat} 
                active={activeCategory === cat} 
                onClick={() => setActiveCategory(cat)} 
              />
            ))}
          </motion.div>
        </div>

        {/* Dynamic Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#" 
            className="inline-flex items-center space-x-2 text-estithmar-navy font-bold uppercase tracking-widest text-sm hover:text-estithmar-gold transition-colors duration-300 border-b-2 border-estithmar-navy hover:border-estithmar-gold pb-1"
          >
            <span>View All News & Updates</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsGrid;