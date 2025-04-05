import React from 'react'
import { Editor } from './_components/Editor'
import { getPost } from '~/app/(admin)/actions/get-post'

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post || Array.isArray(post)) {
    return <div>Post not found</div>
  }

  return (
        <div className='justify-center items-center flex h-screen bg-gray-100'>
          <Editor {...post} />
        </div>
  )
}

export default page