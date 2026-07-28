'use client';

import React from 'react';
import { Shield, Mail, User, Settings, Home as HomeIcon, MoreHorizontal, PlusCircle, Wallet, MoreVertical } from 'lucide-react';

type TabType = 'dashboard' | 'messages' | 'profile' | 'settings';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;
  account: string | null;
  connectWallet: () => Promise<void> | void;
  onSuggest: () => void;
}

export function Sidebar({ activeTab, setActiveTab, account, connectWallet, onSuggest }: SidebarProps) {
  return (
    <header className="hidden md:flex flex-col w-20 xl:w-64 border-r border-gray-200 h-screen sticky top-0 bg-white">
      <div className="p-4 xl:p-6 flex-1 flex flex-col gap-2">
        {/* Logo */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-50 cursor-pointer transition mb-2 xl:mb-4">
          <Shield className="text-blue-500" size={32} />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 xl:gap-4 mt-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex items-center gap-4 p-3 rounded-full w-fit xl:w-full transition ${activeTab === 'dashboard' ? 'font-bold bg-gray-100' : 'hover:bg-gray-100'}`}
          >
            <HomeIcon size={26} className={activeTab === 'dashboard' ? 'text-gray-900' : 'text-gray-700'} />
            <span className="hidden xl:block text-xl">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('messages')} 
            className={`flex items-center gap-4 p-3 rounded-full w-fit xl:w-full transition ${activeTab === 'messages' ? 'font-bold bg-gray-100' : 'hover:bg-gray-100'}`}
          >
            <Mail size={26} className={activeTab === 'messages' ? 'text-gray-900' : 'text-gray-700'} />
            <span className="hidden xl:block text-xl">Messages</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`flex items-center gap-4 p-3 rounded-full w-fit xl:w-full transition ${activeTab === 'profile' ? 'font-bold bg-gray-100' : 'hover:bg-gray-100'}`}
          >
            <User size={26} className={activeTab === 'profile' ? 'text-gray-900' : 'text-gray-700'} />
            <span className="hidden xl:block text-xl">Profile</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex items-center gap-4 p-3 rounded-full w-fit xl:w-full transition ${activeTab === 'settings' ? 'font-bold bg-gray-100' : 'hover:bg-gray-100'}`}
          >
            <Settings size={26} className={activeTab === 'settings' ? 'text-gray-900' : 'text-gray-700'} />
            <span className="hidden xl:block text-xl">Settings</span>
          </button>
        </nav>

        {/* Primary Action Button */}
        <button onClick={onSuggest} className="hidden xl:block bg-blue-500 hover:bg-blue-600 text-white font-bold text-[17px] py-4 rounded-full mt-6 transition shadow-sm">
          Suggest Project
        </button>
        <button onClick={onSuggest} className="xl:hidden w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full mt-6 flex items-center justify-center transition shadow-sm">
          <PlusCircle size={24} />
        </button>
      </div>

      {/* User Mini Profile Bottom Left */}
      <div className="p-4 xl:p-6 mb-4">
        {account ? (
          <div className="flex items-center gap-3 p-3 rounded-full hover:bg-gray-100 cursor-pointer transition">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {account.slice(2,4).toUpperCase()}
            </div>
            <div className="hidden xl:block flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-900 truncate">Connected</p>
              <p className="text-gray-500 text-xs font-mono truncate">{account.slice(0, 6)}...{account.slice(-4)}</p>
            </div>
            <MoreHorizontal className="hidden xl:block text-gray-500" size={18} />
          </div>
        ) : (
          <button onClick={connectWallet} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-full text-[15px] transition shadow-sm">
            <span className="hidden xl:block">Connect Wallet</span>
            <Wallet className="xl:hidden mx-auto" size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
