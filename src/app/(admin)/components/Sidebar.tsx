// import Link from 'nex';
import { FileText, Settings } from 'lucide-react';
import Link from 'next/link';

const links = [
  {
    href: '/admin/posts',
    icon: FileText,
    label: 'Posts'
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Settings'
  }
];

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 w-36 h-screen bg-gray-800 text-white p-4 z-20">
      <nav className="space-y-4">
        <div className="text-xl font-bold mb-6 text-gray-400">
          Blog CMS
        </div>
        
        <ul className="space-y-2 text-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300"
              >
                <link.icon className="mr-2" size={20} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
