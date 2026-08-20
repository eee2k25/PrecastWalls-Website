export const COMPANY = {
  brand: "Sri Venkateshwara",
  product: "Precast Walls",
  phone: "9014386019",
  phoneHref: "tel:+919014386019",
  whatsapp: "https://wa.me/919014386019",
  emails: ["tagilimallesh5@gmail.com", "mekganesh6@gmail.com"],
  mapLink: "https://maps.app.goo.gl/J4XGPpWChiZeW77t7",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3801.328373111409!2d78.58784707517174!3d17.681944383253733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDQwJzU1LjAiTiA3OMKwMzUnMjUuNSJF!5e0!3m2!1sen!2sin!4v1740039868770!5m2!1sen!2sin",
  address: "Kattedan, Rajendra Nagar, Hyderabad, Telangana 500077",
  coverage: ["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu"],
} as const;

export type PageId =
  | "home"
  | "products"
  | "quote"
  | "gallery"
  | "process"
  | "contact";

export const PAGES: PageId[] = [
  "home",
  "products",
  "quote",
  "gallery",
  "process",
  "contact",
];
