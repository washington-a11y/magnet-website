import NavScroll       from "../../components/NavScroll";
import WorkItemHero    from "../../components/WorkItemHero";
import WorkItemDetail  from "../../components/WorkItemDetail";
import WorkItemRelated from "../../components/WorkItemRelated";
import CTASection      from "../../components/CTASection";
import Footer          from "../../components/Footer";
import { PROJECTS }    from "../../data/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project  = PROJECTS.find((p) => p.slug === slug);
  return {
    title: project
      ? `${project.name} — Magnet Studio`
      : "Work — Magnet Studio",
    description: project?.tagline ?? "A case study by Magnet Studio.",
  };
}

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project  = PROJECTS.find((p) => p.slug === slug) ?? PROJECTS[0];

  return (
    <main>
      {/* Always-visible nav — no hero on this page */}
      <NavScroll alwaysVisible />

      <div className="pt-[61px]">
        {/* 1. Full-width hero image */}
        <WorkItemHero heroImg={project.heroImg} projectName={project.name} />

        {/* 2. Project overview + gallery */}
        <WorkItemDetail project={project} />

        {/* 3. Related projects */}
        <WorkItemRelated projects={project.related} />

        {/* 4. CTA */}
        <CTASection />

        {/* 5. Footer */}
        <Footer />
      </div>
    </main>
  );
}
