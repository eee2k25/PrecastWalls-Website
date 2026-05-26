import React from 'react';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  lang: string;
  t: any;
}

export function Footer({ lang, t }: FooterProps) {
  const phoneNumber = "9014386019";
  const email1 = "tagilimallesh5@gmail.com";
  const email2 = "mekganesh6@gmail.com";

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-900 p-2.5 rounded-xl">
                <Building2 className="text-white h-7 w-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{t.brand}</span>
                <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">{t.subtitle}</span>
              </div>
            </div>
            <p className="text-lg text-slate-500 max-w-md leading-relaxed mb-10">
              {t.footer.desc}
            </p>
            <div className="space-y-4">
              <a href={`mailto:${email1}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-900 font-medium">
                <Mail className="h-5 w-5 text-blue-900" />
                {email1}
              </a>
              <a href={`mailto:${email2}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-900 font-medium">
                <Mail className="h-5 w-5 text-blue-900" />
                {email2}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-8">{t.footer.links}</h4>
            <ul className="space-y-5 text-slate-500 font-bold">
              <li><a href="#features" className="hover:text-blue-900 transition-colors">{t.nav.expertise}</a></li>
              <li><a href="#process" className="hover:text-blue-900 transition-colors">{t.nav.workflow}</a></li>
              <li><a href="#gallery" className="hover:text-blue-900 transition-colors">{t.nav.portfolio}</a></li>
              <li><a href="#contact" className="hover:text-blue-900 transition-colors">{t.nav.book}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-8">{t.footer.contact}</h4>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Call Us</p>
                    <p className="font-bold text-slate-900">{phoneNumber}</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Service Area</p>
                    <p className="font-bold text-slate-900 text-sm">Across South India</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 text-center">
          <p className="text-slate-400 text-sm font-medium">© {new Date().getFullYear()} {t.brand} {t.subtitle}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
