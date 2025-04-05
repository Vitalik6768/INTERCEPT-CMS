"use client"
import React from 'react'
import ImagePickerField from './_components/ImageUpload'
// import ImagePickerField from './_components/ImageUpload'

function hello() {
  //https://www.youtube.com/watch?v=SjkGWyWEVjI&t=1178s
  return (
    <>
    <div className='justify-center items-center flex'>
      <ImagePickerField
        label="Image"
        value=""
        onChange={(value) => {}}
      />
    </div>
    </>

  )
}

export default hello
