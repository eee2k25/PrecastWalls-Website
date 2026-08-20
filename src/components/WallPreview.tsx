import type { DesignId } from "../lib/quote";

export function WallPreview({
  heightFt,
  design,
}: {
  heightFt: number;
  design: DesignId;
}) {
  const rows = Math.max(3, Math.round(heightFt / 1.5));
  const bays = 6;
  const poleW = 14;
  const bayW = 70;
  const rowH = 22;
  const ground = 28;
  const width = poleW * (bays + 1) + bayW * bays + 40;
  const height = rows * rowH + 70;
  const startX = 20;
  const topY = 24;

  const fill = design === "industrial" ? "#6d6f73" : "#9aa0a6";
  const stroke = "#5c6168";

  return (
    <div className="rounded-md border border-st-border bg-[#f7f5f1] overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={`${heightFt} ft ${design} precast wall preview`}
      >
        <rect width={width} height={height} fill="#f3efe6" />
        <rect
          x="0"
          y={height - ground}
          width={width}
          height={ground}
          fill="#cbb892"
        />
        <rect
          x="0"
          y={height - 10}
          width={width}
          height="10"
          fill="#b89a6a"
        />

        {Array.from({ length: bays }).map((_, b) =>
          Array.from({ length: rows }).map((_, r) => {
            const x = startX + poleW + b * (bayW + poleW);
            const y = topY + r * rowH;
            const isJali = design === "designer" && r > 0 && r < rows - 1;
            return (
              <g key={`${b}-${r}`}>
                <rect
                  x={x}
                  y={y}
                  width={bayW}
                  height={rowH - 2}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="0.8"
                />
                {isJali && (
                  <>
                    <rect
                      x={x + 10}
                      y={y + 5}
                      width={12}
                      height={8}
                      fill="#d9d3c6"
                      opacity="0.85"
                    />
                    <rect
                      x={x + 28}
                      y={y + 5}
                      width={12}
                      height={8}
                      fill="#d9d3c6"
                      opacity="0.85"
                    />
                    <rect
                      x={x + 46}
                      y={y + 5}
                      width={12}
                      height={8}
                      fill="#d9d3c6"
                      opacity="0.85"
                    />
                  </>
                )}
                {design === "plain" && (
                  <line
                    x1={x + 4}
                    y1={y + rowH / 2 - 1}
                    x2={x + bayW - 4}
                    y2={y + rowH / 2 - 1}
                    stroke="#8a9096"
                    strokeWidth="0.6"
                  />
                )}
              </g>
            );
          })
        )}

        {Array.from({ length: bays + 1 }).map((_, i) => {
          const x = startX + i * (bayW + poleW);
          return (
            <g key={`p-${i}`}>
              <rect
                x={x}
                y={topY - 8}
                width={poleW}
                height={rows * rowH + 18}
                fill="#7d8288"
                stroke="#4e5358"
                strokeWidth="0.8"
              />
              <rect
                x={x + 3}
                y={topY - 14}
                width={8}
                height={8}
                fill="#6a6f74"
              />
              {design === "solar" && (
                <polygon
                  points={`${x},${topY - 8} ${x + poleW / 2},${topY - 22} ${x + poleW},${topY - 8}`}
                  fill="#5a5e63"
                />
              )}
            </g>
          );
        })}

        <text
          x={width / 2}
          y={height - 8}
          textAnchor="middle"
          fontSize="11"
          fill="#6b6254"
          fontFamily="Source Sans 3, sans-serif"
        >
          {heightFt} ft · {design} · live preview
        </text>
      </svg>
    </div>
  );
}
