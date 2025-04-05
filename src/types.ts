export interface BlogPost {
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

export interface Post {
    id: number;
    slug: string;
    name: string;
    content: string;
    image: string | null;
    category: string | null;
    author: string | null;
    title: string | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    date?: string;
    excerpt?: string;
}
