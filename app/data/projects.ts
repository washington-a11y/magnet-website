import { ProjectData } from "../types";

export const PROJECTS: ProjectData[] = [
  {
    slug: "jades",
    name: "Jades",
    client: "Jade's",
    industry: "Hospitality",
    tagline: "a burger shop with criollo passion",
    services: [
      "Logotype, Typography & Colour",
      "Illustrations & 3D Art",
      "Brand Direction",
      "Brand Book & Guidelines",
    ],
    challenge:
      "The restaurant has been in operation for over a year, but due to changes in the business and people's lives, they needed to create a new identity that fully reflects the new generation.",
    solution:
      "Jade's visual identity is a refreshing and distinctive look, featuring custom illustrations that embody the owner's vision and highlight the unique menu offerings, including Ecuador's renowned street food, \"La salchipapa.\"",
    heroImg: "/assets/jades/image 1.png",
    gallery: [
      { type: "full", img: "/assets/jades/image 2.png" },
      { type: "full", img: "/assets/jades/image 3.png" },
      { type: "half", imgs: ["/assets/jades/image 4.png", "/assets/jades/image 5.png"] },
      { type: "full", img: "/assets/jades/image 6.png" },
      { type: "half", imgs: ["/assets/jades/image 7.png", "/assets/jades/image 8.png"] },
      { type: "full", img: "/assets/jades/image 9.png" },
    ],
    related: [
      { name: "Golden Diner", category: "restaurants", img: "/assets/d29099a355c65750667c69a33a39dc4ce6897c90.png", slug: "golden-diner" },
      { name: "NorthGuide", category: "government", img: "/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png", slug: "northguide" },
    ],
  },
  {
    slug: "northguide",
    name: "NorthGuide",
    client: "NorthGuide",
    industry: "Government",
    tagline: "innovative strategies for all",
    services: ["Brand Strategy", "Web Design", "UI/UX", "Digital Identity"],
    challenge:
      "NorthGuide needed a modern digital presence to connect with citizens and communicate government services more effectively.",
    solution:
      "We created a clean, accessible digital identity that prioritises clarity and trust — designed to serve everyone.",
    heroImg: "/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png",
    gallery: [
      { type: "full", img: "/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png" },
      { type: "half", imgs: ["/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png", "/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png"] },
    ],
    related: [
      { name: "MedMe", category: "health care", img: "/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png", slug: "medme" },
      { name: "Jades", category: "restaurants", img: "/assets/a100b301219092557da65f25dd8d1585b47e0494.png", slug: "jades" },
    ],
  },
  {
    slug: "medme",
    name: "MedMe",
    client: "MedMe Health",
    industry: "Health Care",
    tagline: "pharmacy care, reimagined",
    services: ["Brand Identity", "Product Design", "Web Design"],
    challenge:
      "MedMe needed to communicate complex healthcare software to both pharmacies and patients in a clear, trustworthy way.",
    solution:
      "A modern, clinical brand identity paired with an intuitive product UI that makes healthcare feel approachable and efficient.",
    heroImg: "/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png",
    gallery: [
      { type: "full", img: "/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png" },
      { type: "half", imgs: ["/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png", "/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png"] },
    ],
    related: [
      { name: "NorthGuide", category: "government", img: "/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png", slug: "northguide" },
      { name: "Spanning Labs", category: "fintech", img: "/assets/a15ee6970401f72f8376e623a0d7f379a2f5a5b7.png", slug: "spanning-labs" },
    ],
  },
  {
    slug: "golden-diner",
    name: "Golden Diner",
    client: "Golden Diner",
    industry: "Restaurants",
    tagline: "where nostalgia meets the plate",
    services: ["Brand Identity", "Menu Design", "Art Direction"],
    challenge:
      "Golden Diner wanted to capture the warmth of a classic American diner while feeling fresh and contemporary.",
    solution:
      "A retro-modern identity blending warm gold tones and bold typography that feels both nostalgic and timeless.",
    heroImg: "/assets/d29099a355c65750667c69a33a39dc4ce6897c90.png",
    gallery: [
      { type: "full", img: "/assets/d29099a355c65750667c69a33a39dc4ce6897c90.png" },
      { type: "half", imgs: ["/assets/d29099a355c65750667c69a33a39dc4ce6897c90.png", "/assets/a100b301219092557da65f25dd8d1585b47e0494.png"] },
    ],
    related: [
      { name: "Jades", category: "restaurants", img: "/assets/a100b301219092557da65f25dd8d1585b47e0494.png", slug: "jades" },
      { name: "Covalent", category: "tech", img: "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png", slug: "covalent" },
    ],
  },
  {
    slug: "covalent",
    name: "Covalent",
    client: "Covalent",
    industry: "Tech",
    tagline: "data infrastructure for the modern stack",
    services: ["Brand Identity", "Web Design", "Motion"],
    challenge:
      "Covalent needed a brand that conveyed technical credibility while remaining approachable to a broad developer audience.",
    solution:
      "A systematic identity rooted in data visualisation aesthetics — clean, precise, and scalable across digital touchpoints.",
    heroImg: "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png",
    gallery: [
      { type: "full", img: "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png" },
      { type: "half", imgs: ["/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png", "/assets/28d3e35ba177c27b89b63a405db317b1d920ce1d.png"] },
    ],
    related: [
      { name: "Epoch", category: "tech", img: "/assets/28d3e35ba177c27b89b63a405db317b1d920ce1d.png", slug: "epoch" },
      { name: "StackDeck", category: "tech", img: "/assets/e0273bf3c6ebff83f16c5a210e87202778a7d4d3.png", slug: "stackdeck" },
    ],
  },
  {
    slug: "epoch",
    name: "Epoch",
    client: "Epoch",
    industry: "Tech",
    tagline: "time-aware analytics at scale",
    services: ["Brand Strategy", "Product Design", "Web Design"],
    challenge:
      "Epoch needed to differentiate in a crowded analytics market by leading with a distinctive visual language.",
    solution:
      "A temporal, precision-focused identity that uses time as a visual metaphor — conveying speed, accuracy, and depth.",
    heroImg: "/assets/28d3e35ba177c27b89b63a405db317b1d920ce1d.png",
    gallery: [
      { type: "full", img: "/assets/28d3e35ba177c27b89b63a405db317b1d920ce1d.png" },
      { type: "half", imgs: ["/assets/28d3e35ba177c27b89b63a405db317b1d920ce1d.png", "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png"] },
    ],
    related: [
      { name: "Covalent", category: "tech", img: "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png", slug: "covalent" },
      { name: "Spanning Labs", category: "fintech", img: "/assets/a15ee6970401f72f8376e623a0d7f379a2f5a5b7.png", slug: "spanning-labs" },
    ],
  },
  {
    slug: "stackdeck",
    name: "StackDeck",
    client: "StackDeck",
    industry: "Tech",
    tagline: "pitch decks that close deals",
    services: ["Brand Identity", "Presentation Design", "Copywriting"],
    challenge:
      "StackDeck needed a brand that reflected professionalism and clarity for founders pitching to investors.",
    solution:
      "A confident, structured identity with a strong typographic system — built to win rooms.",
    heroImg: "/assets/e0273bf3c6ebff83f16c5a210e87202778a7d4d3.png",
    gallery: [
      { type: "full", img: "/assets/e0273bf3c6ebff83f16c5a210e87202778a7d4d3.png" },
    ],
    related: [
      { name: "Epoch", category: "tech", img: "/assets/28d3e35ba177c27b89b63a405db317b1d920ce1d.png", slug: "epoch" },
      { name: "Covalent", category: "tech", img: "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png", slug: "covalent" },
    ],
  },
  {
    slug: "spanning-labs",
    name: "Spanning Labs",
    client: "Spanning Labs",
    industry: "Fintech",
    tagline: "financial infrastructure for builders",
    services: ["Brand Strategy", "Web Design", "UI/UX"],
    challenge:
      "Spanning Labs needed to establish trust and credibility quickly in a highly regulated, competitive market.",
    solution:
      "A serious, systematic brand built on precision and transparency — communicating security without sacrificing personality.",
    heroImg: "/assets/a15ee6970401f72f8376e623a0d7f379a2f5a5b7.png",
    gallery: [
      { type: "full", img: "/assets/a15ee6970401f72f8376e623a0d7f379a2f5a5b7.png" },
      { type: "half", imgs: ["/assets/a15ee6970401f72f8376e623a0d7f379a2f5a5b7.png", "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png"] },
    ],
    related: [
      { name: "Covalent", category: "tech", img: "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png", slug: "covalent" },
      { name: "MedMe", category: "health care", img: "/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png", slug: "medme" },
    ],
  },
];
