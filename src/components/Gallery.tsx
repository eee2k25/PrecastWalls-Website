import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
}

interface GalleryProps {
  lang: string;
  t: any;
}

export function Gallery({ lang, t }: GalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Factory', 'Assembly', 'Agricultural', 'Commercial'];

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredItems = activeFilter === 'All' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-blue-900 font-black tracking-[0.2em] uppercase text-xs mb-6">{t.nav.portfolio}</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Visual Proof of Industrial Excellence.</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  activeFilter === cat 
                    ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/20' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-[4/3] bg-slate-50 rounded-[2.5rem]"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-slate-50 border border-gray-100"
                >
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-2">{item.category}</p>
                    <p className="text-2xl font-black text-white">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
