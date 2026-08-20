import { MessageCircle } from "lucide-react";
import { COMPANY } from "../lib/company";

export function FloatingWhatsApp({ label }: { label: string }) {
  return (
    <a
      href={COMPANY.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-105 transition-transform group"
      aria-label={label}
    >
      <span className="absolute right-full mr-3 bg-white text-st-text px-3 py-1.5 rounded-md text-sm font-semibold shadow border border-st-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
