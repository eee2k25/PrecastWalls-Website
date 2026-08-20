import { useState } from "react";
import { Alert, Caption, DataFrame, Tabs } from "../components/widgets";
import { DESIGNS, inr, type DesignId } from "../lib/quote";
import { SPECS } from "../lib/data";
import type { TDict } from "../lib/i18n";

const IMAGES: Record<DesignId, string> = {
  plain: "/images/plain-wall.jpg",
  designer: "/images/designer-jali.jpg",
  solar: "/images/solar-farm.jpg",
  industrial: "/images/factory-yard.jpg",
};

export function ProductsPage({ t }: { t: TDict }) {
  const [tab, setTab] = useState<DesignId>("plain");
  const d = DESIGNS[tab];

  return (
    <div>
      <h1 className="text-[2.15rem] font-bold tracking-tight mb-2">
        {t.products.title}
      </h1>
      <Caption>{t.products.caption}</Caption>

      <Tabs
        tabs={[
          { id: "plain", label: t.products.tabs.plain },
          { id: "designer", label: t.products.tabs.designer },
          { id: "solar", label: t.products.tabs.solar },
          { id: "industrial", label: t.products.tabs.industrial },
        ]}
        active={tab}
        onChange={(id) => setTab(id as DesignId)}
      />

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <img
          src={IMAGES[tab]}
          alt={d.label}
          className="rounded-lg border border-st-border w-full h-64 object-cover"
        />
        <div>
          <h2 className="text-xl font-bold mb-1">{d.label}</h2>
          <p className="text-st-muted mb-4">{d.note}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-st-muted">Indicative rate</div>
              <div className="text-2xl font-semibold">{inr(d.rate)}/sq ft</div>
            </div>
            <div>
              <div className="text-sm text-st-muted">Height</div>
              <div className="text-2xl font-semibold">5–10 ft</div>
            </div>
          </div>
          <Alert kind="info">
            Final rate after site survey. Use the Quote Estimator for a
            ballpark on your running feet.
          </Alert>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-3">{t.products.specs}</h3>
      <DataFrame
        headers={["Item", "Spec"]}
        rows={SPECS}
      />

      <h3 className="text-lg font-bold mt-8 mb-3">{t.products.why}</h3>
      <ul className="space-y-2 text-[1.02rem]">
        {[t.products.w1, t.products.w2, t.products.w3, t.products.w4].map(
          (w) => (
            <li key={w} className="flex gap-2">
              <span className="text-st-red">▸</span>
              {w}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
