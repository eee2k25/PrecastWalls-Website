import React from 'react';
import { motion } from 'framer-motion';

interface ProcessProps {
  lang: string;
  t: any;
}

export function Process({ lang, t }: ProcessProps) {
  const steps = [
    {
      step: "01",
      title: lang === 'en' ? "Initial Consultation" : t.nav.expertise,
      description: "Reach out with your location and land dimensions. We discuss your specific security needs and boundary requirements."
    },
    {
      step: "02",
      title: lang === 'en' ? "Precision Site Survey" : "Site Measurement",
      description: "Our engineering team visits your site for exact perimeter measurements and soil assessment to ensure structural stability."
    },
    {
      step: "03",
      title: lang === 'en' ? "Custom Manufacturing" : "Factory Production",
      description: "Based on measurements, we cast your high-grade M30 concrete panels and high-tensile steel poles at our factory."
    },
    {
      step: "04",
      title: lang === 'en' ? "Rapid Site Assembly" : "Installation",
      description: "We transport materials using our fleet and execute precision installation using specialized machinery and expert labor."
    }
  ];

  return (
    <section id="process" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-blue-900 font-black tracking-[0.2em] uppercase text-xs mb-6">{t.process.title}</h2>
          <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8">{t.process.headline}</h3>
          <p className="text-xl text-slate-500 font-medium">
            We've optimized every step of the precast process to ensure maximum speed without ever compromising on structural integrity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="text-8xl font-black text-blue-900/5 absolute -top-10 -left-4 group-hover:text-blue-900/10 transition-colors">
                {step.step}
              </div>
              <div className="relative z-10">
                <div className="w-12 h-1 bg-blue-900 mb-8 rounded-full"></div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{step.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
