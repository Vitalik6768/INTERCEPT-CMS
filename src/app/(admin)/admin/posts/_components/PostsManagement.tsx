"use client"

import type React from "react"

import { useEffect, useState } from "react"
// import { Input } from "@/components/ui/input"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { Badge } from "~/components/ui/badge"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Input } from "~/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { getPosts } from "~/app/(admin)/_actions/get-posts"

// Sample post data type
interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
}

// Sample initial data




export default function PostsManagement() {
    const [posts, setPosts] = useState<Post[]>()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentPost, setCurrentPost] = useState<Post | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        status: "draft" as "published" | "draft",
    })
    //   const initialPosts: Post[] = posts


    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    // Open create dialog
    const handleCreateClick = () => {
        setFormData({
            title: "",
            excerpt: "",
            status: "draft",
        })
        setIsCreateDialogOpen(true)
    }

    // Open edit dialog


    // Open delete dialog
    const handleDeleteClick = (post: Post) => {
        setCurrentPost(post)
        setIsDeleteDialogOpen(true)
    }

    // Create new post
    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const allPosts = await getPosts()
        console.log(allPosts)
        if (allPosts) {
            console.log('ok')
            setPosts(allPosts)
        }
    }

    if (!posts) {
        return <div>Loading...</div>
    }
    // if(posts){
    //     return (
    //         <div>
    //             <h1>Posts</h1>
    //             {posts.map((post) => (
    //                 <div key={post.id}>
    //                     <h2>{post.title}</h2>
    //                     <p>{post.excerpt}</p>
    //                 </div>
    //             ))}
  
    //         </div>
    //     )
    // }


    if(posts){
        return (
            <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Posts</h2>
              <Button onClick={handleCreateClick}>
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Button>
            </div>
      
            {/* Posts Table */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Excerpt</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{post.excerpt}</TableCell>
                      <TableCell>
                        <Badge variant={"default"}>published</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{post.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                            // onClick={() => handleEditClick(post)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(post)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {posts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No posts found. Create your first post!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
      
            {/* Create Post Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter post title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Enter post excerpt"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Create Post</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
      
            {/* Edit Post Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-title">Title</Label>
                    <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-excerpt">Excerpt</Label>
                    <Textarea
                      id="edit-excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <select
                      id="edit-status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Update Post</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
      
            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the post "{currentPost?.title}" from the
                    database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    // onClick={handleDeletePost}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
    
        )

    }

   

}



