import React, { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Building2, Users, Globe2, Briefcase } from 'lucide-react';

const stats = [
  { label: 'Companies', value: 105, icon: Building2 },
  { label: 'Strategic Sectors', value: 4, icon: Briefcase },
  { label: 'Countries', value: 9, icon: Globe2 },
  { label: 'Employees', value: 28000, suffix: '+', icon: Users },
];

const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 50,
    duration: 1.5
  });

  React.useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, springValue, value]);

  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  );

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-estithmar-navy flex items-center justify-center">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

const ImpactBar: React.FC = () => {
  return (
    <section className="bg-white py-20 relative z-20 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center group"
            >
              <div className="mb-4 p-4 rounded-full bg-gray-50 group-hover:bg-estithmar-gold/10 transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-estithmar-gold" strokeWidth={1.5} />
              </div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-gray-500 font-medium uppercase tracking-wide text-sm mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactBar;