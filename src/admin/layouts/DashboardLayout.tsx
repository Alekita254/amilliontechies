import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Outlet } from 'react-router-dom'; // ✅ Add this

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* ✅ This will render DashboardPage */}
          </div>
        </main>
      </div>
    </div>
  );
}
