import React from 'react';
import { Factory, Shield, Zap, Award, CheckCircle2 } from 'lucide-react';

interface FeaturesProps {
  lang: string;
  t: any;
}

export function Features({ lang, t }: FeaturesProps) {
  const features = [
    {
      title: lang === 'en' ? "Bulk In-House Manufacturing" : t.features.title,
      description: lang === 'en' ? "Our facility in Hyderabad produces high-strength precast panels and poles at scale. By controlling the raw materials, we ensure M30+ concrete grade and high-tensile steel reinforcement." : t.features.desc,
      icon: Factory,
      color: "bg-blue-50 text-blue-900"
    },
    {
      title: lang === 'en' ? "South India Service Network" : "South India Coverage",
      description: lang === 'en' ? "Equipped with our own fleet of heavy-duty transport vehicles, we deliver and install across Telangana, Andhra Pradesh, Karnataka, and Tamil Nadu." : "We deliver and install across all major South Indian states.",
      icon: Shield,
      color: "bg-blue-50 text-blue-900"
    },
    {
      title: lang === 'en' ? "Rapid 48-Hour Execution" : "Fast Installation",
      description: lang === 'en' ? "While brick walls take weeks, our expert labor force can install up to 500 running feet of precast wall in a single day, saving you time and labor costs." : "Save time and costs with our rapid assembly process.",
      icon: Zap,
      color: "bg-blue-50 text-blue-900"
    }
  ];

  const milestones = [
    "Completed 150-Acre Govt Boundary Project",
    "Secured 10-Acre Solar Farm (In Progress)",
    "Trusted by 500+ Individual Plot Owners",
    "M30 Concrete Grade & High-Tensile Steel",
    "No Maintenance Required for 30+ Years",
    "Relocatable & Reusable Wall Panels"
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <h2 className="text-blue-900 font-black tracking-[0.2em] uppercase text-xs mb-6">{t.features.title}</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">{t.features.headline}</h3>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
              {t.features.desc}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
               {milestones.map((m, i) => (
                 <div key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    {m}
                 </div>
               ))}
            </div>
          </div>
          <div className="grid gap-6">
            {features.map((feature, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-2xl transition-all group border border-transparent hover:border-gray-100">
                <div className="flex gap-6">
                   <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                     <feature.icon className="h-8 w-8" />
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h4>
                      <p className="text-slate-500 leading-relaxed font-medium">
                        {feature.description}
                      </p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-10">
              <Award className="w-64 h-64" />
           </div>
           <div className="relative z-10 max-w-3xl">
              <h4 className="text-yellow-400 font-black tracking-[0.2em] uppercase text-xs mb-6">Major Milestone</h4>
              <h5 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">The 150-Acre Government Contract.</h5>
              <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
                We successfully secured a massive 150-acre government land parcel with our high-grade precast walls. This project demanded extreme durability, precision, and a rapid timeline—all of which were delivered ahead of schedule.
              </p>
              <div className="flex gap-8">
                 <div>
                    <p className="text-3xl font-black mb-1">150,000+</p>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">Running Feet</p>
                 </div>
                 <div className="w-px h-12 bg-white/20"></div>
                 <div>
                    <p className="text-3xl font-black mb-1">45 Days</p>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">Completion Time</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
