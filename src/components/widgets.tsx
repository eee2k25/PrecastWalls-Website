import type { ReactNode } from "react";

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="-mt-2 mb-5 text-[0.95rem] text-st-muted leading-relaxed">
      {children}
    </p>
  );
}

export function Divider() {
  return <hr className="my-6 border-st-border/80" />;
}

export function Metric({
  label,
  value,
  delta,
  hint,
  up = true,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  up?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[0.9rem] text-st-muted leading-tight mb-0.5">
        {label}
      </div>
      <div className="text-[1.85rem] font-semibold tracking-tight leading-none text-st-text">
        {value}
      </div>
      {delta && (
        <div
          className={`mt-1 text-sm font-medium ${up ? "text-st-green" : "text-st-red"}`}
        >
          {up ? "↑" : "↓"} {delta}
        </div>
      )}
      {hint && !delta && (
        <div className="mt-1 text-sm text-st-muted">{hint}</div>
      )}
    </div>
  );
}

export function Alert({
  kind = "info",
  children,
}: {
  kind?: "info" | "success" | "warning" | "error";
  children: ReactNode;
}) {
  const map = {
    info: "border-st-blue bg-[#e8f4fd] text-[#1c3d5a]",
    success: "border-st-green bg-[#e8f8ee] text-[#145c32]",
    warning: "border-st-yellow bg-[#fff6e0] text-[#5c4a12]",
    error: "border-st-red bg-[#fdecec] text-[#6b1d1d]",
  } as const;
  return (
    <div
      className={`rounded-md border-l-[6px] px-4 py-3 text-[0.98rem] leading-relaxed ${map[kind]}`}
    >
      {children}
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-5">
      <label className="block text-[0.95rem] mb-2">
        {label}{" "}
        <span className="font-semibold text-st-text">
          {value.toLocaleString("en-IN")}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </label>
      <input
        type="range"
        className="st-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #FF4B4B ${pct}%, #d6d6d9 ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-st-muted mt-1">
        <span>{min.toLocaleString("en-IN")}</span>
        <span>{max.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

export function SelectBox({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <label className="block text-[0.95rem] mb-2">{label}</label>
      <select
        className="st-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[0.95rem] mb-1.5">{label}</label>
      <input
        className="st-input"
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-st-border mb-5">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 text-[0.95rem] -mb-px border-b-[3px] transition-colors ${
            active === t.id
              ? "border-st-red text-st-text font-semibold"
              : "border-transparent text-st-muted hover:text-st-text"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function Expander({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-md border border-st-border bg-white mb-3"
    >
      <summary className="cursor-pointer list-none px-4 py-3 font-semibold flex items-center gap-2">
        <span className="text-st-muted group-open:rotate-90 transition-transform">
          ▸
        </span>
        {title}
      </summary>
      <div className="px-4 pb-4 pt-0 text-[0.98rem] text-st-text/90 leading-relaxed">
        {children}
      </div>
    </details>
  );
}

export function DataFrame({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-st-border">
      <table className="w-full text-[0.95rem]">
        <thead className="bg-st-sidebar">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left font-semibold px-3 py-2 border-b border-st-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-white even:bg-[#fafafa]">
              {r.map((c, j) => (
                <td
                  key={j}
                  className="px-3 py-2 border-b border-st-border/70 font-mono text-[0.88rem]"
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
