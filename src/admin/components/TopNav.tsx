// components/layout/TopNav.tsx
import { Search, Bell, User } from 'lucide-react';

export function TopNav() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center md:hidden">
              {/* Mobile menu button would go here */}
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <h1 className="text-lg font-bold text-gray-900">A Million Techies</h1>
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
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
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