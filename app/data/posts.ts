export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  img: string;
  featured?: boolean;
};

export const POSTS: BlogPost[] = [
  {
    slug: "why-retainer-models-work-better",
    title: "Why Retainer Models Work Better Than Project-Based Design",
    date: "May 4, 2026",
    readTime: "8 min read",
    img: "/assets/jades/blog/blog 1.png",
    featured: true,
  },
  {
    slug: "how-ux-ui-design-converts-visitors",
    title: "How UX/UI Design Converts Visitors into Customers",
    date: "Feb 24, 2026",
    readTime: "5 min read",
    img: "/assets/jades/blog/blog-image 1.png",
  },
  {
    slug: "how-cohesive-branding-builds-trust",
    title: "How Cohesive Branding Builds Instant Trust",
    date: "Feb 24, 2026",
    readTime: "6 min read",
    img: "/assets/jades/blog/blog-image 2.png",
  },
  {
    slug: "tangible-roi-of-strategic-business-design",
    title: "The Tangible ROI of Strategic Business Design",
    date: "Feb 24, 2026",
    readTime: "4 min read",
    img: "/assets/jades/blog/blog-image 3.png",
  },
];
