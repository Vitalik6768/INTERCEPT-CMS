import Link from 'next/link';
import { FileText, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-36 min-h-screen bg-gray-800 text-white p-4">
      <nav className="space-y-4">
        <div className="text-xl font-bold mb-6 text-gray-400">
          Blog CMS
        </div>
        
        <ul className="space-y-2 text-center">
          <li>
            <Link 
              href="/posts" 
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300"
            >
              <FileText className="mr-2" size={20} />
              Posts
            </Link>
          </li>
          
          <li>
            <Link 
              href="/settings" 
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300"
            >
              <Settings className="mr-2" size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
