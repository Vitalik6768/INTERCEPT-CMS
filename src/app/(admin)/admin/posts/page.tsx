
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PostsManagement from "./_components/PostsManagement";

export default function Home() {
    return (
        <main className="container mx-auto py-10 px-10 bg-gray-100">
           
            <PostsManagement />
        </main>

    )
}

