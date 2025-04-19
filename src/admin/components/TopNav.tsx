import { Search, Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function TopNav() {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    if (path.startsWith('/admin/blog')) return 'Blog Management';
    if (path.startsWith('/admin/author')) return 'Author Management';
    if (path.startsWith('/admin/community')) return 'Community';
    if (path.startsWith('/admin/analytics')) return 'Analytics';
    if (path.startsWith('/admin/settings')) return 'Settings';
    return 'Admin Panel';
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center md:hidden">
              {/* Spacer for mobile to align with sidebar button */}
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center">
              <h1 className="text-lg font-bold text-gray-900">{getPageTitle()}</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                New Project
              </button>
            </div>
            
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Search className="h-6 w-6" />
              </button>
              
              <button
                type="button"
                className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <User className="h-8 w-8 rounded-full bg-gray-200 p-1 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
