export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  img: string;
  featured?: boolean;
};

export type BlogPostContent = {
  quote: { text: string; attribution: string };
  bodyHtml: string;
  bodyHtml2: string;
  conclusionHtml: string;
};

export const POST_CONTENT: Record<string, BlogPostContent> = {
  "why-retainer-models-work-better": {
    quote: {
      text: "If you think good design is expensive, you should look at the cost of bad design.",
      attribution: "– Ralf Speth, CEO of Jaguar Land Rover.",
    },
    bodyHtml: `
      <p>In the ever-evolving world of design and creative services, businesses are increasingly recognizing the limitations of traditional project-based engagements. While project-based work has its place, retainer models are proving to be a superior approach for companies seeking consistent, high-quality design support. Here's why retainer partnerships are transforming the way businesses work with design teams.</p>
      <p><strong>Continuity and Consistency</strong></p>
      <p>One of the most significant advantages of retainer models is the continuity they provide. Unlike project-based work, where designers jump in and out of your brand ecosystem, retainer partnerships allow designers to deeply understand your brand, voice, and vision over time.</p>
      <p><strong>Faster Turnaround Times</strong></p>
      <p>Project-based engagements often involve lengthy kickoff meetings, discovery phases, and administrative overhead for each new initiative. With a retainer model, much of this groundwork is already complete.</p>
      <p><strong>Predictable Costs and Budgeting</strong></p>
      <p>Retainer models provide financial predictability that project-based work simply cannot match. Instead of unpredictable invoices that fluctuate wildly based on project scope, you have a consistent monthly investment that makes budgeting straightforward and manageable.</p>
      <p><strong>Priority Access and Dedicated Support</strong></p>
      <p>When you're a retainer client, you're not competing with dozens of other projects for your designer's attention. You have priority access to your design partner's time and expertise.</p>
    `,
    bodyHtml2: `
      <p><strong>Strategic Partnership vs. Transactional Relationship</strong></p>
      <p>Perhaps the most transformative aspect of retainer models is how they shift the designer-client dynamic from transactional to strategic. Retainer partnerships encourage designers to think strategically about your long-term goals.</p>
      <p><strong>Flexibility and Adaptability</strong></p>
      <p>Business needs change, and retainer models are built to accommodate this reality. Instead of locking you into a rigid project scope, retainers allow you to pivot priorities as market conditions shift.</p>
      <p><strong>Better Work Through Deeper Understanding</strong></p>
      <p>Quality design doesn't come from just following a brief — it comes from understanding context, goals, audience, and business strategy. Retainer relationships give designers the time and exposure to develop this deeper understanding.</p>
    `,
    conclusionHtml: `
      <p><strong>Conclusion</strong></p>
      <p>As businesses increasingly recognize that great design is an ongoing need rather than an occasional project, retainer models are becoming the gold standard for design partnerships. The continuity, efficiency, predictability, and strategic value they provide make them a superior choice for companies committed to maintaining high-quality design standards.</p>
      <p>If you're still relying on project-based design work, it might be time to consider how a retainer partnership could transform your approach to design and unlock new levels of creativity, consistency, and business impact.</p>
    `,
  },
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
