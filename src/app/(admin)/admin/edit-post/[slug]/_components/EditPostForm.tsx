"use client"

import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"
import { savePost } from "~/app/(admin)/actions/save-posts"
import { toast } from "sonner"
import type { Post } from "~/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface EditPostFormProps {
    post: Post
}

export function EditPostForm({ post }: EditPostFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)

        try {
            const result = await savePost({
                id: post.id,
                slug: post.slug,
                name: formData.get("name") as string,
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                image: formData.get("image") as string,
                content: post.content,
            })

            if (result.success) {
                toast.success("Post updated successfully")
                router.refresh()
            } else {
                toast.error(result.error || "Failed to update post")
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to update post")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Post Name</Label>
                <Input
                    id="name"
                    name="name"
                    defaultValue={post.name}
                    placeholder="Enter post name"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="title">Meta Title</Label>
                <Input
                    id="title"
                    name="title"
                    defaultValue={post.title ?? ""}
                    placeholder="Enter meta title"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={post.description ?? ""}
                    placeholder="Enter meta description"
                    className="min-h-[100px]"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Post Image URL</Label>
                <Input
                    id="image"
                    name="image"
                    defaultValue={post.image ?? ""}
                    placeholder="Enter image URL"
                />
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    )
} 