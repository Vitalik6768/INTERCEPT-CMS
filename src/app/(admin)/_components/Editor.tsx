"use client"

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from "@tiptap/extension-text-style";
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

import CharacterCount from '@tiptap/extension-character-count' // Import CharacterCount
import {
  Bold, Italic, Strikethrough, List, ListOrdered,
  CheckSquare, Quote, Undo, Redo, Code
} from 'lucide-react'
import { Heading1, Heading2, Heading3, Heading4 } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Toggle } from '~/components/ui/toggle'

export default function Editor() {
  const [wordCount, setWordCount] = useState(0)
  const [content, setContent] = useState<string>('<h3>hello</h3>')
  const [showHtml, setShowHtml] = useState(false)

  const recivedData = (data: string) => {
    setContent(data)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem,
      TextStyle,
      CharacterCount,
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose pl-2",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex items-start my-4",
        },
        nested: true,
      }),
    ],
      // Add CharacterCount here
  
    content:`<table border="1">
  <tbody><tr>
    <th>Header 1</th>
    <th>Header 2</th>
    <th>Header 3</th>
  </tr>
  <tr>
    <td>Row 1, Col 1</td>
    <td>Row 1, Col 2</td>
    <td>Row 1, Col 3</td>
  </tr>
  <tr>
    <td>Row 2, Col 1</td>
    <td>Row 2, Col 2</td>
    <td>Row 2, Col 3</td>
  </tr>
</tbody></table>`,
    
    
    // content,    

    onUpdate: ({ editor }) => {
      setWordCount(editor.storage.characterCount.words)
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none',
      },
    },
  })


  useEffect(() => {
    if (editor && content) {
      // const cleanedContent = input.replace(/^```html\s*|```$/g, "");
      editor.commands.setContent(content)
    }
  }, [content])


  if (!editor) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto h-full">
      <div className="px-6 py-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">Editor</h2>
          <div className="flex gap-2">
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
      <div className="px-6">
        {!showHtml ? (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              <Toggle
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                aria-label="Toggle H1"
              >
                <Heading1 className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                aria-label="Toggle H2"
              >
                <Heading2 className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                aria-label="Toggle H3"
              >
                <Heading3 className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('heading', { level: 4 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                aria-label="Toggle H4"
              >
                <Heading4 className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                aria-label="Toggle bold"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Toggle italic"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                aria-label="Toggle strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Toggle bullet list"
              >
                <List className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Toggle ordered list"
              >
                <ListOrdered className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('taskList')}
                onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
                aria-label="Toggle task list"
              >
                <CheckSquare className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('blockquote')}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                aria-label="Toggle blockquote"
              >
                <Quote className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={editor.isActive('code')}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
                aria-label="Toggle code"
              >
                <Code className="h-4 w-4" />
              </Toggle>

              <Button
                variant="outline"
                size="icon"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                aria-label="Undo"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                aria-label="Redo"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
            <div className="border rounded-md p-4 min-h-[250px]">
              <EditorContent editor={editor} />
            </div>
          </>
        ) : (
          <div className="border rounded-md p-4 min-h-[250px]">
            <pre className="whitespace-pre-wrap">
              {editor?.getHTML()}
            </pre>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-600">
          Word count: {wordCount}
        </div>
      </div>
    </div>
  )
}