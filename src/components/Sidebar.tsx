import { Phone, MessageCircle, Mail, Menu, X } from "lucide-react";
import { COMPANY, type PageId } from "../lib/company";
import { LANGS, type Language, type TDict } from "../lib/i18n";

const NAV: { id: PageId; emoji: string; key: keyof TDict["nav"] }[] = [
  { id: "home", emoji: "🏠", key: "home" },
  { id: "products", emoji: "🧱", key: "products" },
  { id: "quote", emoji: "🧮", key: "quote" },
  { id: "gallery", emoji: "🖼️", key: "gallery" },
  { id: "process", emoji: "⚙️", key: "process" },
  { id: "contact", emoji: "📅", key: "contact" },
];

export function Sidebar({
  page,
  setPage,
  lang,
  setLang,
  t,
  open,
  setOpen,
}: {
  page: PageId;
  setPage: (p: PageId) => void;
  lang: Language;
  setLang: (l: Language) => void;
  t: TDict;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const go = (p: PageId) => {
    setPage(p);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-40 h-10 w-10 rounded-md bg-st-sidebar border border-st-border flex items-center justify-center shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[21rem] max-w-[85vw] bg-st-sidebar flex flex-col border-r border-[#e6eaf1] transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-st-red to-amber-500" />

        <div className="px-5 pt-5 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 32 32" aria-hidden>
              <rect width="32" height="32" rx="7" fill="#FF4B4B" />
              <rect x="6" y="6" width="4.2" height="20" rx="0.6" fill="#fff" />
              <rect x="21.8" y="6" width="4.2" height="20" rx="0.6" fill="#fff" />
              <rect x="11" y="9" width="10" height="4.2" rx="0.4" fill="#fff" />
              <rect x="11" y="14.2" width="10" height="4.2" rx="0.4" fill="#fff" />
              <rect x="11" y="19.4" width="10" height="4.2" rx="0.4" fill="#fff" />
            </svg>
            <div>
              <div className="text-[13px] font-bold tracking-[0.14em] text-st-text leading-none">
                {t.brand}
              </div>
              <div className="text-[11px] text-st-muted mt-1 tracking-wide">
                {t.subtitle}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden p-1 text-st-muted"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-3 py-2 space-y-0.5">
          {NAV.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-md text-[0.98rem] transition-colors ${
                  active
                    ? "bg-white shadow-[inset_4px_0_0_#FF4B4B] font-semibold text-st-text"
                    : "text-st-text/80 hover:bg-white/60"
                }`}
              >
                <span className="w-6 text-center">{item.emoji}</span>
                {t.nav[item.key]}
              </button>
            );
          })}
        </nav>

        <div className="px-5 mt-4">
          <div className="h-px bg-[#d5dae3] mb-4" />
          <label className="block text-sm text-st-muted mb-1.5">
            {t.sidebar.language}
          </label>
          <select
            className="st-select bg-white"
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-auto px-5 py-5 space-y-2 text-sm">
          <p className="text-st-muted text-xs tracking-wide uppercase mb-3">
            {t.sidebar.coverage}
          </p>
          <a
            href={COMPANY.phoneHref}
            className="flex items-center gap-2 text-st-text hover:text-st-red"
          >
            <Phone className="h-4 w-4 text-st-red" />
            {COMPANY.phone}
          </a>
          <a
            href={COMPANY.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-st-text hover:text-st-red"
          >
            <MessageCircle className="h-4 w-4 text-st-red" />
            {t.sidebar.whatsapp}
          </a>
          <a
            href={`mailto:${COMPANY.emails[0]}`}
            className="flex items-center gap-2 text-st-text hover:text-st-red break-all"
          >
            <Mail className="h-4 w-4 text-st-red shrink-0" />
            {COMPANY.emails[0]}
          </a>
        </div>
      </aside>
    </>
  );
}
