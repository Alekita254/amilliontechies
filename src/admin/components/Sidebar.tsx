// components/layout/Sidebar.tsx
import { Briefcase, Home, Users, Settings, BarChart2, HelpCircle } from 'lucide-react';
// import Logo  from '/images/amilliontechies.svg';

export function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: Home, href: '#' },
    { name: 'blogs', icon: Briefcase, href: '/admin/blog' },
    { name: 'Team', icon: Users, href: '#' },
    { name: 'Analytics', icon: BarChart2, href: '#' },
  ];

  const secondaryItems = [
    { name: 'Settings', icon: Settings, href: '#' },
    { name: 'Help', icon: HelpCircle, href: '#' },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* <Logo className="mx-auto h-12 w-auto" /> */}
          
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-3 text-sm font-medium rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-green-500" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">User Name</p>
              <p className="text-xs font-medium text-gray-500">View profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}