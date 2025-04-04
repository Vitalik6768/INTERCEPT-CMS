
import Header from "../../_components/Header";
import Sidebar from "../../_components/Sidebar";
import PostsManagement from "./_components/PostsManagement";

export default function Home() {
    return (
        <main className="container mx-auto py-10 px-10">
            <h1 className="text-3xl font-bold mb-8">Posts Management</h1>
            <PostsManagement />
        </main>

    )
}

