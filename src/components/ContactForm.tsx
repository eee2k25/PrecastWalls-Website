import React, { useState } from 'react';
import { Send, Phone, Mail, Globe, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactFormProps {
  lang: string;
  t: any;
}

export function ContactForm({ lang, t }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    land_size: '',
    project_type: 'Individual Plot'
  });

  const phoneNumber = "9014386019";
  const email1 = "tagilimallesh5@gmail.com";
  const email2 = "mekganesh6@gmail.com";
  const mapLink = "https://maps.app.goo.gl/J4XGPpWChiZeW77t7";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Success! Redirecting to WhatsApp...");
        
        const message = `*New Site Visit Request*%0A` +
          `*Name:* ${formData.name}%0A` +
          `*Phone:* ${formData.phone}%0A` +
          `*Location:* ${formData.location}%0A` +
          `*Land Size:* ${formData.land_size}%0A` +
          `*Project:* ${formData.project_type}`;
        
        // Use window.location.href instead of window.open to avoid popup blockers
        const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${message}`;
        
        setTimeout(() => {
          window.location.href = whatsappUrl;
        }, 1500);

        setFormData({
          name: '',
          phone: '',
          location: '',
          land_size: '',
          project_type: 'Individual Plot'
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-20 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-yellow-500 font-black tracking-[0.2em] uppercase text-xs mb-6">{t.contact.title}</h2>
                <h3 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">{t.contact.headline}</h3>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-500 uppercase mb-1">Direct Line</p>
                      <p className="text-xl font-bold">{phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-500 uppercase mb-1">Our Location</p>
                      <a href={mapLink} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-blue-400 flex items-center gap-2">
                        View on Google Maps
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] overflow-hidden h-64 w-full border border-white/10 shadow-2xl mb-8">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3801.328373111409!2d78.58784707517174!3d17.681944383253733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDQwJzU1LjAiTiA3OMKwMzUnMjUuNSJF!5e0!3m2!1sen!2sin!4v1740039868770!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              
              <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                <a href={`mailto:${email1}`} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-2xl font-bold transition-all">
                  <Mail className="h-5 w-5" />
                  Email Team
                </a>
                <a href={`https://wa.me/91${phoneNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-2xl font-bold transition-all">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-white p-12 lg:p-20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-3">{t.contact.form.name}</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-900 outline-none transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-3">{t.contact.form.phone}</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="90143XXXXX"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-900 outline-none transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-3">{t.contact.form.location}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="Village, District or Maps Link"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-900 outline-none transition-all font-bold placeholder:text-slate-300"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-3">{t.contact.form.size}</label>
                    <input 
                      type="text" 
                      required
                      value={formData.land_size}
                      onChange={e => setFormData({...formData, land_size: e.target.value})}
                      placeholder="e.g. 5 Acres"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-900 outline-none transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-3">{t.contact.form.type}</label>
                    <select 
                      value={formData.project_type}
                      onChange={e => setFormData({...formData, project_type: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-900 outline-none transition-all font-bold"
                    >
                      <option>Individual Plot</option>
                      <option>Agricultural Farm</option>
                      <option>Commercial/Industrial</option>
                      <option>Solar Farm</option>
                      <option>Government Project</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-blue-900 hover:bg-slate-900 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 disabled:opacity-70 text-lg uppercase tracking-widest"
                >
                  {submitting ? "Sending..." : (
                    <>
                      {t.contact.form.submit}
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
