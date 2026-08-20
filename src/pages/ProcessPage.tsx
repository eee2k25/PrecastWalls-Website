import { Caption, Expander } from "../components/widgets";
import type { TDict } from "../lib/i18n";

const IMGS = [
  "/images/hero-wall.jpg",
  "/images/install-crane.jpg",
  "/images/factory-yard.jpg",
  "/images/panel-closeup.jpg",
];

export function ProcessPage({ t }: { t: TDict }) {
  const steps = [
    { t: t.process.s1t, d: t.process.s1d, img: IMGS[0] },
    { t: t.process.s2t, d: t.process.s2d, img: IMGS[1] },
    { t: t.process.s3t, d: t.process.s3d, img: IMGS[2] },
    { t: t.process.s4t, d: t.process.s4d, img: IMGS[3] },
  ];

  return (
    <div>
      <h1 className="text-[2.15rem] font-bold tracking-tight mb-2">
        {t.process.title}
      </h1>
      <Caption>{t.process.caption}</Caption>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <Expander key={s.t} title={s.t} defaultOpen={i === 0}>
            <div className="grid sm:grid-cols-3 gap-4 items-start">
              <p className="sm:col-span-2">{s.d}</p>
              <img
                src={s.img}
                alt=""
                className="rounded-md border border-st-border w-full h-32 object-cover"
              />
            </div>
          </Expander>
        ))}
      </div>
    </div>
  );
}
