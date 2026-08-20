import { useState } from "react";
import toast from "react-hot-toast";
import { Caption, TextInput, SelectBox, Alert } from "../components/widgets";
import { COMPANY } from "../lib/company";
import { PROJECT_TYPES } from "../lib/data";
import type { TDict } from "../lib/i18n";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

export function ContactPage({ t }: { t: TDict }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    land_size: "",
    project_type: PROJECT_TYPES[0] as string,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(t.contact.success);
        const message =
          `*New Site Visit Request*%0A` +
          `*Name:* ${form.name}%0A` +
          `*Phone:* ${form.phone}%0A` +
          `*Location:* ${form.location}%0A` +
          `*Land Size:* ${form.land_size}%0A` +
          `*Project:* ${form.project_type}`;
        setTimeout(() => {
          window.location.href = `${COMPANY.whatsapp}?text=${message}`;
        }, 1200);
        setForm({
          name: "",
          phone: "",
          location: "",
          land_size: "",
          project_type: PROJECT_TYPES[0],
        });
      } else {
        throw new Error("fail");
      }
    } catch {
      toast.error(t.contact.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-[2.15rem] font-bold tracking-tight mb-2">
        {t.contact.title}
      </h1>
      <Caption>{t.contact.caption}</Caption>

      <div className="grid lg:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-st-border p-5 bg-white"
        >
          <TextInput
            label={t.contact.name}
            value={form.name}
            required
            placeholder={t.contact.namePh}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <TextInput
            label={t.contact.phone}
            type="tel"
            value={form.phone}
            required
            placeholder={t.contact.phonePh}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <TextInput
            label={t.contact.location}
            value={form.location}
            required
            placeholder={t.contact.locPh}
            onChange={(v) => setForm({ ...form, location: v })}
          />
          <TextInput
            label={t.contact.size}
            value={form.land_size}
            required
            placeholder={t.contact.sizePh}
            onChange={(v) => setForm({ ...form, land_size: v })}
          />
          <SelectBox
            label={t.contact.type}
            value={form.project_type}
            onChange={(v) => setForm({ ...form, project_type: v })}
            options={PROJECT_TYPES.map((p) => ({ value: p, label: p }))}
          />
          <button className="st-btn w-full mt-2" disabled={submitting}>
            {submitting ? t.contact.sending : t.contact.submit}
          </button>
        </form>

        <div className="space-y-4">
          <Alert kind="info">
            {COMPANY.address}
          </Alert>
          <div className="space-y-3 text-[1.02rem]">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-st-red" />
              <div>
                <div className="text-xs text-st-muted uppercase">{t.contact.line}</div>
                <a href={COMPANY.phoneHref} className="font-semibold">
                  {COMPANY.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-st-red" />
              <a
                href={COMPANY.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold inline-flex items-center gap-1"
              >
                {t.contact.map}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            {COMPANY.emails.map((em) => (
              <a
                key={em}
                href={`mailto:${em}`}
                className="flex items-center gap-3 hover:text-st-red"
              >
                <Mail className="h-4 w-4 text-st-red" />
                {em}
              </a>
            ))}
          </div>
          <div className="rounded-lg overflow-hidden border border-st-border h-64">
            <iframe
              src={COMPANY.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Factory location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
