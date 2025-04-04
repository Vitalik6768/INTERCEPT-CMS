import React from 'react'
import type { Metadata } from 'next'
import { getPost } from '../../_actions/get-post'

interface Post {
    id: number
    slug: string
    name: string
    content: string
    image: string | null
    category: string | null
    author: string | null
    title: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const post = (await getPost(slug)) as Post | null
    if (!post) {
        return <div>Post not found</div>
    }
    return (
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <main className="leading-relaxed">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">
                    {post.title || 'Untitled Post'}
                </h1>
                <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </main>
        </article>
    )
}

export default page
