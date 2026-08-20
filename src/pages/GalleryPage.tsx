import { useEffect, useState } from "react";
import { Caption } from "../components/widgets";
import { FALLBACK_GALLERY, type GalleryItem } from "../lib/data";
import type { TDict } from "../lib/i18n";
import { X } from "lucide-react";

const CATS = ["All", "Factory", "Assembly", "Agricultural", "Commercial"] as const;

export function GalleryPage({ t }: { t: TDict }) {
  const [items, setItems] = useState<GalleryItem[]>(FALLBACK_GALLERY);
  const [filter, setFilter] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0]?.image_url) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  const shown =
    filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <h1 className="text-[2.15rem] font-bold tracking-tight mb-2">
        {t.gallery.title}
      </h1>
      <Caption>{t.gallery.caption}</Caption>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-md text-sm border ${
              filter === c
                ? "bg-st-red text-white border-st-red"
                : "bg-white border-st-border text-st-text hover:border-st-red"
            }`}
          >
            {c === "All" ? t.gallery.all : c}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-st-muted">{t.gallery.empty}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(item)}
              className="text-left group rounded-lg overflow-hidden border border-st-border bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-3 py-2">
                <div className="text-xs text-st-red font-semibold uppercase tracking-wide">
                  {item.category}
                </div>
                <div className="font-semibold">{item.title}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <img
            src={open.image_url}
            alt={open.title}
            className="max-h-[85vh] max-w-full rounded-md"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
