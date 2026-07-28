'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { 
  Shield, Vote, CheckCircle2, User, Settings, Home as HomeIcon, 
  Bell, Globe, Lock, Mail, Phone, Calendar, MapPin, Palette, Key, 
  Wallet, Camera, MessageCircle, Share, Search, MoreHorizontal, Send, Info
} from 'lucide-react';

// IMPORT THE NEW PHASE 1 COMPONENTS
import { Sidebar } from '@/components/Sidebar';
import { ProjectWizard } from '@/components/ProjectWizard';

type TabType = 'dashboard' | 'messages' | 'profile' | 'settings' | 'search' | 'trending' | 'analytics' | 'bookmarks' | 'admin' | 'report';

export default function Home() {
  // Navigation & UI State
  const [activeRoute, setActiveRoute] = useState<TabType>('dashboard');
  const [activeChat, setActiveChat] = useState<number>(1);
  
  // WIZARD STATE: Controls if the popup is open or closed
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);

  // Web3 & User State
  const [account, setAccount] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Sample On-Chain Tax Funded Projects Data
  const [projects, setProjects] = useState([
    {
      id: 1,
      author: 'Ministry of Transport',
      handle: '@MinTransportIN',
      avatar: 'bg-blue-100 text-blue-600',
      time: '2h',
      name: 'NH-48 Highway Expansion & Repair',
      description: 'We are proposing a major expansion to ease traffic on NH-48. This includes 2 new flyovers and pothole repairs across the 15km stretch.',
      budget: '₹450,000,000',
      region: 'Delhi-NCR',
      category: 'Infrastructure',
      necessaryVotes: 1240,
      overfundedVotes: 310,
    },
    {
      id: 2,
      author: 'Govt Health Dept',
      handle: '@HealthGovKA',
      avatar: 'bg-emerald-100 text-emerald-600',
      time: '5h',
      name: 'Smart City Public Healthcare Hub',
      description: 'Building a state-of-the-art public clinic with subsidized MRI machines and a 24/7 trauma center. Tax funding will cover construction and 5 years of staffing.',
      budget: '₹120,000,000',
      region: 'Bengaluru, KA',
      category: 'Healthcare',
      necessaryVotes: 2890,
      overfundedVotes: 85,
    }
  ]);

  const [voteHistory, setVoteHistory] = useState([
    { projectId: 2, projectName: 'Smart City Public Healthcare Hub', choice: 'Necessary', date: '2026-07-25' }
  ]);

  const chats = [
    { id: 1, name: 'Mayor Sharma', preview: 'Thank you for your feedback on the road...', time: '10m', unread: true },
    { id: 2, name: 'Civic Support Bot', preview: 'Your ZK-Identity verification is complete.', time: '2d', unread: false },
  ];

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
    } else {
      alert('Please install MetaMask to interact with CivicCheck.');
    }
  };

  const verifyCivicId = () => {
    setLoading(true);
    setTimeout(() => {
      setIsVerified(true);
      setLoading(false);
    }, 1200);
  };

  const handleVote = (projectId: number, type: 'necessary' | 'overfunded') => {
    if (!account) return alert('Please connect your account first.');
    if (!isVerified) return alert('Please verify your Civic ID to vote.');

    setLoading(true);
    setTimeout(() => {
      const simulatedTxHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setTxHash(simulatedTxHash);

      const targetProject = projects.find(p => p.id === projectId);
      if (targetProject) {
        setVoteHistory([{
          projectId: projectId,
          projectName: targetProject.name,
          choice: type === 'necessary' ? 'Necessary' : 'Overfunded',
          date: new Date().toISOString().split('T')[0]
        }, ...voteHistory]);
      }

      setProjects(prev => prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            necessaryVotes: type === 'necessary' ? p.necessaryVotes + 1 : p.necessaryVotes,
            overfundedVotes: type === 'overfunded' ? p.overfundedVotes + 1 : p.overfundedVotes,
          };
        }
        return p;
      }));
      setLoading(false);
    }, 1500);
  };

  const renderDashboard = () => (
    <div className="animate-in fade-in duration-300 pb-20 md:pb-0">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-3">
        <h2 className="text-xl font-bold text-gray-900">For You</h2>
      </div>

      {txHash && (
        <div className="m-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-sm">
          <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="font-bold text-emerald-800">Vote Recorded Permanently</p>
            <p className="text-emerald-600 text-xs mt-1 font-mono break-all">{txHash}</p>
          </div>
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {projects.map((project) => (
          <article key={project.id} className="p-4 hover:bg-gray-50 transition flex gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${project.avatar}`}>
              {project.author.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <h3 className="font-bold text-gray-900 truncate">{project.author}</h3>
                  <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                  <span className="text-gray-500 text-sm truncate">{project.handle} &middot; {project.time}</span>
                </div>
                <MoreHorizontal size={18} className="text-gray-400 cursor-pointer shrink-0" />
              </div>
              <div className="mt-1">
                <h4 className="font-bold text-gray-800">{project.name}</h4>
                <p className="text-gray-700 mt-1 text-[15px] leading-snug">{project.description}</p>
              </div>
              <div className="mt-3 border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">{project.category}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12}/> {project.region}</span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Required Budget</p>
                <p className="text-xl font-black text-gray-900">{project.budget}</p>
              </div>
              <div className="mt-4 flex items-center justify-between max-w-md">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition group text-sm">
                  <div className="p-2 rounded-full group-hover:bg-blue-50 transition"><MessageCircle size={18} /></div>142
                </button>
                <button onClick={() => handleVote(project.id, 'necessary')} disabled={loading || !isVerified} className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-500 transition group text-sm disabled:opacity-50">
                  <div className="p-2 rounded-full group-hover:bg-emerald-50 transition"><Vote size={18} /></div>{project.necessaryVotes}
                </button>
                <button onClick={() => handleVote(project.id, 'overfunded')} disabled={loading || !isVerified} className="flex items-center gap-1.5 text-gray-500 hover:text-rose-500 transition group text-sm disabled:opacity-50">
                  <div className="p-2 rounded-full group-hover:bg-rose-50 transition"><Shield size={18} /></div>{project.overfundedVotes}
                </button>
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition group text-sm">
                  <div className="p-2 rounded-full group-hover:bg-blue-50 transition"><Share size={18} /></div>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="p-8 text-center mt-20 animate-in fade-in duration-300">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Shield className="text-gray-400" size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 mt-2">This feature is currently under construction for Phase 2.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 text-gray-900 font-sans flex justify-center selection:bg-blue-200 relative">
      
      {/* 1. THE NEW PHASE 1 SIDEBAR COMPONENT */}
      <Sidebar 
        activeRoute={activeRoute} 
        setActiveRoute={setActiveRoute as (route: string) => void} 
        openWizard={() => setIsWizardOpen(true)} 
        account={account} 
        connectWallet={connectWallet} 
      />

      <main className="flex-1 max-w-2xl w-full min-h-screen border-r border-gray-100 bg-white">
        <div className="md:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-20 px-4 py-3 flex justify-between items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {account ? account.slice(2,4).toUpperCase() : 'U'}
          </div>
          <Shield className="text-blue-500" size={28} />
          <Settings onClick={() => setActiveRoute('settings')} className="text-gray-900 cursor-pointer" size={24} />
        </div>

        {/* Route Rendering */}
        {activeRoute === 'dashboard' ? renderDashboard() : renderPlaceholder(activeRoute.charAt(0).toUpperCase() + activeRoute.slice(1))}
      </main>

      <aside className="hidden lg:block w-80 xl:w-96 p-6 h-screen sticky top-0 overflow-y-auto flex flex-col justify-between">
        <div>
          <div className="relative group">
            <Search className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition" size={18} />
            <input type="text" placeholder="Search projects..." className="w-full bg-gray-100 border border-transparent text-gray-900 text-[15px] rounded-full py-3 pl-12 pr-4 focus:outline-none focus:bg-white focus:border-blue-500 transition" />
          </div>

          {!isVerified && account && (
            <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <h3 className="font-extrabold text-gray-900 text-lg">Verify to Vote</h3>
              <p className="text-gray-600 text-sm mt-1 mb-3 leading-snug">Get your Zero-Knowledge Civic ID to prove you are a unique citizen.</p>
              <button onClick={verifyCivicId} disabled={loading} className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full text-[15px] transition w-full">
                {loading ? 'Verifying...' : 'Get Verified'}
              </button>
            </div>
          )}

          <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl pt-4 shadow-sm">
            <h3 className="font-extrabold text-gray-900 text-xl px-4 mb-2">Trending in Delhi</h3>
            <div className="hover:bg-gray-100 transition px-4 py-3 cursor-pointer">
              <p className="text-xs text-gray-500 flex justify-between">1 &middot; Infrastructure</p>
              <p className="font-bold text-gray-900 mt-0.5">Route 42 Expansion</p>
              <p className="text-xs text-gray-500 mt-0.5">2,500 votes cast</p>
            </div>
            <div className="hover:bg-gray-100 transition px-4 py-4 rounded-b-2xl cursor-pointer">
              <p className="text-[15px] text-blue-500 hover:underline">Show more</p>
            </div>
          </div>
        </div>

        <div className="mt-8 px-2 text-[13px] text-gray-500 space-y-4 pb-4">
           <p>&copy; 2026 CivicCheck. All rights reserved.</p>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-3 pb-safe z-50">
        <button onClick={() => setActiveRoute('dashboard')} className="p-2 transition">
          <HomeIcon size={26} className={activeRoute === 'dashboard' ? 'text-gray-900' : 'text-gray-500'} />
        </button>
        <button onClick={() => setActiveRoute('search')} className="p-2 transition">
          <Search size={26} className={activeRoute === 'search' ? 'text-gray-900' : 'text-gray-500'} />
        </button>
        <button onClick={() => setActiveRoute('profile')} className="p-2 transition">
          <User size={26} className={activeRoute === 'profile' ? 'text-gray-900' : 'text-gray-500'} />
        </button>
      </nav>

      {/* 2. THE NEW PHASE 1 WIZARD COMPONENT (POPUP) */}
      {isWizardOpen && (
        <ProjectWizard onClose={() => setIsWizardOpen(false)} />
      )}
    </div>
  );
}
