export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image_url: string;
};

export const FALLBACK_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: "150-acre government boundary",
    category: "Commercial",
    image_url: "/images/govt-boundary.jpg",
  },
  {
    id: 2,
    title: "Hyderabad factory yard",
    category: "Factory",
    image_url: "/images/factory-yard.jpg",
  },
  {
    id: 3,
    title: "Panel assembly on farm",
    category: "Assembly",
    image_url: "/images/install-crane.jpg",
  },
  {
    id: 4,
    title: "Agricultural plot, Telangana",
    category: "Agricultural",
    image_url: "/images/hero-wall.jpg",
  },
  {
    id: 5,
    title: "Solar farm perimeter",
    category: "Commercial",
    image_url: "/images/solar-farm.jpg",
  },
  {
    id: 6,
    title: "Designer jali residence",
    category: "Commercial",
    image_url: "/images/designer-jali.jpg",
  },
  {
    id: 7,
    title: "Residential plot fencing",
    category: "Agricultural",
    image_url: "/images/residential-plot.jpg",
  },
  {
    id: 8,
    title: "Plain RCC running wall",
    category: "Assembly",
    image_url: "/images/plain-wall.jpg",
  },
  {
    id: 9,
    title: "M30 panel close-up",
    category: "Factory",
    image_url: "/images/panel-closeup.jpg",
  },
];

export const SPECS = [
  ["Concrete grade", "M30 (factory-cured)"],
  ["Steel", "High-tensile / prestressed"],
  ["Panel length", "6.0 – 7.0 ft (≈ 2 m)"],
  ["Panel thickness", "50 mm (2 in)"],
  ["Pole section", "H / I column, 150 × 150 mm"],
  ["Wall height", "5 – 10 ft"],
  ["Finish", "Plain, designer jali, security cap"],
  ["Design life", "30+ years, no plaster"],
  ["Relocatable", "Yes — panels unslot and move"],
  ["Install rate", "Up to 500 running ft / day"],
];

export const PROJECT_TYPES = [
  "Individual Plot",
  "Agricultural Farm",
  "Commercial/Industrial",
  "Solar Farm",
  "Government Project",
] as const;
