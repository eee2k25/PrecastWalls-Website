import React from 'react';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { RecentWorksSlider } from './RecentWorksSlider';

interface HeroProps {
  lang: string;
  t: any;
}

export function Hero({ lang, t }: HeroProps) {
  const phoneNumber = "9014386019";
  const email1 = "tagilimallesh5@gmail.com";

  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>{t.hero.tagline}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
              {t.hero.title.split(' ').slice(0, 2).join(' ')} <br/>
              <span className="text-blue-900">{t.hero.title.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
              {t.hero.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-blue-900/30 group">
                {t.hero.cta_book}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`https://wa.me/91${phoneNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-700 px-8 py-5 rounded-2xl font-bold text-lg transition-all">
                  <MessageCircle className="h-5 w-5 text-emerald-500" />
                  {t.hero.cta_whatsapp}
                </a>
                <a href={`mailto:${email1}`} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-blue-900 hover:text-blue-900 text-slate-700 px-8 py-5 rounded-2xl font-bold text-lg transition-all">
                  <Mail className="h-5 w-5 text-blue-900" />
                  {t.hero.cta_email}
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                   <img src="https://images.unsplash.com/photo-1541913054-2833587ee60c?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg w-full aspect-[3/4] object-cover" alt="Wall 1" />
                   <div className="bg-blue-900 p-8 rounded-3xl text-white">
                      <p className="text-4xl font-black mb-1">150+</p>
                      <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Acres Secured</p>
                   </div>
                </div>
                <div className="space-y-4 pt-12">
                   <div className="bg-orange-500 p-8 rounded-3xl text-white">
                      <p className="text-4xl font-black mb-1">24h</p>
                      <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Response</p>
                   </div>
                   <img src="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg w-full aspect-[3/4] object-cover" alt="Wall 2" />
                </div>
             </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-[0.2em]">Recent Completed Works</h3>
            <a href="#gallery" className="text-blue-900 font-bold hover:underline">View All Projects</a>
          </div>
          <RecentWorksSlider />
        </div>
      </div>
    </section>
  );
}
