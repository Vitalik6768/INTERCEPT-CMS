'use server'

import { revalidatePath } from 'next/cache'
import { db } from '~/server/db'

interface SavePostInput {
  content: string
  title?: string
  slug: string
  name: string
  id: number
}

export async function savePost(data: SavePostInput) {
  try {
    await db.post.update({
      where: {
        id: data.id // assuming slug is unique
      },
      data: {
        content: data.content,
        title: data.title,
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

