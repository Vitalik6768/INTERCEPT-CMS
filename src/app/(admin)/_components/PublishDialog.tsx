"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { PublishPost } from "../_actions/publish-post"
import { toast } from "sonner"
import { Globe } from "lucide-react"

interface PublishDialogProps {
    content: string
   
}

export function PublishDialog({ content }: PublishDialogProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        publishContent()
        setName("")
        setDescription("")
    }

    const publishContent = async () => {
        setIsLoading(true)
        try {
          const slug = name.toLowerCase().replace(/\s+/g, '-')
          const result = await PublishPost({
            content: content,
            slug: slug,
            name: name,
            title: name,
            description: description
          })
    
          if (result.success) {
            toast.success("Content saved successfully")
            setIsOpen(false)
          } else {
            console.error("Failed to save content")
            toast.error("Failed to save content")
          }
        } catch (error) {
          console.error("Error saving content:", error)
          toast.error("Error saving content")
        } finally {
          setIsLoading(false)
        }
      }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="outline">
                    <Globe className="mr-2 h-4 w-4" />
                    Publish Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Publish Post</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter post name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter post description"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Publishing..." : "Publish"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
