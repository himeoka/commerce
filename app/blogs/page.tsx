import type { Metadata } from 'next';
import Link from 'next/link';

import { getBlogs } from 'lib/shopify';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({}): Promise<Metadata> {
  const blogs = await getBlogs();

  if (!blogs) return notFound();

  return {
    title: 'Blogs',
    description: 'Blogs'
  };
}

export default async function Page() {
  const blogs = await getBlogs();
  console.log(blogs);
  if (!blogs) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">ブログ一覧</h1>
      <ul>
        {blogs.map((blog) => {
          return (
            <li className="todo-item" key={blog.id}>
              <Link href={`/blogs/${blog.handle}`}>{blog.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
