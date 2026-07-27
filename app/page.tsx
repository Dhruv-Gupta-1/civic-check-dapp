'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { 
  Shield, 
  Vote, 
  CheckCircle2, 
  User, 
  Settings, 
  Home as HomeIcon, 
  Bell, 
  Globe, 
  Lock,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Smartphone,
  Palette,
  Key,
  Wallet,
  Camera,
  MessageCircle,
  Share,
  Search,
  MoreHorizontal,
  Send,
  Info,
  PlusCircle
} from 'lucide-react';

type TabType = 'dashboard' | 'messages' | 'profile' | 'settings';

export default function Home() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeChat, setActiveChat] = useState<number>(1);

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
      ipfsCid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
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
      ipfsCid: 'QmYwAPJzv5CZsnA625s3X2nemtYgPpHdWEz79ojWcPbdG',
    }
  ]);

  // Sample Messages
  const chats = [
    { id: 1, name: 'Mayor Sharma', preview: 'Thank you for your feedback on the road...', time: '10m', unread: true },
    { id: 2, name: 'Civic Support Bot', preview: 'Your ZK-Identity verification is complete.', time: '2d', unread: false },
    { id: 3, name: 'Local Community Forum', preview: 'Ravi: Does anyone know when voting closes?', time: '1w', unread: false },
  ];

  // Sample Voting History
  const [voteHistory, setVoteHistory] = useState([
    { projectId: 2, projectName: 'Smart City Public Healthcare Hub', choice: 'Necessary', date: '2026-07-25' }
  ]);

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
      alert('Please install MetaMask to interact with the CivicCheck app.');
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
    // Simulating Blockchain Transaction
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

  // --- TAB RENDERERS ---

  const renderDashboard = () => {
    return (
      <div className="animate-in fade-in duration-300 pb-20 md:pb-0">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-3">
          <h2 className="text-xl font-bold text-gray-900">For You</h2>
        </div>

        {/* Suggestion / Post Block */}
        {isVerified && (
          <div className="p-4 border-b border-gray-100 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
              {account ? account.slice(2, 4).toUpperCase() : 'U'}
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="Suggest a new community project..." 
                className="w-full bg-transparent text-lg resize-none outline-none placeholder-gray-500 mt-2"
                rows={2}
              />
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                <div className="text-blue-500 flex gap-2">
                  <MapPin size={18} className="cursor-pointer" />
                  <Camera size={18} className="cursor-pointer" />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded-full text-sm">
                  Suggest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Success Toast */}
        {txHash && (
          <div className="m-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-sm">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-bold text-emerald-800">Vote Recorded Permanently</p>
              <p className="text-emerald-600 text-xs mt-1 font-mono break-all">{txHash}</p>
            </div>
          </div>
        )}

        {/* Feed */}
        <div className="divide-y divide-gray-100">
          {projects.map((project) => (
            <article key={project.id} className="p-4 hover:bg-gray-50 transition flex gap-3">
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${project.avatar}`}>
                {project.author.charAt(0)}
              </div>
              
              {/* Content */}
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

                {/* Budget Card */}
                <div className="mt-3 border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12}/> {project.region}</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Required Budget</p>
                  <p className="text-xl font-black text-gray-900">{project.budget}</p>
                </div>

                {/* Action Bar */}
                <div className="mt-4 flex items-center justify-between max-w-md">
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition group text-sm">
                    <div className="p-2 rounded-full group-hover:bg-blue-50 transition"><MessageCircle size={18} /></div>
                    142
                  </button>
                  <button 
                    onClick={() => handleVote(project.id, 'necessary')}
                    disabled={loading || !isVerified}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-500 transition group text-sm disabled:opacity-50"
                  >
                    <div className="p-2 rounded-full group-hover:bg-emerald-50 transition"><Vote size={18} /></div>
                    {project.necessaryVotes}
                  </button>
                  <button 
                    onClick={() => handleVote(project.id, 'overfunded')}
                    disabled={loading || !isVerified}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-rose-500 transition group text-sm disabled:opacity-50"
                  >
                    <div className="p-2 rounded-full group-hover:bg-rose-50 transition"><Shield size={18} /></div>
                    {project.overfundedVotes}
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
  };

  const renderMessages = () => {
    return (
      <div className="flex h-screen md:h-[calc(100vh-2rem)] border-t border-gray-100 md:border-none animate-in fade-in duration-300">
        {/* Inbox List */}
        <div className="w-full md:w-2/5 border-r border-gray-100 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md">
            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            <Mail size={20} className="text-gray-900" />
          </div>
          <div className="overflow-y-auto">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition ${activeChat === chat.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
              >
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl shrink-0">
                  {chat.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className={`truncate ${chat.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{chat.name}</h4>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{chat.time}</span>
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${chat.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    {chat.preview}
                  </p>
                </div>
                {chat.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat (Hidden on mobile unless selected) */}
        <div className="hidden md:flex flex-col flex-1 bg-white">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
              {chats.find(c => c.id === activeChat)?.name?.charAt(0) || 'U'}
            </div>
            <h3 className="font-bold text-lg text-gray-900">{chats.find(c => c.id === activeChat)?.name || 'User'}</h3>
            <Info size={20} className="ml-auto text-gray-400" />
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-gray-50/50">
            {/* Chat bubbles */}
            <div className="self-start max-w-[70%] bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-[15px]">
              Hello citizen. How can I assist you with the upcoming infrastructure proposals?
            </div>
            <div className="self-end max-w-[70%] bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-[15px]">
              I want to know if the highway project is fully vetted.
            </div>
            <div className="self-start max-w-[70%] bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-[15px]">
              Yes, all documents are available on the blockchain explorer. The link is attached to the proposal.
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Message..." 
                className="w-full border border-gray-200 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-3 text-blue-500 font-semibold hover:text-blue-600 p-1">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <section className="animate-in fade-in duration-300 pb-20 md:pb-0">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-3 flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
        </div>

        {/* Identity Banner */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm overflow-hidden transition-all duration-300">
                <User className="text-blue-500 w-10 h-10 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white w-5 h-5 mb-0.5" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">Edit</span>
                </div>
              </div>
            </div>
            {isVerified ? (
              <button className="border border-gray-300 text-gray-900 font-bold py-1.5 px-4 rounded-full text-sm hover:bg-gray-50 transition">
                Edit Profile
              </button>
            ) : (
              <button onClick={verifyCivicId} disabled={loading} className="bg-gray-900 text-white font-bold py-1.5 px-4 rounded-full text-sm hover:bg-gray-800 transition">
                {loading ? 'Verifying...' : 'Verify Civic ID'}
              </button>
            )}
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-1.5">
              John Doe {isVerified && <CheckCircle2 className="text-blue-500 w-5 h-5" />}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {account ? `${account.slice(0, 8)}...${account.slice(-6)}` : '@johndoe_citizen'}
            </p>
            <p className="mt-3 text-gray-800 text-[15px] leading-snug">
              Passionate about local infrastructure, transparent governance, and clean energy. Let&apos;s build a better city together. 🏙️🌿
            </p>
            <div className="flex gap-4 mt-3 text-sm text-gray-500">
              <span><MapPin size={16} className="inline mr-1 pb-0.5" />Delhi, India</span>
              <span><Calendar size={16} className="inline mr-1 pb-0.5" />Joined March 2026</span>
            </div>
            <div className="flex gap-4 mt-3">
              <span className="text-sm"><strong className="text-gray-900">42</strong> <span className="text-gray-500">Following</span></span>
              <span className="text-sm"><strong className="text-gray-900">{voteHistory.length}</strong> <span className="text-gray-500">Votes Cast</span></span>
            </div>
          </div>
        </div>

        {/* Tabs under profile */}
        <div className="flex border-b border-gray-100">
          <div className="flex-1 text-center font-bold text-gray-900 py-3 border-b-2 border-blue-500">Activity</div>
          <div className="flex-1 text-center font-medium text-gray-500 py-3 hover:bg-gray-50 cursor-pointer">About</div>
        </div>

        <div className="p-4 space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
            <Vote className="text-gray-500" size={18} /> Recent Votes
          </h3>
          
          {voteHistory.length > 0 ? voteHistory.map((vote, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-4 rounded-2xl flex justify-between items-center shadow-sm">
              <div>
                <p className="font-bold text-gray-900">{vote.projectName}</p>
                <p className="text-sm text-gray-500 mt-1">{vote.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${vote.choice === 'Necessary' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {vote.choice}
              </span>
            </div>
          )) : (
            <p className="text-gray-500 text-sm text-center py-8">No votes cast yet. Head to the dashboard to have your say.</p>
          )}
        </div>
      </section>
    );
  };

  const renderSettings = () => {
    return (
      <section className="animate-in fade-in duration-300 pb-20 md:pb-0">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-3">
          <h2 className="text-xl font-bold text-gray-900">Settings & Support</h2>
        </div>

        <div className="p-2 space-y-2">
          {/* Settings Block */}
          <div className="p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-4">
              <Key className="text-gray-500" size={24} />
              <div>
                <h3 className="text-[15px] font-medium text-gray-900">Account & Security</h3>
                <p className="text-[13px] text-gray-500">Update password, 2-Step Verification</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-4">
              <Wallet className="text-gray-500" size={24} />
              <div>
                <h3 className="text-[15px] font-medium text-gray-900">Web3 Wallet</h3>
                <p className="text-[13px] text-gray-500">{account ? account : 'No wallet connected'}</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-4">
              <Lock className="text-gray-500" size={24} />
              <div>
                <h3 className="text-[15px] font-medium text-gray-900">Privacy and safety</h3>
                <p className="text-[13px] text-gray-500">Manage what information you allow others to see</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-4">
              <Bell className="text-gray-500" size={24} />
              <div>
                <h3 className="text-[15px] font-medium text-gray-900">Notifications</h3>
                <p className="text-[13px] text-gray-500">Email and SMS alerts for new proposals</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-4">
              <Palette className="text-gray-500" size={24} />
              <div>
                <h3 className="text-[15px] font-medium text-gray-900">Display</h3>
                <p className="text-[13px] text-gray-500">Manage background color and text size</p>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-6 p-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Help & Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500" size={20} />
                <a href="mailto:dhruvguptano.123@gmail.com" className="text-[15px] text-gray-700 hover:text-blue-500 transition">
                  dhruvguptano.123@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-500" size={20} />
                <a href="tel:+919259052670" className="text-[15px] text-gray-700 hover:text-blue-500 transition">
                  +91 9259052670
                </a>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-4 p-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-rose-500 uppercase tracking-wide mb-3">Account Actions</h3>
            <button className="text-[15px] text-rose-600 font-medium hover:underline">
              Deactivate your account
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This will remove your social profile. Your anonymous on-chain votes remain permanent.
            </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 text-gray-900 font-sans flex justify-center selection:bg-blue-200">
      
      {/* Desktop Left Sidebar */}
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
          <button className="hidden xl:block bg-blue-500 hover:bg-blue-600 text-white font-bold text-[17px] py-4 rounded-full mt-6 transition shadow-sm">
            Suggest Project
          </button>
          <button className="xl:hidden w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full mt-6 flex items-center justify-center transition shadow-sm">
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

      {/* Main Content Area (Center Feed) */}
      <main className="flex-1 max-w-2xl w-full min-h-screen border-r border-gray-100 bg-white">
        {/* Mobile Top Bar */}
        <div className="md:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-20 px-4 py-3 flex justify-between items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {account ? account.slice(2,4).toUpperCase() : 'U'}
          </div>
          <Shield className="text-blue-500" size={28} />
          <Settings onClick={() => setActiveTab('settings')} className="text-gray-900 cursor-pointer" size={24} />
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {/* Desktop Right Sidebar (Trending & Search) */}
      <aside className="hidden lg:block w-80 xl:w-96 p-6 h-screen sticky top-0 overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-gray-100 border border-transparent text-gray-900 text-[15px] rounded-full py-3 pl-12 pr-4 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Verification Callout */}
          {!isVerified && account && (
            <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <h3 className="font-extrabold text-gray-900 text-lg">Verify to Vote</h3>
              <p className="text-gray-600 text-sm mt-1 mb-3 leading-snug">Get your Zero-Knowledge Civic ID to prove you are a unique citizen without revealing your identity.</p>
              <button onClick={verifyCivicId} disabled={loading} className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full text-[15px] transition w-full">
                {loading ? 'Verifying...' : 'Get Verified'}
              </button>
            </div>
          )}

          {/* Trending Projects Block */}
          <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl pt-4 shadow-sm">
            <h3 className="font-extrabold text-gray-900 text-xl px-4 mb-2">Trending in Delhi</h3>
            
            <div className="hover:bg-gray-100 transition px-4 py-3 cursor-pointer">
              <p className="text-xs text-gray-500 flex justify-between">1 &middot; Infrastructure <MoreHorizontal size={14}/></p>
              <p className="font-bold text-gray-900 mt-0.5">Route 42 Expansion</p>
              <p className="text-xs text-gray-500 mt-0.5">2,500 votes cast</p>
            </div>
            
            <div className="hover:bg-gray-100 transition px-4 py-3 cursor-pointer">
              <p className="text-xs text-gray-500 flex justify-between">2 &middot; Healthcare <MoreHorizontal size={14}/></p>
              <p className="font-bold text-gray-900 mt-0.5">City Hospital Upgrade</p>
              <p className="text-xs text-gray-500 mt-0.5">1,240 votes cast</p>
            </div>

            <div className="hover:bg-gray-100 transition px-4 py-4 rounded-b-2xl cursor-pointer">
              <p className="text-[15px] text-blue-500 hover:underline">Show more</p>
            </div>
          </div>
        </div>

        {/* Footer Links & Custom Contact */}
        <div className="mt-8 px-2 text-[13px] text-gray-500 space-y-4 pb-4">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
          
          <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg space-y-1.5">
            <p className="font-semibold text-gray-700">CivicCheck Contact:</p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-blue-500" />
              <a href="mailto:dhruvguptano.123@gmail.com" className="hover:text-blue-500 transition">dhruvguptano.123@gmail.com</a>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-blue-500" />
              <a href="tel:+919259052670" className="hover:text-blue-500 transition">+91 9259052670</a>
            </p>
          </div>

          <p>&copy; 2026 CivicCheck. All rights reserved.</p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation (Sticky) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-3 pb-safe z-50">
        <button onClick={() => setActiveTab('dashboard')} className="p-2 transition">
          <HomeIcon size={26} className={activeTab === 'dashboard' ? 'text-gray-900' : 'text-gray-500'} />
        </button>
        <button className="p-2 transition">
          <Search size={26} className="text-gray-500" />
        </button>
        <button onClick={() => setActiveTab('messages')} className="p-2 transition relative">
          <Mail size={26} className={activeTab === 'messages' ? 'text-gray-900' : 'text-gray-500'} />
          <div className="absolute top-2 right-1.5 w-2.5 h-2.5 bg-blue-500 border-2 border-white rounded-full"></div>
        </button>
        <button onClick={() => setActiveTab('profile')} className="p-2 transition">
          <User size={26} className={activeTab === 'profile' ? 'text-gray-900' : 'text-gray-500'} />
        </button>
      </nav>

    </div>
  );
}
