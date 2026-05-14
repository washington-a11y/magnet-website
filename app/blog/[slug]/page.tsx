import { notFound } from "next/navigation";
import NavScroll from "../../components/NavScroll";
import BlogItemHero from "../../components/BlogItemHero";
import BlogItemContent from "../../components/BlogItemContent";
import BlogItemRelated from "../../components/BlogItemRelated";
import CTASection from "../../components/CTASection";
import Footer from "../../components/Footer";
import { POSTS, POST_CONTENT } from "../../data/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  return { title: post ? `${post.title} — Magnet Studio` : "Blog — Magnet Studio" };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const content = POST_CONTENT[params.slug];
  const related = POSTS.filter((p) => p.slug !== params.slug).slice(0, 3);

  return (
    <main>
      <NavScroll alwaysVisible />
      <div className="pt-[61px]">
        <BlogItemHero post={post} />
        {content && <BlogItemContent content={content} />}
        <BlogItemRelated posts={related} />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
