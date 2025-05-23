import { getPost } from "~/app/(admin)/actions/get-post"
import { notFound } from "next/navigation"
import type { Post } from "~/types"
import { EditPostForm } from "./_components/EditPostForm"

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post || Array.isArray(post)) {
        notFound()
    }

    return (
        <div className="container mx-auto p-4">
            <EditPostForm post={post} />
        </div>
    )
}

export default page
