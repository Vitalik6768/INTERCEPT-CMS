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