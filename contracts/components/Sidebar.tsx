'use client';

import React from 'react';
import { 
  Shield, Home, Mail, User, Settings, BarChart2, 
  Bookmark, TrendingUp, Search, Wallet, HelpCircle, AlertTriangle 
} from 'lucide-react';

interface SidebarProps {
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  openWizard: () => void;
  account: string | null;
  connectWallet: () => void;
}

export function Sidebar({ activeRoute, setActiveRoute, openWizard, account, connectWallet }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'search', label: 'Explore', icon: Search },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'bookmarks', label: 'Saved', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminItems = [
    { id: 'admin', label: 'Gov Portal', icon: Shield },
    { id: 'report', label: 'Reports', icon: AlertTriangle },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 h-screen sticky top-0 bg-white">
      <div className="p-6 flex-1 flex flex-col gap-2 overflow-y-auto">
        <div className="flex items-center gap-3 mb-6 px-3">
          <Shield className="text-blue-600" size={32} />
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">CivicCheck</h1>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveRoute(item.id)} 
              className={`flex items-center gap-4 px-4 py-3 rounded-full transition ${activeRoute === item.id ? 'font-bold bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <item.icon size={24} className={activeRoute === item.id ? 'text-gray-900' : 'text-gray-500'} />
              <span className="text-lg">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin & Support</p>
          {adminItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveRoute(item.id)} 
              className="flex items-center gap-4 px-4 py-2.5 rounded-full text-gray-600 hover:bg-gray-50 transition"
            >
              <item.icon size={20} />
              <span className="text-md">{item.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={openWizard}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[17px] py-4 rounded-full mt-6 transition shadow-md hover:shadow-lg"
        >
          Suggest Project
        </button>
      </div>

      <div className="p-6 border-t border-gray-100">
        {account ? (
          <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {account.slice(2,4).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-900 truncate">Wallet Linked</p>
              <p className="text-gray-500 text-xs font-mono truncate">{account.slice(0, 6)}...{account.slice(-4)}</p>
            </div>
          </div>
        ) : (
          <button onClick={connectWallet} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-full text-[15px] transition shadow-sm flex justify-center items-center gap-2">
            <Wallet size={18} /> Connect Wallet
          </button>
        )}
      </div>
    </aside>
  );
}
