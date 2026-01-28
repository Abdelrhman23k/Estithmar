import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Stethoscope, Palmtree, Utensils, Zap, X, AlertCircle, ArrowRight } from 'lucide-react';
import L from 'leaflet';

const GLOBAL_FALLBACK_IMAGE = "https://www.estithmarholding.com/assets/images/businesses/ventures/rixos/11.jpg";

// --- Types & Data ---

type SectorType = 'All' | 'Healthcare' | 'Ventures' | 'Services' | 'Contracting' | 'Industries' | 'Food';

interface Project {
  name: string;
  description: string;
}

interface LocationData {
  id: string;
  country: string;
  image: string; // Added image field
  coordinates: [number, number]; // [lng, lat] - Note: Leaflet uses [lat, lng]
  sectors: SectorType[];
  projects: Partial<Record<SectorType, Project[]>>;
  stats?: string;
}

const locations: LocationData[] = [
  {
    id: 'qatar',
    country: 'Qatar (HQ)',
    // Reliable Doha Skyline
    image: 'https://images.unsplash.com/photo-1595842858223-2895c276a61f?q=80&w=800&auto=format&fit=crop', 
    coordinates: [51.5310, 25.2854],
    sectors: ['Healthcare', 'Ventures', 'Services', 'Contracting', 'Industries', 'Food'],
    stats: "Operational HQ • 105 Companies",
    projects: {
      Healthcare: [{ name: "The View Hospital", description: "101,000 sqm facility affiliated with Cedars-Sinai." }, { name: "Korean Medical Center", description: "Advanced medical tourism facility." }],
      Ventures: [{ name: "Al Maha Island", description: "Featuring Lusail Winter Wonderland & Zuma." }, { name: "Katara Hills (LXR)", description: "Luxury resort properties." }],
      Services: [{ name: "Elegancia Catering", description: "250,000+ meals daily capacity." }],
      Food: [{ name: "Baladna Farms", description: "24,000 cow capacity, 100% fresh milk supply." }]
    }
  },
  {
    id: 'ksa',
    country: 'Saudi Arabia',
    // Reliable Riyadh
    image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=800&auto=format&fit=crop', 
    coordinates: [46.6753, 24.7136], // Riyadh
    sectors: ['Services', 'Contracting', 'Ventures'],
    stats: "2nd Largest Market • Mega-Projects",
    projects: {
      Services: [{ name: "Elegancia Arabia", description: "2,000+ employees serving PIF mega-projects." }],
      Contracting: [{ name: "Red Sea Projects", description: "MEP for Central Hotel (430 keys) & Faena Red Sea." }]
    }
  },
  {
    id: 'iraq',
    country: 'Iraq',
    // Reliable Generic Middle East / Architecture
    image: 'https://images.unsplash.com/photo-1569230516709-3112c37e192f?q=80&w=800&auto=format&fit=crop', 
    coordinates: [44.3661, 33.3152], // Baghdad
    sectors: ['Healthcare', 'Ventures', 'Services'],
    stats: "$7 Billion Investment Agreements",
    projects: {
      Healthcare: [{ name: "Rixos Baghdad", description: "Flagship hotel & residences (40% complete)." }, { name: "Al Imam Al Hassan Hospital", description: "600-bed teaching hospital in Karbala." }]
    }
  },
  {
    id: 'algeria',
    country: 'Algeria',
    // Reliable Architecture
    image: 'https://images.unsplash.com/photo-1565552621008-8e6dfd156708?q=80&w=800&auto=format&fit=crop', 
    coordinates: [3.0420, 36.7528], // Algiers (Representative)
    sectors: ['Healthcare', 'Food', 'Contracting'],
    stats: "Strategic North African Hub",
    projects: {
      Healthcare: [{ name: "Algerian Qatari German Hospital", description: "300-bed facility with FNI." }],
      Food: [{ name: "Integrated Dairy Project", description: "World's largest dairy farm (Adrar/Djelfa)." }]
    }
  },
  {
    id: 'egypt',
    country: 'Egypt',
    // Reliable Pyramids
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=800&auto=format&fit=crop', 
    coordinates: [31.2357, 30.0444], // Cairo
    sectors: ['Food'],
    stats: "FMCG Market Entry",
    projects: {
      Food: [{ name: "Baladna Expansion", description: "$1.5B MoU for dairy infrastructure." }, { name: "Juhayna", description: "15% Strategic ownership stake." }]
    }
  },
  {
    id: 'maldives',
    country: 'Maldives',
    // Reliable Maldives
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop', 
    coordinates: [73.5093, 4.1755], // Male
    sectors: ['Ventures', 'Contracting'],
    stats: "Luxury Hospitality Development",
    projects: {
      Ventures: [{ name: "Rosewood Maldives", description: "Ultra-luxury resort at Ranfaru." }]
    }
  },
  {
    id: 'libya',
    country: 'Libya',
    // Reliable Mediterranean Coast
    image: 'https://images.unsplash.com/photo-1589828876116-f33100657a8d?q=80&w=800&auto=format&fit=crop', 
    coordinates: [15.0925, 32.3754], // Misrata
    sectors: ['Healthcare', 'Services'],
    projects: {
      Healthcare: [{ name: "Misrata Hospital", description: "Center for cardiovascular disease & surgery." }]
    }
  },
  {
    id: 'jordan',
    country: 'Jordan',
    // Reliable Petra
    image: 'https://images.unsplash.com/photo-1532588304928-8d41cb2b8535?q=80&w=800&auto=format&fit=crop', 
    coordinates: [35.9284, 31.9454], // Amman
    sectors: ['Services'],
    projects: {
      Services: [{ name: "Service Delivery", description: "Localized facility management operations." }]
    }
  },
  {
    id: 'kazakhstan',
    country: 'Kazakhstan',
    // Reliable Modern Architecture
    image: 'https://images.unsplash.com/photo-1558588942-930faae5a389?q=80&w=800&auto=format&fit=crop', 
    coordinates: [71.4491, 51.1694], // Astana
    sectors: ['Healthcare', 'Services'],
    stats: "Emerging Market",
    projects: {
      Healthcare: [{ name: "Exploratory MoUs", description: "Healthcare & Hospitality development." }]
    }
  }
];

