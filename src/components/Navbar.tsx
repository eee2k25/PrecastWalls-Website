import React, { useState } from 'react';
import { Phone, Building2, Menu, X, Mail, Globe } from 'lucide-react';
import { Language } from '../lib/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

export function Navbar({ lang, setLang, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const navLinks = [
    { name: t.nav.expertise, href: '#features' },
    { name: t.nav.workflow, href: '#process' },
    { name: t.nav.portfolio, href: '#gallery' },
  ];

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
  ];

  const phoneNumber = "9014386019";
  const email1 = "tagilimallesh5@gmail.com";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-3">
            <div className="bg-blue-900 p-2.5 rounded-xl shadow-lg shadow-blue-900/20">
              <Building2 className="text-white h-7 w-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">{t.brand}</span>
              <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">{t.subtitle}</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-500">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-blue-900 transition-colors">{link.name}</a>
            ))}
            
            <div className="relative">
              <button 
                onClick={() => setShowLang(!showLang)}
                className="flex items-center gap-2 text-slate-900 bg-slate-50 px-3 py-2 rounded-xl border border-gray-100 hover:bg-slate-100 transition-all"
              >
                <Globe className="h-4 w-4 text-blue-900" />
                {languages.find(l => l.code === lang)?.name}
              </button>
              {showLang && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden min-w-[150px]">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLang(false); }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold hover:bg-blue-50 hover:text-blue-900 transition-colors ${lang === l.code ? 'bg-blue-50 text-blue-900' : 'text-slate-600'}`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-gray-200"></div>
            <a href={`tel:+91${phoneNumber}`} className="flex items-center gap-2 text-slate-900">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Phone className="h-4 w-4 text-blue-900" />
              </div>
              {phoneNumber}
            </a>
            <a href="#contact" className="bg-slate-900 text-white px-7 py-3.5 rounded-xl hover:bg-blue-900 transition-all shadow-xl shadow-slate-900/10">
              {t.nav.book}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
             <button 
               onClick={() => setShowLang(!showLang)}
               className="p-3 bg-blue-50 rounded-xl text-blue-900"
             >
                <Globe className="h-5 w-5" />
             </button>
             <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 bg-gray-50 rounded-xl text-slate-900"
             >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 p-6 space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block text-lg font-bold text-slate-900 hover:text-blue-900"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <a href={`tel:+91${phoneNumber}`} className="flex items-center gap-3 text-lg font-bold text-slate-900">
              <Phone className="h-5 w-5 text-blue-900" />
              {phoneNumber}
            </a>
            <a href={`mailto:${email1}`} className="flex items-center gap-3 text-lg font-bold text-slate-900">
              <Mail className="h-5 w-5 text-blue-900" />
              Email Us
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="block w-full bg-blue-900 text-white text-center py-4 rounded-2xl font-bold"
            >
              {t.nav.book}
            </a>
          </div>
        </div>
      )}

      {/* Mobile Language Menu */}
      {showLang && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end">
          <div className="w-full bg-white rounded-t-[3rem] p-8 space-y-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-black text-slate-900">Select Language</h4>
              <button onClick={() => setShowLang(false)} className="p-2 bg-slate-100 rounded-full"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setShowLang(false); }}
                  className={`px-6 py-4 rounded-2xl font-bold text-center transition-all ${lang === l.code ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/20' : 'bg-slate-50 text-slate-600'}`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
