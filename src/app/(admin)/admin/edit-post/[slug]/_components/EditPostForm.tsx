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
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

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
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Edit Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-base">Post Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={post.name}
                                placeholder="Enter post name"
                                className="transition-colors focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-base">Meta Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={post.title ?? ""}
                                placeholder="Enter meta title"
                                className="transition-colors focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-base">Meta Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={post.description ?? ""}
                                placeholder="Enter meta description"
                                className="min-h-[100px] transition-colors focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-base">Post Image URL</Label>
                            <Input
                                id="image"
                                name="image"
                                defaultValue={post.image ?? ""}
                                placeholder="Enter image URL"
                                className="transition-colors focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="min-w-[120px] transition-all hover:scale-105"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
} 