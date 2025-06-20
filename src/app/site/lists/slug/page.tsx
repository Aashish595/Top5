import { notFound } from "next/navigation";
import { getListBySlug } from "@/lib/sanity/queries";
import { List as SanityList } from "@/types";
import { urlForImage } from "@/lib/sanity/utils";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";

interface ListPageProps {
  params: {
    slug: string;
  };
}

export default async function ListPage({ params }: ListPageProps) {
  const list = await getListBySlug(params.slug);
  if (!list) return notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(list.category
      ? [{
          label: list.category.title,
          href: `/${list.category.slug.current}`,
        }]
      : []),
    { label: list.title } // Current page, no href
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{list.title}</h1>
          {list.category && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                Published: {new Date(list.publishedAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>Category: {list.category.title}</span>
            </div>
          )}
        </header>

        {list.items[0]?.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
            <Image
              src={urlForImage(list.items[0].image).url()}
              alt={list.items[0].title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <p className="lead">
            {list.items[0]?.description || `Our top picks for ${list.title}`}
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {list.items.map((item) => (
            <div key={item.position} className="flex gap-6">
              <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden">
                {item.image && (
                  <Image
                    src={urlForImage(item.image).url()}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                    #{item.position}
                  </span>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-primary hover:underline"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <ShareButtons 
          title={list.title} 
          url={`/lists/${params.slug}`} 
        />
      </article>
    </div>
  );
}