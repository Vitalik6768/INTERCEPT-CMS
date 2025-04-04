import { type Metadata } from "next";
import Link from "next/link";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing content",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 mt-16 ml-36">
          {children}
        </main>
      </div>
    </div>
  );
}
