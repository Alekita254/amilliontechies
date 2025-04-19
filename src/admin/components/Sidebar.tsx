import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Briefcase,
  Home,
  Users,
  Settings,
  BarChart2,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/admin' },
    { name: 'Blogs', icon: Briefcase, href: '/admin/blog' },
    { name: 'Author', icon: Users, href: '/admin/author' },
    { name: 'Community', icon: Users, href: '/admin/community' },
    { name: 'Analytics', icon: BarChart2, href: '/admin/analytics' },
  ];

  const secondaryItems = [
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
    { name: 'Help', icon: HelpCircle, href: '/admin/help' },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || 
           (href !== '/' && location.pathname.startsWith(href));
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Navigation Item Component
  const NavItem = ({ item }: { item: typeof navItems[0] }) => (
    <a
      href={item.href}
      className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive(item.href)
          ? 'bg-green-100 text-green-700'
          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
      }`}
      onClick={() => setIsOpen(false)}
    >
      <item.icon
        className={`mr-3 h-5 w-5 ${
          isActive(item.href)
            ? 'text-green-500'
            : 'text-gray-500 group-hover:text-green-500'
        }`}
      />
      {item.name}
    </a>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white h-screen sticky top-0">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-center px-4">
            <h1 className="text-xl font-bold text-green-600">Admin Panel</h1>
          </div>
          
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </div>
        
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center w-full">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">User Name</p>
              <a 
                href="/admin/profile" 
                className={`text-xs font-medium ${
                  isActive('/admin/profile')
                    ? 'text-green-600'
                    : 'text-gray-500 hover:text-green-600'
                } transition-colors duration-200`}
              >
                View profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Drawer
  const MobileDrawer = () => (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-30 w-64 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white h-full">
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
            <h1 className="text-xl font-bold text-green-600">Admin Panel</h1>
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <nav className="mt-4 flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </nav>
            
            <div className="px-2 py-4 space-y-1">
              {secondaryItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">User Name</p>
                <a 
                  href="/admin/profile" 
                  className={`text-xs font-medium ${
                    isActive('/admin/profile')
                      ? 'text-green-600'
                      : 'text-gray-500 hover:text-green-600'
                  } transition-colors duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  View profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-10">
        <button
          onClick={toggleSidebar}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      <DesktopSidebar />
      <MobileDrawer />
    </>
  );
}