export type DesignId = "plain" | "designer" | "solar" | "industrial";

export const DESIGNS: Record<
  DesignId,
  { rate: number; label: string; note: string }
> = {
  plain: {
    rate: 85,
    label: "Plain RCC",
    note: "Farm & plot boundaries. M30 panels, H-poles.",
  },
  designer: {
    rate: 125,
    label: "Designer / Jali",
    note: "Cutout patterns, temple motifs, residential fronts.",
  },
  solar: {
    rate: 110,
    label: "Solar / Security",
    note: "Y-angle + barbed option. Fast perimeter for parks.",
  },
  industrial: {
    rate: 130,
    label: "Industrial Heavy",
    note: "Thicker panels, higher poles, factory & godown yards.",
  },
};

export const HEIGHTS = [5, 6, 7, 8, 10] as const;
export const PANEL_LENGTH_FT = 6.5;
export const PANEL_HEIGHT_FT = 1.5;

export function estimate(runningFt: number, heightFt: number, design: DesignId) {
  const sqft = Math.round(runningFt * heightFt);
  const rate = DESIGNS[design].rate;
  const installed = sqft * rate;
  const bays = Math.max(1, Math.ceil(runningFt / PANEL_LENGTH_FT));
  const poles = bays + 1;
  const rows = Math.max(3, Math.ceil(heightFt / PANEL_HEIGHT_FT));
  const panels = bays * rows;
  const days = Math.max(1, Math.ceil(runningFt / 500));
  const transport = runningFt > 400 ? Math.round(runningFt * 3.5) : 0;
  const low = Math.round((installed + transport) * 0.92);
  const high = Math.round((installed + transport) * 1.08);
  return {
    sqft,
    rate,
    installed,
    transport,
    total: installed + transport,
    low,
    high,
    days,
    poles,
    panels,
    bays,
    rows,
  };
}

export function inr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
