'use server'

import { db } from '~/server/db'

export async function getPost(slug: string) {
  try {
    const post = await db.post.findFirst({
        where: {
            slug: slug
        }
    })
    return post
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}
