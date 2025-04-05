'use server'

import { revalidatePath } from 'next/cache'
import { db } from '~/server/db'

interface SavePostInput {
  content: string
  title?: string
  slug: string
  name: string
  description: string
}

export async function PublishPost(data: SavePostInput) {
  try {
    await db.post.create({
      data: {
        content: data.content,
        title: data.title,
        slug: data.slug,
        name: data.name,
        description: data.description,
      },
    })

    revalidatePath('/admin/posts')
    return { success: true }
  } catch (error) {
    console.error('Error saving post:', error)
    return { success: false, error: 'Failed to save post' }
  }
}

