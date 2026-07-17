// ============================================================
// Central site data — edit business info here once.
// ============================================================

export const site = {
  name: "Microscope Environmental Cleaning",
  shortName: "Microscope",
  legalName: "Microscope Mold and Water Damage Restoration",
  tagline: "A home clean enough to heal in.",
  phone: "(239) 565-6557",
  phoneHref: "tel:+12395656557",
  email: "info@microscopeenvironmental.com", // placeholder — confirm real inbox
  city: "Fort Myers, FL",
  serviceRegion: "Southwest Florida",
  licenses: {
    assessor: "MRSA #251",
    remediator: "MRSR #262",
    iicrc: "IICRC Certified",
  },
  emergency: "24/7 emergency response available",
} as const;

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Environmental Cleaning", href: "/services/environmental-cleaning/" },
      { label: "CIRS Cleaning", href: "/services/cirs-cleaning/" },
      { label: "ERMI Cleaning", href: "/services/ermi-cleaning/" },
      { label: "Post-Remediation Verification", href: "/services/post-remediation-verification/" },
      { label: "Air Sampling", href: "/services/air-sampling/" },
      { label: "Moisture Investigation", href: "/services/moisture-investigation/" },
      { label: "Mold Remediation", href: "/services/mold-remediation/" },
      { label: "Water & Flood Damage", href: "/services/water-flood-damage/" },
      { label: "Hurricane & Storm Cleanup", href: "/services/hurricane-storm-cleanup/" },
    ],
  },
  { label: "Healthcare Professionals", href: "/healthcare-professionals/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export type Service = {
  slug: string;
  title: string;
  category: "premium" | "restoration";
  short: string;
  summary: string;
  forWhom?: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "environmental-cleaning",
    title: "Environmental Cleaning",
    category: "premium",
    short: "Whole-home removal of the microscopic contaminants standard cleaning leaves behind.",
    summary:
      "Traditional remediation stops at visible mold. Our environmental cleaning targets the invisible layer that keeps sensitive occupants sick — settled dust, fragmented spores, hyphal fragments, biofilm, allergens, and microbial fragments — throughout the entire home, verified with real-time particle counting.",
    forWhom: "Anyone recovering their health in a home that must be genuinely clean, not just visibly clean.",
    includes: [
      "Full-home HEPA vacuuming of all surfaces, contents, and cavities",
      "Compressed-air HEPA air washing to dislodge settled particulate",
      "Detailed microfiber wiping with chemical-free agents",
      "0.3-micron particle count verification before we call it done",
      "Optional ERMI / EMMA post-cleaning sampling",
    ],
  },
  {
    slug: "cirs-cleaning",
    title: "CIRS Cleaning",
    category: "premium",
    short: "Cleaning to the standard mold-biotoxin recovery actually requires.",
    summary:
      "For occupants with CIRS (Chronic Inflammatory Response Syndrome) and biotoxin illness, a home that looks clean can still be making them sick. We clean to a fine-particulate standard aligned with physician mold protocols, so your environment supports recovery instead of undermining it.",
    forWhom: "CIRS, mold/biotoxin illness, Lyme, MCAS, and chemically sensitive occupants — often physician-referred.",
    includes: [
      "Protocol-aligned, chemical-free cleaning process",
      "Meticulous dust and fine-particulate removal",
      "Containment to prevent cross-contamination during work",
      "Particle count verification and optional ERMI/HERTSMI-2 retest support",
      "Documentation your physician can review",
    ],
  },
  {
    slug: "ermi-cleaning",
    title: "ERMI Cleaning",
    category: "premium",
    short: "Cleaning designed to help a home pass ERMI / HERTSMI-2.",
    summary:
      "ERMI (Environmental Relative Moldiness Index) and HERTSMI-2 measure the mold DNA in your settled dust — which is exactly what standard cleaning misses. We clean specifically to reduce that dust burden, then verify our work with particle counting before any retest.",
    forWhom: "Homeowners with an elevated ERMI/HERTSMI-2 score who need the number to come down.",
    includes: [
      "Targeted removal of settled dust and mold fragments that drive ERMI scores",
      "Whole-home approach — floors, walls, contents, HVAC-adjacent surfaces",
      "Particle count verification of fine-particulate reduction",
      "Coordination with your inspector for pre/post sampling",
    ],
  },
  {
    slug: "post-remediation-verification",
    title: "Post-Remediation Verification (PRV)",
    category: "premium",
    short: "Independent, data-backed confirmation that remediation actually worked.",
    summary:
      "As dual-licensed assessors and remediators, we verify that a completed remediation meets a defensible clean standard — using particle counting and, on request, ERMI/EMMA sampling — so you and your physician can trust the result.",
    forWhom: "Anyone who needs proof — not just a handshake — that remediation is complete.",
    includes: [
      "Visual and moisture verification",
      "0.3-micron particle count testing",
      "Optional ERMI / EMMA / air sampling",
      "Clear written verification report",
    ],
  },
  {
    slug: "air-sampling",
    title: "Air Sampling & Testing",
    category: "premium",
    short: "Understand what's actually in your indoor air.",
    summary:
      "We identify hidden mold and fine-particulate problems using air and dust sampling paired with real-time particle counts — turning an invisible problem into data you can act on.",
    includes: [
      "Air and settled-dust sampling",
      "0.3-micron particle counting",
      "ERMI / EMMA / HERTSMI-2 coordination on request",
      "Plain-English results you can share with your doctor",
    ],
  },
  {
    slug: "moisture-investigation",
    title: "Moisture Investigation",
    category: "premium",
    short: "Find the water source driving the problem.",
    summary:
      "Mold is a moisture problem first. Using thermal imaging and moisture meters, we locate the hidden intrusion or humidity issue at the root — because cleaning without fixing the source only buys time.",
    includes: [
      "Thermal imaging camera survey",
      "Moisture meter mapping",
      "Source identification and recommendations",
      "Documentation for repairs or insurance",
    ],
  },
  {
    slug: "mold-remediation",
    title: "Mold Remediation",
    category: "restoration",
    short: "Licensed removal of active mold — done to a higher finish standard.",
    summary:
      "Full mold remediation by a Florida-licensed assessor and remediator, with containment, source removal, and HEPA processes — followed by the fine-particulate cleaning and verification most remediation companies skip.",
    includes: [
      "Containment and negative air",
      "Source material removal",
      "HEPA vacuuming and air washing",
      "Particle-count verified cleaning",
    ],
  },
  {
    slug: "water-flood-damage",
    title: "Water & Flood Damage Restoration",
    category: "restoration",
    short: "Fast, thorough recovery from leaks, floods, and storms.",
    summary:
      "Water damage creates the perfect conditions for mold. We dry, decontaminate, and restore properly — and because we're an environmental cleaning company first, we make sure what's left behind won't become tomorrow's mold problem. Insurance documentation provided.",
    includes: [
      "Rapid water extraction and structural drying",
      "Antimicrobial decontamination",
      "Moisture verification with meters and thermal imaging",
      "Insurance-ready documentation",
    ],
  },
  {
    slug: "hurricane-storm-cleanup",
    title: "Hurricane & Storm Damage Cleanup",
    category: "restoration",
    short: "Storm recovery for Southwest Florida homes.",
    summary:
      "From wind-driven rain to major flooding, we handle post-storm cleanup and decontamination with the same fine-particulate standard we bring to every home — so recovery is complete, not cosmetic.",
    includes: [
      "Emergency response and assessment",
      "Water extraction and drying",
      "Decontamination and debris removal",
      "Insurance documentation",
    ],
  },
];

