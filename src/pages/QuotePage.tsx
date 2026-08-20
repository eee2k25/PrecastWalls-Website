import { useMemo, useState } from "react";
import {
  Alert,
  Caption,
  DataFrame,
  Metric,
  SelectBox,
  Slider,
  TextInput,
} from "../components/widgets";
import { WallPreview } from "../components/WallPreview";
import {
  DESIGNS,
  estimate,
  inr,
  type DesignId,
} from "../lib/quote";
import { COMPANY, type PageId } from "../lib/company";
import type { TDict } from "../lib/i18n";

export function QuotePage({
  t,
  go,
}: {
  t: TDict;
  go: (p: PageId) => void;
}) {
  const [running, setRunning] = useState(400);
  const [height, setHeight] = useState(7);
  const [design, setDesign] = useState<DesignId>("plain");
  const [location, setLocation] = useState("");

  const e = useMemo(
    () => estimate(running, height, design),
    [running, height, design]
  );

  const sendWa = () => {
    const msg =
      `*Quote estimate — Sri Venkateshwara Precast*%0A` +
      `Running ft: ${running}%0A` +
      `Height: ${height} ft%0A` +
      `Design: ${DESIGNS[design].label}%0A` +
      `Location: ${location || "—"}%0A` +
      `Est. range: ${inr(e.low)} – ${inr(e.high)}%0A` +
      `Days: ${e.days}`;
    window.location.href = `${COMPANY.whatsapp}?text=${msg}`;
  };

  return (
    <div>
      <h1 className="text-[2.15rem] font-bold tracking-tight mb-2">
        {t.quote.title}
      </h1>
      <Caption>{t.quote.caption}</Caption>

      <Alert kind="warning">{t.quote.warning}</Alert>

      <div className="grid lg:grid-cols-2 gap-10 mt-6">
        <div>
          <Slider
            label={t.quote.running}
            value={running}
            min={50}
            max={5000}
            step={10}
            suffix="ft"
            onChange={setRunning}
          />
          <Slider
            label={t.quote.height}
            value={height}
            min={5}
            max={10}
            step={1}
            suffix="ft"
            onChange={setHeight}
          />
          <SelectBox
            label={t.quote.design}
            value={design}
            onChange={(v) => setDesign(v as DesignId)}
            options={Object.entries(DESIGNS).map(([id, d]) => ({
              value: id,
              label: `${d.label}  ·  ${inr(d.rate)}/sq ft`,
            }))}
          />
          <TextInput
            label={t.quote.location}
            value={location}
            onChange={setLocation}
            placeholder={t.quote.locPh}
          />
          <WallPreview heightFt={height} design={design} />
        </div>

        <div>
          <div className="rounded-lg border border-st-border p-5 bg-st-sidebar/40 mb-5">
            <div className="grid grid-cols-2 gap-6">
              <Metric
                label={t.quote.estimate}
                value={inr(e.total)}
                hint={`${inr(e.rate)} / sq ft`}
              />
              <Metric
                label={t.quote.range}
                value={inr(e.low)}
                hint={inr(e.high)}
              />
              <Metric
                label={t.quote.days}
                value={`${e.days}d`}
                hint="~500 ft / day"
              />
              <Metric
                label={t.quote.sqft}
                value={e.sqft.toLocaleString("en-IN")}
                hint={`${e.poles} ${t.quote.poles.toLowerCase()}`}
              />
            </div>
          </div>

          <h3 className="font-bold mb-2">{t.quote.breakdown}</h3>
          <DataFrame
            headers={["Item", "Qty", "Amount"]}
            rows={[
              [t.quote.material, `${e.sqft} sq ft`, inr(e.installed)],
              [t.quote.transport, running > 400 ? `${running} ft` : "included", inr(e.transport)],
              [t.quote.poles, e.poles, "in rate"],
              [t.quote.panels, e.panels, "in rate"],
              ["Total (indicative)", "", inr(e.total)],
            ]}
          />

          <p className="text-sm text-st-muted mt-3 mb-5">{t.quote.note}</p>

          <div className="flex flex-col gap-2">
            <button className="st-btn w-full" onClick={sendWa}>
              {t.quote.send}
            </button>
            <button className="st-btn-secondary w-full" onClick={() => go("contact")}>
              {t.quote.book}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
