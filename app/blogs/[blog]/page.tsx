import type { Metadata } from 'next';
import Link from 'next/link';

import { getBlog } from 'lib/shopify';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { blog: string };
}): Promise<Metadata> {
  const blog = await getBlog(params.blog);
  if (!blog) return notFound();
  return {
    title: blog.title,
    description: ''
  };
}

export default async function Page({ params }: { params: { blog: string } }) {
  const blog = await getBlog(params.blog);
  if (!blog) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{blog.title}一覧</h1>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {blog.articles.edges.map((article: any) => {
          const node = article.node;
          return (
            <div
              className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
              key={node.id}
            >
              <Link href={`/blogs/${params.blog}/${node.id.replace('gid://shopify/Article/', '')}`}>
                <img className="rounded-t-lg" src={node.image.url} alt={node.title} />
              </Link>
              <div className="p-5">
                <Link
                  href={`/blogs/${params.blog}/${node.id.replace('gid://shopify/Article/', '')}`}
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {node.title}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {node.content.substr(0, 50)}
                </p>
                <Link
                  href={`/blogs/${params.blog}/${node.id.replace('gid://shopify/Article/', '')}`}
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