export const process = [
  { step: "01", title: "Inspection", desc: "Assess the home, the occupants' sensitivities, and any lab reports or physician orders." },
  { step: "02", title: "Moisture Investigation", desc: "Locate the water source with thermal imaging and moisture meters." },
  { step: "03", title: "Containment", desc: "Isolate work areas to prevent cross-contamination." },
  { step: "04", title: "Source Removal", desc: "Remove active mold and contaminated materials." },
  { step: "05", title: "HEPA Vacuuming", desc: "Capture settled particulate from every surface and cavity." },
  { step: "06", title: "Compressed-Air HEPA Air Wash", desc: "Dislodge embedded fine particles, then capture them." },
  { step: "07", title: "Detailed Microfiber Wiping", desc: "Chemical-free wipe-down of all surfaces and contents." },
  { step: "08", title: "Environmental Cleaning", desc: "Whole-home fine-particulate reduction to a clinical standard." },
  { step: "09", title: "Particle Count Verification", desc: "Confirm 0.3-micron particulate reduction with real-time data." },
  { step: "10", title: "ERMI / EMMA Sampling", desc: "Optional dust sampling to confirm results (on request)." },
  { step: "11", title: "Post-Remediation Verification", desc: "Independent, documented confirmation the work is complete." },
];

export const serviceAreas = [
  {
    county: "Lee County",
    places: ["Fort Myers", "Fort Myers Beach", "Cape Coral", "Estero", "Bonita Springs", "Sanibel", "Captiva", "Lehigh Acres"],
  },
  {
    county: "Collier County",
    places: ["Naples", "Old Naples", "Pelican Bay", "Park Shore", "The Moorings", "Port Royal", "Marco Island"],
  },
  {
    county: "Charlotte County",
    places: ["Punta Gorda", "Port Charlotte"],
  },
  {
    county: "Sarasota County",
    places: ["Sarasota", "Lakewood Ranch", "Venice", "Siesta Key", "Longboat Key", "Manasota Key"],
  },
];
