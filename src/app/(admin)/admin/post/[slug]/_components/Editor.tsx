"use client"

import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { Save } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Toolbar } from "./Toolbar"
import { savePost } from "../../../../actions/save-posts"
import { toast } from "sonner"
import type { Post } from "~/types"
import Heading from "@tiptap/extension-heading"



export function Editor( post: Post ) {
  const [showHtml, setShowHtml] = useState(false)
  const initialContent = `${post.content}`

  const [content, setContent] = useState(initialContent)
  const [htmlContent, setHtmlContent] = useState(initialContent)

  //   const { toast } = useToast()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your content...",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md w-[1000px] h-[1000px]",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: "text-2xl font-bold",
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
      setHtmlContent(editor.getHTML())
    },
  })

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value)
    if (editor) {
      editor.commands.setContent(e.target.value)
    }
  }

  const saveContent = async () => {
    try {
      const result = await savePost({
        content: content,
        id: post.id,
        slug: post.slug, // You might want to generate this or pass it as a prop
        name: post.name, // You might want to pass this as a prop
        title: post.title ?? 'Not Set', // You might want to pass this as a prop
      })

      if (result.success) {
        toast.success("Content saved successfully")
        // If you want to use toast notifications, uncomment these lines

      } else {
        console.error("Failed to save content")
        toast.error("Failed to save content")

      }
    } catch (error) {
      console.error("Error saving content:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border rounded-lg shadow-sm">
        <div className="px-2 py-2">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-none tracking-tight">Editor</h2>
            <div className="flex gap-2">

              <Button onClick={saveContent} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>


              <Button
                variant="outline"
                onClick={() => setShowHtml(false)}
                className={!showHtml ? 'bg-secondary' : ''}
              >
                Visual
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowHtml(true)}
                className={showHtml ? 'bg-secondary' : ''}
              >
                Code
              </Button>
            </div>
          </div>
        </div>

        {editor && <Toolbar editor={editor} />}
        {
          showHtml ? (
            <div className="border rounded-md">
              <textarea
                value={htmlContent}
                onChange={handleHtmlChange}
                className="whitespace-pre-wrap text-sm font-mono w-full focus:outline-none min-h-[350px] max-h-[350px]  p-4"
              />
            </div>
          ) : (
            <div className="border rounded-md">
              <EditorContent
                editor={editor}
                className="text-sm w-full focus:outline-none min-h-[350px] max-h-[350px] p-4"
              />
            </div>
          )
        }
      </Card >
    </div >
  )
}