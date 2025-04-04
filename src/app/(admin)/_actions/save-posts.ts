'use server'

import { revalidatePath } from 'next/cache'
import { db } from '~/server/db'

interface SavePostInput {
  content: string
  title?: string
  slug: string
  name: string
}

export async function savePost(data: SavePostInput) {
  try {
    await db.post.upsert({
      where: {
        slug: data.slug // assuming slug is unique
      },
      update: {
        content: data.content,
        title: data.title,
        name: data.name,
      },
      create: {
        content: data.content,
        title: data.title,
        slug: data.slug,
        name: data.name,
      }
    })

    revalidatePath('/admin/posts')
    return { success: true }
  } catch (error) {
    console.error('Error saving post:', error)
    return { success: false, error: 'Failed to save post' }
  }
}

