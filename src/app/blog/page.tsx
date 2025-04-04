import type { Metadata } from 'next';
import type { JSX } from 'react';
import BlogGrid from '~/components/(main)/custom/BlogGrid';
import type { BlogPost } from '~/types';
import { getPosts } from './_actions/get-posts';

export const metadata: Metadata = {
  title: "our blog",
  
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "our blog",
    type: "website",
  },
};

export default async function BlogPage(): Promise<JSX.Element> {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shogan Blog</h1>
        <p className="text-xl text-gray-600">
          Stay up to date with the latest news, tutorials, and insights
        </p>
      </div>
      <BlogGrid posts={posts} />
    </div>
  );
} 