// import { Editor } from '@tiptap/react'
import React from 'react'
import { Editor } from '../_components/Editor'
import Header from '../_components/Header'
import Sidebar from '../_components/Sidebar'
function page() {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className='justify-center items-center flex h-screen'>
          <Editor />
        </div>
      </div>
    </div>
  )
}

export default page
