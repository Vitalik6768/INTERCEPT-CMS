'use server'

import { revalidatePath } from 'next/cache'
import { db } from '~/server/db'

interface DeletePostInput {
  id: number
}

export async function deletePost(data: DeletePostInput) {
  try {
    await db.post.delete({
      where: {
        id: data.id // assuming slug is unique
      }
    })

    revalidatePath('/admin/posts')
    return { success: true }
  } catch (error) {
    console.error('Error saving post:', error)
    return { success: false, error: 'Failed to save post' }
  }
}