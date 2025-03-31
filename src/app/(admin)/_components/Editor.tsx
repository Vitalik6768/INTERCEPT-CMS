"use client"

import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
// import { Toolbar } from "./toolbar"
import { Save } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Toolbar } from "./Toolbar"

const initialContent = `
<h2>Welcome to your Tiptap Editor</h2>
<p>This is a full-featured content editor built with Tiptap and Next.js.</p>
<p>Some example formatting:</p>
<ul>
  <li>This is a bullet list</li>
  <li>With multiple items</li>
</ul>
<p>You can also use <strong>bold</strong>, <em>italic</em>, and <u>underlined</u> text.</p>
<blockquote>This is a blockquote that you can use for important information.</blockquote>
<p>Try out all the formatting options in the toolbar above!</p>
`

export function Editor() {
  const [content, setContent] = useState(initialContent)
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
          class: "rounded-md max-w-full",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  const saveContent = () => {
    // In a real app, you would save to a database or API
    console.log("Saving content:", content)
    // toast({
    //   title: "Content saved",
    //   description: "Your content has been saved successfully.",
    // })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border rounded-lg shadow-sm">
        {editor && <Toolbar editor={editor} />}
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mt-4 focus:outline-none min-h-[300px] px-4"
        />
      </Card>

      <div className="flex justify-between">
        <Button onClick={saveContent} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Content
        </Button>

        <Button variant="outline" onClick={() => editor?.commands.clearContent(true)}>
          Clear
        </Button>
      </div>

      {/* <div className="mt-8">
        <h3 className="mb-2 text-lg font-medium">Content Preview:</h3>
        <Card className="p-6 border rounded-lg">
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Card>
      </div> */}
    </div>
  )
}