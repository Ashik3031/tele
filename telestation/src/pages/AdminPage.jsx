import React from 'react';
import { LogOut } from 'lucide-react';
import AdminDashboard from '../Components/AdminDashboard';

export default function AdminPage({ onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-medium transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
      <AdminDashboard />
    </div>
  );
}
