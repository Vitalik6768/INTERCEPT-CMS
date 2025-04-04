'use server'

import { revalidatePath } from 'next/cache'
import { db } from '~/server/db'

export async function getPosts() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return posts.map(post => ({
      id: post.slug,
      title: post.title || post.name,
      excerpt: post.description || '',
      content: post.content,
      coverImage: post.image || '/blog/working-on.jpg',
      date: post.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      author: {
        name: post.author || 'SHOGUN SEO',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      },
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

