"use client"

import { type FormEvent, useRef, useState } from "react"

import { Send, Upload, X } from "lucide-react"
import { ImageIcon } from "lucide-react"

import React from 'react'
import { toast } from "sonner"
import { Button } from "~/components/ui/button"

interface ImagePickerFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
}

function ImagePickerField({ label, value, onChange }: ImagePickerFieldProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedImage(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0])
        }
    }

    async function handleSendImage(event: FormEvent) {
        event.preventDefault()
        if (!selectedImage) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', selectedImage)

            const response = await fetch('/api/files', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to upload image')
            }

            const imageUrl = await response.json()
            onChange(imageUrl)
            toast.success("Image uploaded successfully")
        } catch (error) {
            toast.error("Failed to upload image")
            console.error(error)
        } finally {
            setUploading(false)
            setSelectedImage(null)
        }
    }

    return (
        <div>
            {value && (
                <img src={value} alt="Selected image" className="w-full h-auto rounded-md max-w-md mb-4" />
            )}

            <form onSubmit={handleSendImage} className="w-full max-w-md">
                <div
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${dragActive ? "border-primary" : "border-gray-300"
                        } ${selectedImage ? "bg-gray-50" : "bg-white"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                    />
                    {selectedImage ? (
                        <div className="relative aspect-video w-full">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                className="w-full h-full object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                                Drag and drop your image here, or{" "}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-primary hover:text-primary-dark font-medium"
                                >
                                    browse
                                </button>{" "}
                                to choose a file
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                (Supported formats: JPG, PNG, GIF up to 5MB)
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!selectedImage || uploading}
                    >
                        {uploading ? (
                            <>
                                <Upload className="w-4 h-4 mr-2 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Image
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ImagePickerField