import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, TrendingUp, TrendingDown, Clock, Activity, ArrowUpRight, DollarSign, BarChart3 } from 'lucide-react';
import { StockDataPoint, TimeRange } from '../types';

// --- Data Generation Helpers ---

const generateData = (points: number, startPrice: number, volatility: number = 0.02): StockDataPoint[] => {
  const data: StockDataPoint[] = [];
  let currentPrice = startPrice;
  const now = new Date();
  
  for (let i = 0; i < points; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (points - 1 - i));
    
    // Random walk with trend
    const change = (Math.random() - 0.45) * volatility; 
    currentPrice = currentPrice * (1 + change);
    
    data.push({
      date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      price: Number(currentPrice.toFixed(2))
    });
  }
  return data;
};

const dataSets = {
  [TimeRange.WEEK]: generateData(20, 2.35, 0.015),
  [TimeRange.MONTH]: generateData(40, 2.20, 0.02),
  [TimeRange.QUARTER]: generateData(90, 1.95, 0.03),
  [TimeRange.YEAR]: generateData(120, 1.60, 0.05),
};

// --- Sub-Components ---

const LiveTradeTicker = () => {
  const [trades, setTrades] = useState<{ id: number; time: string; volume: number; type: 'buy' | 'sell' }[]>([]);

  useEffect(() => {
    // Initial population
    const initialTrades = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() - i * 1000,
      time: new Date(Date.now() - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      volume: Math.floor(Math.random() * 5000) + 100,
      type: Math.random() > 0.4 ? 'buy' : 'sell' as 'buy' | 'sell'
    }));
    setTrades(initialTrades);

    const interval = setInterval(() => {
      const newTrade = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        volume: Math.floor(Math.random() * 8000) + 500,
        type: Math.random() > 0.4 ? 'buy' : 'sell' as 'buy' | 'sell'
      };
      
      setTrades(prev => [newTrade, ...prev].slice(0, 5));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-estithmar-gold flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Order Book
        </span>
      </div>
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {trades.map((trade) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between items-center text-xs"
            >
              <span className="text-gray-500 font-mono">{trade.time}</span>
              <span className="text-gray-300">{trade.volume.toLocaleString()} Vol</span>
              <span className={`font-bold ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                {trade.type === 'buy' ? 'BUY' : 'SELL'}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-estithmar-gold/50 transition-colors group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon className="w-12 h-12 text-white" />
    </div>
    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{label}</div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs text-estithmar-gold/80 font-medium flex items-center">
       {sub}
    </div>
    {/* Mini Sparkline Background Effect */}
    <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 L 20 60 L 40 80 L 60 40 L 80 50 L 100 20 V 100 H 0 Z" fill="currentColor" className="text-estithmar-gold" />
      </svg>
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-estithmar-dark/95 backdrop-blur-md border border-estithmar-gold p-4 rounded-lg shadow-2xl">
        <p className="text-gray-400 text-xs font-mono mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-estithmar-gold font-bold text-2xl">QAR {payload[0].value}</span>
        </div>
        <div className="text-[10px] text-green-400 mt-1 flex items-center">
          <Activity className="w-3 h-3 mr-1" /> Real-time Valuation
        </div>
      </div>
    );
  }
  return null;
};

// --- Main Component ---

const InvestorRadar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TimeRange>(TimeRange.WEEK);
  const [hoveredData, setHoveredData] = useState<number | null>(null);

  const currentData = useMemo(() => dataSets[activeTab], [activeTab]);
  const latestPrice = currentData[currentData.length - 1].price;
  const lastDate = currentData[currentData.length - 1].date;

  return (
    <section id="investors" className="bg-estithmar-navy text-white py-24 relative overflow-hidden">
      {/* Animated Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.08),transparent_50%)] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(10,36,99,0.4),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              className="h-1 bg-estithmar-gold mb-6"
            />
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Investor <span className="text-transparent bg-clip-text bg-gradient-to-r from-estithmar-gold to-white">Radar</span>
            </motion.h2>
            <p className="text-gray-400 text-lg">
              Real-time financial intelligence. Track our performance, analyze market movements, and download comprehensive reports.
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-8 md:mt-0">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold hidden md:block">
              Market Status: <span className="text-green-400">Open</span>
            </span>
             <button className="flex items-center justify-center gap-2 bg-estithmar-gold text-estithmar-navy px-6 py-3 rounded font-bold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <Download className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wide">IR Kit</span>
              </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Metrics & Live Feed */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <StatCard 
              label="Current Share Price" 
              value={`QAR ${latestPrice.toFixed(2)}`}
              sub={<><TrendingUp className="w-3 h-3 mr-1 text-green-400" /> <span className="text-green-400">+1.24%</span> <span className="ml-1 text-gray-500">Today</span></>}
              icon={DollarSign}
              delay={0.1}
            />
            
            <StatCard 
              label="Market Capitalization" 
              value="8.2B"
              sub={<><span className="text-white">QAR</span> <span className="mx-2 text-gray-600">|</span> <span className="text-gray-400">Rank #12 (QSE)</span></>}
              icon={BarChart3}
              delay={0.2}
            />

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
            >
              <LiveTradeTicker />
            </motion.div>
          </div>

          {/* Right Panel: Interactive Chart */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-estithmar-dark/50 p-1 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl h-full flex flex-col"
            >
              {/* Chart Controls */}
              <div className="flex flex-wrap items-center justify-between p-6 border-b border-white/5 bg-white/[0.02] rounded-t-xl">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                  <div className="w-2 h-2 bg-estithmar-gold rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-white tracking-wide">ESTITHMAR</span>
                  <span className="text-xs text-gray-500 font-mono">QSE: IGRD</span>
                </div>
                
                <div className="bg-black/40 p-1 rounded-lg flex space-x-1">
                  {Object.values(TimeRange).map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveTab(range)}
                      className="relative px-4 py-1.5 text-xs font-bold rounded-md transition-colors z-10"
                    >
                      {activeTab === range && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white/10 rounded-md"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className={activeTab === range ? 'text-estithmar-gold' : 'text-gray-400 hover:text-white'}>
                        {range}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Area */}
              <div className="flex-1 p-6 min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                      <filter id="glow" height="130%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
                        <feOffset dx="0" dy="0" result="offsetblur"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.5"/>
                        </feComponentTransfer>
                        <feMerge> 
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/> 
                        </feMerge>
                      </filter>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="#4b5563" 
                      tick={{fill: '#6b7280', fontSize: 11}}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={40}
                      dy={10}
                    />
                    <YAxis 
                      domain={['auto', 'auto']} 
                      stroke="#4b5563"
                      tick={{fill: '#6b7280', fontSize: 11}}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.toFixed(2)}
                      dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#D4AF37', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#D4AF37" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                      filter="url(#glow)"
                      animationDuration={1500}
                    />
                    {/* The Pulsing Dot at the end */}
                    <ReferenceDot 
                      x={lastDate} 
                      y={latestPrice} 
                      r={6} 
                      fill="#D4AF37" 
                      stroke="white" 
                      strokeWidth={2}
                    >
                      <animate attributeName="r" from="6" to="10" dur="1.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" from="1" to="0.5" dur="1.5s" repeatCount="indefinite"/>
                    </ReferenceDot>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorRadar;
