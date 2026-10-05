export type VendorProduct = {
  id?: string;
  name: string;
  brand: string;
  type: string;
  price: string;
  image: string;
  tags: string[];
  stock: string;
  category?: string;
};

export type VendorProfile = {
  id: string;
  name: string;
  location: string;
  area: string;
  badge: string;
  initials: string;
  accent: string;
  description: string;
  aboutBay: string;
  specialty: string;
  phone: string;
  whatsapp: string;
  email: string;
  hoursMonSat: string;
  hoursSun: string;
  services: string[];
  features: string[];
  bannerImage: string;
  products: VendorProduct[];
  productCount?: number;
  rating?: number;
  reviewsCount?: number;
};

export const VENDOR_PROFILES: Record<string, VendorProfile> = {
  stancecraft: {
    id: "stancecraft",
    name: "StanceCraft Parts & Tuning",
    location: "G-10/4, Islamabad",
    area: "Islamabad",
    badge: "Stance & Fitment Specialist",
    initials: "SC",
    accent: "#6b9a7b",
    description:
      "Air suspension management systems, wheel spacers, hub-centric rings, camber adjustment arms, and aggressive fitment consulting for German and JDM platforms.",
    aboutBay:
      "Twin cities' premier stance engineering garage. Equipped with digital laser camber/toe measuring benches, touchless tyre mounting for aggressive wheel stretch, and certified air suspension installations.",
    specialty: "Air Suspension & Custom Offsets",
    phone: "+92 321 5567890",
    whatsapp: "+923215567890",
    email: "tuning@stancecraft.pk",
    hoursMonSat: "11:00 AM - 10:00 PM",
    hoursSun: "02:00 PM - 09:00 PM",
    services: ["Air Suspension", "Rims", "Auto Parts", "Wheel Spacers"],
    features: [
      "Airlift 3P & 3H Certified Bay",
      "Digital Laser Camber Alignment",
      "Touchless Tyre Stretch Mount",
      "Forged Wheel Spacers In Stock",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85",
    products: [
      {
        name: "Airlift Performance 3P Air Suspension Kit",
        brand: "AIR LIFT PERFORMANCE",
        type: "Complete 4-Corner Air Struts + 3P Digital Manifold System",
        price: "PKR 780,000",
        image:
          "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=85",
        tags: ["In Stock", "Stance Fitment"],
        stock: "1 Kit In Stock",
        category: "Suspension",
      },
      {
        name: "Work Meister S1 3P Custom",
        brand: "WORK WHEELS JAPAN",
        type: "Polished Step Lip · 18×9.5 -5 / 18×10.5 -10 · PCD 5×114.3",
        price: "PKR 540,000",
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=85",
        tags: ["Deep Dish", "Authentic 3-Piece"],
        stock: "PRICE / SET (4)",
        category: "Rims",
      },
      {
        name: "BBS LM Motorsport 20×10",
        brand: "BBS GERMANY",
        type: "Diamond Silver · 20×10 +25 · PCD 5×112",
        price: "PKR 620,000",
        image:
          "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=700&q=85",
        tags: ["2 Sets Left", "Fitment Match"],
        stock: "PRICE / SET (4)",
        category: "Rims",
      },
      {
        name: "Blox Forged Hubcentric Wheel Spacers",
        brand: "BLOX SPORT",
        type: "15mm / 20mm 6061-T6 Aluminum · Grade 10.9 Extended Studs",
        price: "PKR 28,000",
        image:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=85",
        tags: ["Vibration Free", "In Stock"],
        stock: "PRICE / PAIR (2)",
        category: "Auto Parts",
      },
      {
        name: "Hardrace Rear Camber Adjustment Arms",
        brand: "HARDRACE",
        type: "Heavy Duty Pillow Ball Mounts · Adjustable -4° to +2°",
        price: "PKR 45,000",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=85",
        tags: ["Track & Stance", "In Stock"],
        stock: "PRICE / PAIR",
        category: "Auto Parts",
      },
      {
        name: "Pilot Sport 4S (PS4S)",
        brand: "MICHELIN",
        type: "255/35ZR19 96Y XL · Ultra High Grip Stance Fitment",
        price: "PKR 82,000",
        image:
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=700&q=85",
        tags: ["Fresh 2024 DOT"],
        stock: "PRICE / TYRE",
        category: "Tyres",
      },
    ],
  },
  "aura-custom": {
    id: "aura-custom",
    name: "Aura Custom Studio",
    location: "P-I Markaz, Islamabad",
    area: "Islamabad",
    badge: "Avery & Inozetek Certified",
    initials: "AC",
    accent: "#6b9a7b",
    description:
      "Bespoke vinyl color change wraps, ceramic window tints (5% to 70% VLT), and self-healing TPU paint protection films.",
    aboutBay:
      "Dust-controlled climate wrap suites with IR heat cure lamps and certified master vinyl installers.",
    specialty: "Vinyl Wraps & Paint Protection",
    phone: "+92 301 8876543",
    whatsapp: "+923018876543",
    email: "studio@auracustom.pk",
    hoursMonSat: "10:00 AM - 08:00 PM",
    hoursSun: "12:00 PM - 06:00 PM",
    services: ["Wraps", "Auto Parts", "Window Tint", "PPF"],
    features: [
      "Dust-Controlled Wrap Suite",
      "Avery Dennison Certified",
      "Self-Healing PPF Plotting",
      "Ceramic Heat Rejection Tints",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85",
    products: [
      {
        name: "Inozetek Super Gloss Full Wrap",
        brand: "INOZETEK USA",
        type: "Nardo Grey / Chalk White / Metallic Violet · 5yr Warranty",
        price: "PKR 285,000",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=700&q=85",
        tags: ["Full Vehicle", "Avery Certified"],
        stock: "SERVICE / CAR",
        category: "Wraps",
      },
      {
        name: "Stek DYNOshield Full Front PPF",
        brand: "STEK AUTOMOTIVE",
        type: "Self-Healing TPU Film · Bumper, Hood, Fenders & Mirrors",
        price: "PKR 210,000",
        image:
          "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=85",
        tags: ["10-Year Warranty", "Hydrophobic"],
        stock: "PACKAGE",
        category: "Auto Parts",
      },
      {
        name: "Ceramic IR Nano Window Tint Set",
        brand: "XPEL PRIME XR",
        type: "99% UV & 88% Infrared Heat Rejection · All Windows",
        price: "PKR 65,000",
        image:
          "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=700&q=85",
        tags: ["Heat Blocking", "Legal VLT"],
        stock: "FULL CAR",
        category: "Auto Parts",
      },
    ],
  },
  "apex-performance": {
    id: "apex-performance",
    name: "Apex Performance Garage",
    location: "Sector I-9/3, Islamabad",
    area: "Islamabad",
    badge: "Top Rated Partner",
    initials: "AP",
    accent: "#b9966b",
    description:
      "High-end automotive tuning, custom forged monoblocks, Brembo BBK kits, and track alignment setups.",
    aboutBay:
      "Specialized in dyno tuning, forged wheel upgrades, and big brake system installation.",
    specialty: "Track Tuning & Big Brakes",
    phone: "+92 333 4455667",
    whatsapp: "+923334455667",
    email: "contact@apexperformance.pk",
    hoursMonSat: "10:00 AM - 09:00 PM",
    hoursSun: "Closed",
    services: ["Auto Parts", "Rims", "Tuning", "Brakes"],
    features: [
      "AWD Dyno Cell",
      "Brembo Authorized Tech",
      "Corner Weight Scales",
      "Custom Forged Orders",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1600&q=85",
    products: [
      {
        name: "Brembo GT 6-Piston Big Brake Kit",
        brand: "BREMBO RACING",
        type: "380mm 2-Piece Floating Rotors · Red/Yellow Calipers",
        price: "PKR 740,000",
        image:
          "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=700&q=85",
        tags: ["Track Duty", "BBK Kit"],
        stock: "KIT / AXLE",
        category: "Auto Parts",
      },
      {
        name: "TE37 Saga S-Plus",
        brand: "RAYS VOLK RACING",
        type: "Bronze Almite · 18×9.5 +38 · 5×114.3",
        price: "PKR 490,000",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=85",
        tags: ["In Stock", "Fitment Match"],
        stock: "PRICE / SET (4)",
        category: "Rims",
      },
    ],
  },
  "velocity-wheels": {
    id: "velocity-wheels",
    name: "Velocity Wheels & Tyres",
    location: "Saddar, Rawalpindi",
    area: "Rawalpindi",
    badge: "Verified Seller",
    initials: "VW",
    accent: "#6b9a7b",
    description:
      "Complete tyre solutions from Michelin, Yokohama, and Pirelli. Track semi-slicks, road touring, and digital road-force balancing.",
    aboutBay:
      "Twin Cities' largest ready stock of ultra-high performance and track day tyres.",
    specialty: "Performance Tyres & Laser Balancing",
    phone: "+92 345 9988776",
    whatsapp: "+923459988776",
    email: "sales@velocitywheels.pk",
    hoursMonSat: "09:30 AM - 09:00 PM",
    hoursSun: "11:00 AM - 07:00 PM",
    services: ["Rims", "Tyres", "Balancing"],
    features: [
      "Road Force Touchless Balancer",
      "Pirelli & Michelin Official Stockist",
      "Nitrogen Inflation Station",
      "Rapid Dispatch Bay",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1600&q=85",
    products: [
      {
        name: "Pilot Sport 4S (PS4S)",
        brand: "MICHELIN",
        type: "255/35ZR19 96Y XL · Ultra High Grip",
        price: "PKR 82,000",
        image:
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=700&q=85",
        tags: ["Fresh 2024 DOT"],
        stock: "PRICE / TYRE",
        category: "Tyres",
      },
      {
        name: "Advan Neova AD09",
        brand: "YOKOHAMA",
        type: "245/40R18 Semi-Slick 97W · 200 TW",
        price: "PKR 68,000",
        image:
          "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=85",
        tags: ["Track Ready"],
        stock: "PRICE / TYRE",
        category: "Tyres",
      },
    ],
  },
  "rawal-tyre": {
    id: "rawal-tyre",
    name: "Rawal Tyre & Wheel Point",
    location: "Murree Road, Rawalpindi",
    area: "Rawalpindi",
    badge: "Verified Seller",
    initials: "RT",
    accent: "#b9966b",
    description:
      "Extensive warehouse inventory of high-performance radial tyres, lightweight flow-formed wheels, and laser alignment.",
    aboutBay:
      "High volume wheel and tyre depot with rapid in-and-out fitment bays.",
    specialty: "Flow-Formed Wheels & Tyres",
    phone: "+92 300 7766554",
    whatsapp: "+923007766554",
    email: "info@rawaltyre.pk",
    hoursMonSat: "09:00 AM - 10:00 PM",
    hoursSun: "10:00 AM - 08:00 PM",
    services: ["Tyres", "Rims", "Wheel Alignment"],
    features: [
      "4 Ramps Simultaneous Bay",
      "Computerized 3D Alignment",
      "Immediate Delivery Network",
      "Bulk Pricing Available",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
    products: [
      {
        name: "Enkei RPF1 Lightweight",
        brand: "ENKEI JAPAN",
        type: "Silver · 18×8.5 +35 · 5×114.3 · 8.1kg",
        price: "PKR 245,000",
        image:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=85",
        tags: ["Verified Fitment"],
        stock: "PRICE / SET (4)",
        category: "Rims",
      },
    ],
  },
  "automax-wheels": {
    id: "automax-wheels",
    name: "AutoMax Wheels",
    location: "Sector I-9, Islamabad",
    area: "Islamabad",
    badge: "Verified Partner 2024",
    initials: "AM",
    accent: "#6b9a7b",
    description:
      "Pakistan's authorized premium distributor for forged monoblock wheels including Vossen, BBS, Enkei, and Volk Racing, paired with ultra-high-performance tyres.",
    aboutBay:
      "Over 12 years in bespoke fitment engineering with computerized laser hub-centric balancing, custom offsets, and certified master technicians.",
    specialty: "Forged Monoblock Wheels & High Grip Tyres",
    phone: "+92 300 1234567",
    whatsapp: "+923001234567",
    email: "info@automaxwheels.pk",
    hoursMonSat: "09:00 AM - 08:00 PM",
    hoursSun: "11:00 AM - 06:00 PM",
    services: ["Rims", "Tyres", "Auto Parts"],
    features: [
      "Authorized Importer",
      "Precision Alignment Bay",
      "Laser Balancing",
      "Fitment Guaranteed",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85",
    products: [
      {
        name: "HF-5 Monoblock",
        brand: "VOSSEN WHEELS",
        type: "Gloss Black · 19×9.5 +35 · PCD 5×114.3",
        price: "PKR 385,000",
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=85",
        tags: ["In Stock", "Fitment Match"],
        stock: "PRICE / SET (4)",
        category: "Rims",
      },
      {
        name: "BBS LM Motorsport",
        brand: "BBS GERMANY",
        type: "Diamond Silver · 20×10 +25 · PCD 5×112",
        price: "PKR 620,000",
        image:
          "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=700&q=85",
        tags: ["2 Sets Left", "Fitment Match"],
        stock: "PRICE / SET (4)",
        category: "Rims",
      },
      {
        name: "Pilot Sport 4S (PS4S)",
        brand: "MICHELIN",
        type: "255/35ZR19 96Y XL · Ultra High Grip",
        price: "PKR 82,000",
        image:
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=700&q=85",
        tags: ["Fresh 2024 DOT"],
        stock: "PRICE / TYRE",
        category: "Tyres",
      },
      {
        name: "TE37 Saga S-Plus",
        brand: "RAYS VOLK RACING",
        type: "Bronze Almite · 18×9.5 +38 · 5×114.3",
        price: "PKR 490,000",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=85",
        tags: ["In Stock", "Fitment Match"],
        stock: "PRICE / SET (4)",
        category: "Rims",
      },
      {
        name: "Enkei RPF1 Lightweight",
        brand: "ENKEI JAPAN",
        type: "Silver · 18×8.5 +35 · 5×114.3 · 8.1kg",
        price: "PKR 245,000",
        image:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=85",
        tags: ["Verified Fitment"],
        stock: "PRICE / SET (4)",
        category: "Rims",
      },
      {
        name: "Advan Neova AD09",
        brand: "YOKOHAMA",
        type: "245/40R18 Semi-Slick 97W · 200 TW",
        price: "PKR 68,000",
        image:
          "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=85",
        tags: ["Track Ready"],
        stock: "PRICE / TYRE",
        category: "Tyres",
      },
    ],
  },
};

export function getVendorProfile(vendorId: string): VendorProfile {
  return VENDOR_PROFILES[vendorId] || VENDOR_PROFILES["automax-wheels"];
}
