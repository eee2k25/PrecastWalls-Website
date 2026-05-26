import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Features } from './components/Features';
import { Gallery } from './components/Gallery';
import { Process } from './components/Process';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toaster } from 'react-hot-toast';
import { Language, translations } from './lib/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      <Toaster position="top-right" />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero lang={lang} t={t} />
        <TrustBar />
        <Features lang={lang} t={t} />
        <Process lang={lang} t={t} />
        <Gallery lang={lang} t={t} />
        <ContactForm lang={lang} t={t} />
      </main>
      <Footer lang={lang} t={t} />
      <FloatingWhatsApp />
    </div>
  );
}
