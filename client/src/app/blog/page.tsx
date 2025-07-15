import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ContentList } from "@/components/ContentList";
import { Card, type CardProps } from "@/components/Card";
async function loader(slug: string) {
  const { data } = await getPageBySlug("blog");
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BlogCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="blog" />
);

export default async function BlogRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);
  return (
    <div className="blog-page">
      <BlockRenderer blocks={blocks} />
      <ContentList
        headline="Check Out Our Latest Articles"
        path="/api/articles"
        component={BlogCard}
      />
    </div>
  );
}
