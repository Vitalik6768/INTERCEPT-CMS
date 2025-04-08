"use client"
import React, { useEffect, useState } from 'react'
import ImagePickerField from './_components/ImageUpload'
import { getImages } from '../../actions/get-images'
import Image from 'next/image'
import { toast } from 'sonner'

interface Image {
  id: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  imageId: string
}

function GalleryPage() {
  const [images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showUrl, setShowUrl] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchImages = async () => {
    try {
      setIsLoading(true)
      const images = await getImages()
      setImages(images)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (imageId: string, id: number) => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/files?imageId=${imageId}&id=${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setImages(images.filter(img => img.id !== id))
        setIsDeleting(false)
        toast.success('Image deleted successfully')
      } else {
        toast.error('Failed to delete image')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Error deleting image')
    } finally {
      setIsDeleting(false)
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
          images.map((image, index) => (
            <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group">
              <img 
                src={image.imageUrl} 
                alt={`Image ${image.id}`} 
                width={100} 
                height={100}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/65 p-2">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowUrl(showUrl === image.id ? null : image.id)}
                    className="text-white text-sm hover:underline hover:cursor-pointer"
                  >
                    {showUrl === image.id ? 'Hide URL' : 'Show URL'}
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={() => handleDelete(image.imageId, image.id)}
                    className="text-red-400 text-sm hover:text-red-300 hover:cursor-pointer"
                  >
                    
                    {isDeleting ? 'Deleting...' : 'Delete'}   
                  </button>
                </div>
                {showUrl === image.id && (
                  <p className="text-white text-xs break-all mt-1">{image.imageUrl}</p>
                )}
              </div>
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
