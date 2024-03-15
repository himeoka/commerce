import type { Metadata } from 'next';

import { getArticle } from 'lib/shopify';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = 'gid://shopify/Article/' + params.id;
  const article = await getArticle(id);
  if (!article) return notFound();
  return {
    title: article.title,
    description: ''
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = 'gid://shopify/Article/' + params.id;
  console.log(id);
  const article = await getArticle(id);
  if (!article) return notFound();
  console.log(article);
  const publishedAt = new Date(article.publishedAt);
  const date = publishedAt.toLocaleDateString();
  return (
    <>
      <h1 className="text-4xl">{article.title}</h1>
      <p>{date}</p>
      <figure className="mt-10">
        <img src={article.image.url} alt={article.title} className="w-full" />
      </figure>
      <div className="mt-10" dangerouslySetInnerHTML={{ __html: article.contentHtml }}></div>
    </>
  );
}
