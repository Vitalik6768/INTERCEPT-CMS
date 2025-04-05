import React from 'react'
import { Editor } from './_components/Editor'

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (

        <div className='justify-center items-center flex h-screen bg-gray-100'>
          <Editor slug={slug} />
        </div>
 
  )
}

export default page