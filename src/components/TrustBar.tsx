import React from 'react';
import { CheckCircle2, Star, ShieldCheck, Zap } from 'lucide-react';

export function TrustBar() {
  const points = [
    { text: "M30 Concrete Grade", icon: ShieldCheck },
    { text: "150-Acre Govt Project", icon: Star },
    { text: "South India Service", icon: CheckCircle2 },
    { text: "Rapid 48h Execution", icon: Zap }
  ];

  return (
    <div className="bg-slate-50 border-y border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, i) => (
            <div key={i} className="flex items-center gap-4 justify-center">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-900">
                <point.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{point.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
