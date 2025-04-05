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
import { getPosts } from "~/app/(admin)/actions/get-posts"
import Link from "next/link"
import { deletePost } from "~/app/(admin)/actions/delete-post"
import type { Post } from "~/types"
import { toast } from "sonner"


export default function PostsManagement() {
    const [posts, setPosts] = useState<Post[]>()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentPost, setCurrentPost] = useState<Post>()
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

    const handleDeletePost = async () => {
        if (currentPost) {
          try {
            await deletePost({ id: currentPost.id })
            setIsDeleteDialogOpen(false)
            fetchPosts()
            toast.success('Post deleted successfully')
          } catch (error) {
            toast.error('Error deleting post:')
            console.error('Error deleting post:')
          }
        }
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
            setPosts(allPosts as unknown as Post[]) // First cast to unknown then to Post[] to avoid type error
        }
    }

    if (!posts) {
        return <div>Loading...</div>
    }
 
    if(posts){
        return (
            <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">All Posts</h2>
              <Link href="/admin">
              <Button onClick={handleCreateClick} className="bg-primary hover:bg-primary/90 hover:cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> NEW POST
              </Button>
              </Link>
            </div>
      
            {/* Posts Table */}
            <div className="border rounded-lg shadow-sm bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold">Title</TableHead>
                    <TableHead className="hidden md:table-cell font-semibold">Excerpt</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="hidden sm:table-cell font-semibold">Date</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium"><Link href={`/admin/post/${post.slug}`}>{post.title}</Link></TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{post.excerpt}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">published</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{post.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
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
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-lg">No posts found</p>
                          <p className="text-sm">Create your first post to get started!</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
      
            {/* Create Post Dialog */}
           
      
            {/* Edit Post Dialog */}
           
    
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
                    onClick={handleDeletePost}
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



