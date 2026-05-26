import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/919014386019" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-emerald-500 text-white p-5 rounded-3xl shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
    >
      <div className="absolute right-full mr-4 bg-white text-slate-900 px-6 py-3 rounded-2xl text-sm font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
        Direct Help on WhatsApp
      </div>
      <MessageCircle className="h-8 w-8" />
    </a>
  );
}
