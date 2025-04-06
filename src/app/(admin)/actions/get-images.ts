'use server'

import { db } from '~/server/db'

export async function getImages() {
    const images = await db.gallery.findMany()
    return images
}
