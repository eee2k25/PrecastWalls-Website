import React from 'react';
import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1541913054-2833587ee60c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1590633743993-47267d3f4534?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800"
];

export function RecentWorksSlider() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <motion.div 
        className="flex gap-4 w-max"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} className="w-72 h-48 rounded-2xl overflow-hidden shadow-md shrink-0 border border-gray-100">
            <img src={src} alt="Recent Work" className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
}
