import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              {/* <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              /> */}
            </div>
            <div className="text-sm text-gray-600">
              <span>SHOGUN SEO</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard; 