import { Alert, Caption, Divider, Metric } from "../components/widgets";
import type { TDict } from "../lib/i18n";
import type { PageId } from "../lib/company";

const RECENT = [
  "/images/hero-wall.jpg",
  "/images/factory-yard.jpg",
  "/images/install-crane.jpg",
  "/images/solar-farm.jpg",
  "/images/designer-jali.jpg",
  "/images/govt-boundary.jpg",
];

export function HomePage({
  t,
  go,
}: {
  t: TDict;
  go: (p: PageId) => void;
}) {
  return (
    <div>
      <p className="text-sm text-st-red font-semibold tracking-wide mb-2">
        {t.home.tag}
      </p>
      <h1 className="text-[2.15rem] sm:text-[2.45rem] font-bold tracking-tight leading-tight mb-2">
        {t.home.title}
      </h1>
      <Caption>{t.home.caption}</Caption>

      <div className="rounded-lg overflow-hidden border border-st-border mb-6">
        <img
          src="/images/hero-wall.jpg"
          alt="Precast compound wall in Telangana"
          className="w-full h-[280px] sm:h-[380px] object-cover"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Metric label={t.home.m1l} value={t.home.m1v} hint={t.home.m1d} />
        <Metric label={t.home.m2l} value={t.home.m2v} hint={t.home.m2d} />
        <Metric label={t.home.m3l} value={t.home.m3v} hint={t.home.m3d} />
        <Metric label={t.home.m4l} value={t.home.m4v} hint={t.home.m4d} />
      </div>

      <Alert kind="info">{t.home.info}</Alert>

      <Divider />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-3">{t.home.aboutTitle}</h2>
          <p className="text-[1.05rem] leading-relaxed text-st-text/90">
            {t.home.about}
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="st-btn" onClick={() => go("quote")}>
              {t.home.ctaQuote}
            </button>
            <button className="st-btn-secondary" onClick={() => go("contact")}>
              {t.home.ctaBook}
            </button>
          </div>
        </div>
        <img
          src="/images/install-crane.jpg"
          alt="Crew installing precast panels"
          className="rounded-lg border border-st-border w-full h-64 object-cover"
        />
      </div>

      <Divider />

      <p className="text-sm font-semibold uppercase tracking-wider text-st-red mb-1">
        {t.home.milestoneKicker}
      </p>
      <h2 className="text-2xl font-bold mb-3">{t.home.milestoneTitle}</h2>
      <div className="grid lg:grid-cols-5 gap-6 items-center">
        <div className="lg:col-span-2">
          <p className="text-[1.05rem] leading-relaxed mb-4">
            {t.home.milestoneBody}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Metric label="Run" value="150k+" hint={t.home.feet} />
            <Metric label="On site" value="45d" hint={t.home.days} />
          </div>
        </div>
        <img
          src="/images/govt-boundary.jpg"
          alt="150-acre government boundary"
          className="lg:col-span-3 rounded-lg border border-st-border w-full h-56 sm:h-72 object-cover"
        />
      </div>

      <Divider />

      <div className="flex items-end justify-between mb-3">
        <h2 className="text-2xl font-bold">{t.home.recent}</h2>
        <button
          className="text-st-red font-semibold text-sm"
          onClick={() => go("gallery")}
        >
          {t.home.viewAll}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {RECENT.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => go("gallery")}
            className="aspect-[4/3] rounded-md overflow-hidden border border-st-border"
          >
            <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </button>
        ))}
      </div>
    </div>
  );
}
