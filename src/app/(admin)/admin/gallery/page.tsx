"use client"
import React, { useEffect, useState } from 'react'
import ImagePickerField from './_components/ImageUpload'
import { getImages } from '../../actions/get-images'
import Image from 'next/image'

interface Image {
  id: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

function GalleryPage() {
  const [images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchImages = async () => {
    try {
      setIsLoading(true)
      const images = await getImages()
      setImages(images)
      console.log(images)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])
  

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-full bg-gray-300" />
            </div>
          ))
        ) : (
          // Actual images
          images.map((image) => (
            <div key={image.id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={image.imageUrl} 
                alt={`Image ${image.id}`} 
                width={100} 
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        )}
      </div>

      <div className="mt-8 justify-center items-center flex">
        <ImagePickerField
          label="Upload Image"
          value=""
          onChange={(value) => {}}
        />
      </div>
    </div>
  )
}

export default GalleryPage