const filters: { id: SectorType; label: string; icon: React.ElementType }[] = [
  { id: 'All', label: 'Global View', icon: MapPin },
  { id: 'Healthcare', label: 'Apex Health', icon: Stethoscope },
  { id: 'Ventures', label: 'Ventures', icon: Palmtree },
  { id: 'Services', label: 'Services', icon: Utensils },
  { id: 'Contracting', label: 'Contracting', icon: Zap },
  { id: 'Food', label: 'Baladna', icon: Building2 },
];

const LocationOverlay: React.FC<{ location: LocationData; filter: SectorType; onClose: () => void }> = ({ location, filter, onClose }) => {
  const relevantProjects = filter === 'All' 
    ? Object.values(location.projects).flat() 
    : location.projects[filter] || [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute top-4 right-4 w-[90%] md:w-[380px] max-h-[calc(100%-2rem)] bg-estithmar-navy/60 backdrop-blur-xl rounded-2xl z-50 flex flex-col pointer-events-auto overflow-hidden shadow-2xl"
    >
      {/* Header Image Area */}
      <div className="relative h-48 w-full shrink-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={location.image} 
          alt={location.country} 
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = GLOBAL_FALLBACK_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-estithmar-navy/90 via-estithmar-navy/30 to-transparent" />
        
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 bg-black/20 hover:bg-white/20 text-white p-1.5 rounded-full backdrop-blur-md transition-colors z-50"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 left-6 right-6">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
             <h3 className="text-2xl font-bold text-white mb-1 leading-none drop-shadow-md">{location.country}</h3>
             {location.stats && (
              <p className="text-estithmar-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {location.stats}
              </p>
            )}
           </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gradient-to-b from-estithmar-navy/90 to-estithmar-navy/80">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            {/* Fixed Error: removed text content from className */}
            <span className="text-[10px] font-bold text-estithmar-gold uppercase tracking-widest">Active Projects</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="space-y-3">
            {relevantProjects.length > 0 ? (
              relevantProjects.map((proj, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.05) }}
                  className="group bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white font-bold text-sm pr-4">{proj.name}</h4>
                    <ArrowRight className="w-3 h-3 text-estithmar-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all shrink-0 mt-1" />
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">{proj.description}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-xs italic border-l-2 border-white/10 pl-3 py-1">
                No active major projects currently listed for this sector in {location.country}.
              </p>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Bottom */}
      <div className="p-3 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono uppercase tracking-wider">
           <span>Lat: {location.coordinates[1].toFixed(4)} | Lng: {location.coordinates[0].toFixed(4)}</span>
        </div>
      </div>
    </motion.div>
  );
};

