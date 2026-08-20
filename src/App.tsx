import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "./components/Sidebar";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { QuotePage } from "./pages/QuotePage";
import { GalleryPage } from "./pages/GalleryPage";
import { ProcessPage } from "./pages/ProcessPage";
import { ContactPage } from "./pages/ContactPage";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { translations, type Language } from "./lib/i18n";
import { PAGES, type PageId } from "./lib/company";

function readHash(): PageId {
  const h = window.location.hash.replace("#", "") as PageId;
  return PAGES.includes(h) ? h : "home";
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("sv-lang") as Language | null;
    return saved && saved in translations ? saved : "en";
  });
  const [page, setPage] = useState<PageId>(readHash);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = translations[lang];

  const go = (p: PageId) => {
    setPage(p);
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    const onHash = () => setPage(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="min-h-screen bg-white text-st-text flex">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "Source Sans 3, sans-serif",
            borderRadius: "0.5rem",
          },
        }}
      />
      <Sidebar
        page={page}
        setPage={go}
        lang={lang}
        setLang={setLang}
        t={t}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="flex-1 min-w-0 min-h-screen flex flex-col">
        <div className="h-[3px] bg-st-red" />
        <main className="flex-1 px-5 sm:px-10 lg:px-14 pt-16 lg:pt-10 pb-16 max-w-5xl w-full mx-auto">
          {page === "home" && <HomePage t={t} go={go} />}
          {page === "products" && <ProductsPage t={t} />}
          {page === "quote" && <QuotePage t={t} go={go} />}
          {page === "gallery" && <GalleryPage t={t} />}
          {page === "process" && <ProcessPage t={t} />}
          {page === "contact" && <ContactPage t={t} />}
        </main>
        <footer className="text-center text-xs text-st-muted py-4 border-t border-st-border">
          © {new Date().getFullYear()} {t.footer}
        </footer>
      </div>
      <FloatingWhatsApp label={t.waHelp} />
    </div>
  );
}
