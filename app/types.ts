export type GalleryBlock =
  | { type: "full"; img: string }
  | { type: "half"; imgs: [string, string] };

export type RelatedProject = {
  name: string;
  category: string;
  img: string;
  slug: string;
};

export type ProjectData = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  tagline: string;
  services: string[];
  challenge: string;
  solution: string;
  heroImg: string;
  gallery: GalleryBlock[];
  related: RelatedProject[];
};