const GlobalPresence: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const linesRef = useRef<L.Polyline[]>([]);
  
  const [activeFilter, setActiveFilter] = useState<SectorType>('All');
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null);
  const [mapError, setMapError] = useState<boolean>(false);

  const filteredLocations = locations.filter(loc => 
    activeFilter === 'All' || loc.sectors.includes(activeFilter)
  );

  const selectedLocation = locations.find(l => l.id === selectedLocId);

  // Initialize Map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    try {
      // Initialize Leaflet Map
      // @ts-ignore
      const mapInstance = L.map(mapContainer.current, {
        center: [25, 45], // Lat, Lng (Middle East approx)
        zoom: 2.5,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true // Ensure dragging is enabled
      });

      // CartoDB Light Tiles (Inverted via CSS for Navy Style)
      // @ts-ignore
      L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        className: 'estithmar-map-tiles'
      }).addTo(mapInstance);

      map.current = mapInstance;

    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(true);
    }

    return () => {
      try {
        map.current?.remove();
      } catch(e) { /* ignore cleanup errors */ }
      map.current = null;
    };
  }, []);

  // Update Markers and Lines
  useEffect(() => {
    if (!map.current || mapError) return;

    // 1. Manage Markers
    locations.forEach((loc) => {
      // Leaflet uses [Lat, Lng], data is [Lng, Lat]
      const latLng: [number, number] = [loc.coordinates[1], loc.coordinates[0]];
      const isVisible = activeFilter === 'All' || loc.sectors.includes(activeFilter);
      const isActive = selectedLocId === loc.id;
      
      // Create Marker if not exists
      if (!markersRef.current[loc.id]) {
        // @ts-ignore
        const icon = L.divIcon({
          className: 'bg-transparent border-none', // Ensure standard border doesn't appear
          html: `
            <div class="relative flex items-center justify-center w-full h-full cursor-pointer group">
              <div id="pulse-${loc.id}" class="absolute w-full h-full rounded-full bg-estithmar-gold opacity-30 transition-all duration-500 scale-0"></div>
              <div id="dot-${loc.id}" class="absolute w-3 h-3 rounded-full border-2 border-estithmar-navy bg-white transition-colors duration-300 z-10"></div>
              <div id="label-${loc.id}" class="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-300 pointer-events-none z-20">
                <span class="bg-estithmar-navy/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md uppercase tracking-wide border border-white/10 shadow-xl">
                  ${loc.country}
                </span>
              </div>
            </div>
          `,
          iconSize: [40, 40], // EXPANDED HIT BOX to ensure clicks are registered
          iconAnchor: [20, 20] // Centered
        });

        // @ts-ignore
        const marker = L.marker(latLng, { icon }).on('click', (e) => {
          L.DomEvent.stopPropagation(e); // Prevent map click
          setSelectedLocId(loc.id);
          // @ts-ignore
          map.current?.flyTo(latLng, 5, { duration: 1.5 });
        });
        
        markersRef.current[loc.id] = marker;
      }

      const marker = markersRef.current[loc.id];
      
      if (isVisible) {
        if (!map.current.hasLayer(marker)) {
          marker.addTo(map.current);
        }

        // Update active styling by manipulating the DOM elements
        const pulse = document.getElementById(`pulse-${loc.id}`);
        const dot = document.getElementById(`dot-${loc.id}`);
        const label = document.getElementById(`label-${loc.id}`);

        if (pulse && dot && label) {
          if (isActive) {
             pulse.style.transform = 'scale(1)';
             pulse.style.opacity = '0.4';
             pulse.classList.add('animate-pulse');
             dot.style.backgroundColor = '#D4AF37'; // gold
             dot.style.transform = 'scale(1.2)';
             label.style.opacity = '1';
             label.style.transform = 'translate(-50%, 0)';
          } else {
             pulse.style.transform = 'scale(0)';
             pulse.style.opacity = '0';
             pulse.classList.remove('animate-pulse');
             dot.style.backgroundColor = 'white';
             dot.style.transform = 'scale(1)';
             label.style.opacity = '0';
             label.style.transform = 'translate(-50%, -5px)';
          }
        }
        
        // Ensure z-index is top for active marker
        marker.setZIndexOffset(isActive ? 1000 : 0);

      } else {
        if (map.current.hasLayer(marker)) {
          marker.removeFrom(map.current);
        }
      }
    });

    // 2. Manage Lines (Polylines)
    // Clear old lines
    linesRef.current.forEach(line => line.removeFrom(map.current!));
    linesRef.current = [];

    if (activeFilter !== 'All') {
      const qatarLoc = locations.find(x => x.id === 'qatar');
      if (qatarLoc) {
        const qatarLatLng: [number, number] = [qatarLoc.coordinates[1], qatarLoc.coordinates[0]];
        
        filteredLocations.forEach(loc => {
           if (loc.id !== 'qatar') {
              const targetLatLng: [number, number] = [loc.coordinates[1], loc.coordinates[0]];
              
              // @ts-ignore
              const line = L.polyline([qatarLatLng, targetLatLng], {
                color: '#D4AF37',
                weight: 1.5,
                opacity: 0.3,
                dashArray: '4, 8',
                lineCap: 'round',
                interactive: false // Line should not be clickable
              }).addTo(map.current!);
              
              linesRef.current.push(line);
           }
        });
      }
    }

  }, [activeFilter, selectedLocId, mapError]);

  return (
    <section id="global" className="bg-estithmar-dark py-24 relative overflow-hidden flex flex-col min-h-[900px]">
      <style>{`
        .estithmar-map-tiles {
          filter: invert(100%) sepia(100%) hue-rotate(180deg) saturate(150%) brightness(0.9) contrast(1.1);
        }
      `}</style>
      
      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-10">
           <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-estithmar-gold font-bold tracking-widest uppercase text-sm block mb-2"
           >
             9 Countries • 105 Companies
           </motion.span>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl font-bold text-white"
           >
             Global Footprint
           </motion.h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id); setSelectedLocId(null); 
                  if (!mapError) {
                    // @ts-ignore
                    map.current?.flyTo([25, 45], 2.5);
                  }
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300
                  ${isActive 
                    ? 'bg-estithmar-gold text-estithmar-navy border-estithmar-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <f.icon className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wide">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Map Container - Height adjusted for mobile */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#051232]">
          
          {!mapError ? (
            <div ref={mapContainer} className="w-full h-[400px] md:h-[600px] z-0" />
          ) : (
            <div className="w-full h-[400px] md:h-[600px] bg-[#051232] flex flex-col items-center justify-center text-center p-8">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Map Unavailable</h3>
              <p className="text-gray-400">Unable to load the interactive map in this environment.</p>
            </div>
          )}
          
          {/* Overlay Gradients for Cinematic Look */}
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-estithmar-dark/80 z-10" />
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-estithmar-dark/50 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-estithmar-dark/50 to-transparent pointer-events-none z-10" />

          {/* Overlay Content Panel */}
          <AnimatePresence>
            {selectedLocation && (
              <LocationOverlay 
                key={selectedLocation.id}
                location={selectedLocation} 
                filter={activeFilter} 
                onClose={() => {
                  setSelectedLocId(null);
                  if (!mapError) {
                    // @ts-ignore
                    map.current?.flyTo([25, 45], 2.5);
                  }
                }} 
              />
            )}
          </AnimatePresence>

          {/* Hint */}
          {!selectedLocation && !mapError && (
            <div className="absolute bottom-6 left-6 text-white/40 text-xs uppercase tracking-widest font-mono pointer-events-none z-20 bg-black/40 px-3 py-1 rounded backdrop-blur-sm">
              Select a location to explore
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;