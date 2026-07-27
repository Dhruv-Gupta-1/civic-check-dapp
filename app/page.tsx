'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { 
  Shield, 
  Vote, 
  CheckCircle2, 
  User, 
  Settings, 
  LayoutDashboard, 
  Bell, 
  Globe, 
  History,
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
  Twitter,
  Linkedin,
  Briefcase,
  Eye,
  Trash2,
  MessageSquare,
  Languages
} from 'lucide-react';

export default function Home() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'settings'>('dashboard');

  // Web3 & User State
  const [account, setAccount] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Sample On-Chain Tax Funded Projects Data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'NH-48 Highway Expansion & Repair',
      budget: '₹450,000,000',
      region: 'Delhi-NCR',
      category: 'Infrastructure',
      necessaryVotes: 1240,
      overfundedVotes: 310,
      ipfsCid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
    },
    {
      id: 2,
      name: 'Smart City Public Healthcare Hub',
      budget: '₹120,000,000',
      region: 'Bengaluru, KA',
      category: 'Healthcare',
      necessaryVotes: 2890,
      overfundedVotes: 85,
      ipfsCid: 'QmYwAPJzv5CZsnA625s3X2nemtYgPpHdWEz79ojWcPbdG',
    }
  ]);

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
      alert('Please install MetaMask to interact with the dApp.');
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
    if (!account) return alert('Connect wallet first.');
    if (!isVerified) return alert('Verify Civic ID before voting.');

    setLoading(true);
    // Simulating Blockchain Block Receipt Generation
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

  const renderDashboard = () => (
    <section className="animate-in fade-in duration-500">
      {txHash && (
        <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="text-emerald-400" />
            <span><strong>Proof of Work Recorded in Block:</strong> Tx Hash recorded on-chain.</span>
          </div>
          <span className="font-mono text-xs text-slate-400 truncate max-w-xs">{txHash}</span>
        </div>
      )}

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Vote className="text-blue-400" /> Active Government Tax Proposals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-2.5 py-1 rounded">
                  {project.category}
                </span>
                <span className="text-xs text-slate-400">{project.region}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-2xl font-black text-emerald-400 mb-4">{project.budget}</p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between text-xs text-slate-400 mb-3">
                <span>Necessary: <strong className="text-emerald-400">{project.necessaryVotes}</strong></span>
                <span>Overfunded: <strong className="text-rose-400">{project.overfundedVotes}</strong></span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleVote(project.id, 'necessary')}
                  disabled={loading || !isVerified}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs py-2.5 rounded-lg font-bold"
                >
                  Necessary
                </button>
                <button
                  onClick={() => handleVote(project.id, 'overfunded')}
                  disabled={loading || !isVerified}
                  className="flex-1 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs py-2.5 rounded-lg font-bold"
                >
                  Overfunded
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderProfile = () => (
    <section className="animate-in fade-in duration-500 space-y-6">
      
      {/* Identity Banner with Social Profile Layout */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-500/50 overflow-hidden transition-all duration-300">
                <User className="text-blue-400 w-12 h-12 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white w-6 h-6 mb-1" />
                  <span className="text-[10px] font-semibold text-white">Change</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Citizen Profile 
                {isVerified && <CheckCircle2 className="text-emerald-500 w-5 h-5" />}
              </h2>
              <p className="text-slate-400 text-sm font-mono mt-1">
                {account ? `${account.slice(0, 8)}...${account.slice(-6)}` : '@username'}
              </p>
              <div className="flex gap-4 mt-3">
                <span className="text-sm"><strong className="text-white">{voteHistory.length}</strong> <span className="text-slate-400">Votes Cast</span></span>
                <span className="text-sm"><strong className="text-white">12</strong> <span className="text-slate-400">Following</span></span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm text-slate-400 mb-1">Civic ID Status</h3>
              <p className="text-sm font-medium">{isVerified ? 'Level 1 KYC Verified' : 'Unverified (Restricted)'}</p>
            </div>
            {isVerified ? <CheckCircle2 className="text-emerald-500" /> : <Lock className="text-rose-500" />}
          </div>
        </div>
      </div>

      {/* Social & Personal Information Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-3 flex items-center gap-2">
          <User className="text-blue-400" size={18} /> Public Profile Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bio Section spans full width */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Bio / About Me</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-slate-500" size={16} />
              <textarea 
                rows={3} 
                placeholder="Passionate about local infrastructure and transparent governance..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Full Legal Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500" size={16} />
              <input type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Occupation</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 text-slate-500" size={16} />
              <input type="text" placeholder="Civil Engineer" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email Address (Primary)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={16} />
              <input type="email" placeholder="citizen@gmail.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-slate-500" size={16} />
              <input type="tel" placeholder="+91 98765 43210" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Twitter / X Profile</label>
            <div className="relative">
              <Twitter className="absolute left-3 top-3 text-slate-500" size={16} />
              <input type="text" placeholder="@username" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">LinkedIn Profile</label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3 text-slate-500" size={16} />
              <input type="text" placeholder="linkedin.com/in/username" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-slate-500" size={16} />
              <input type="date" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Location / District</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-slate-500" size={16} />
              <input type="text" placeholder="Delhi, India" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        <button className="mt-8 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 px-8 rounded-lg transition-colors w-full md:w-auto">
          Save Changes
        </button>
      </div>

      <h3 className="text-xl font-bold flex items-center gap-2 mt-8 mb-4">
        <History className="text-blue-400" /> Voting Activity Log
      </h3>
      
      <div className="space-y-3">
        {voteHistory.length > 0 ? voteHistory.map((vote, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex justify-between items-center hover:border-slate-700 transition">
            <div>
              <p className="font-semibold text-white">{vote.projectName}</p>
              <p className="text-xs text-slate-400 mt-1">Date: {vote.date}</p>
            </div>
            <span className={`px-3 py-1 rounded text-xs font-bold border ${vote.choice === 'Necessary' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
              Voted: {vote.choice}
            </span>
          </div>
        )) : (
          <p className="text-slate-500 italic text-sm">No votes cast yet. Head to the dashboard to audit a project.</p>
        )}
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="animate-in fade-in duration-500 space-y-8">
      
      {/* Privacy & Visibility Block (Social Media Style) */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Eye className="text-blue-400" /> Privacy & Visibility
        </h2>
        <div className="space-y-3">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between hover:bg-slate-800/50 transition">
            <div className="flex items-start gap-3">
              <Lock className="text-slate-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-white">Private Profile</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">When your profile is private, only approved followers can see your civic activity and bio.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between hover:bg-slate-800/50 transition">
            <div className="flex items-start gap-3">
              <Shield className="text-slate-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-white">Show Activity Status</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">Allow others to see when you are actively auditing projects on CivicCheck.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

        </div>
      </div>

      {/* Security & Access Block */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Key className="text-blue-400" /> Security & Login
        </h2>
        <div className="space-y-3">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Key className="text-slate-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-white">Change Password</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">Update the password for your abstracted email login.</p>
              </div>
            </div>
            <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm rounded-lg px-4 py-2 text-white transition whitespace-nowrap">
              Update
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Smartphone className="text-slate-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-white">Two-Factor Authentication</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">Add an extra layer of security using Google Authenticator or SMS.</p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-sm rounded-lg px-4 py-2 text-white transition whitespace-nowrap">
              Enable 2FA
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Wallet className="text-slate-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-white">Verified Wallet Address</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">The cryptographic wallet acting as your signature for on-chain votes.</p>
              </div>
            </div>
            <span className="bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs px-3 py-2 rounded-lg">
              {account ? account : 'No wallet connected'}
            </span>
          </div>

        </div>
      </div>

      {/* App Preferences & Notifications */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Settings className="text-blue-400" /> App Preferences
        </h2>
        <div className="space-y-3">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Palette className="text-slate-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-white">Color Theme</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">Choose how CivicCheck looks to you.</p>
              </div>
            </div>
            <select className="bg-slate-950 border border-slate-700 text-sm rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
              <option>Dark Mode (Default)</option>
              <option>Light Mode</option>
              <option>System Sync</option>
            </select>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Languages className="text-slate-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-white">Language & Region</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">Customize your display language.</p>
              </div>
            </div>
            <select className="bg-slate-950 border border-slate-700 text-sm rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500">
              <option>English (US)</option>
              <option>Hindi (IN)</option>
              <option>Spanish (ES)</option>
            </select>
          </div>

          {/* Social Media Style Notification Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <Bell className="text-slate-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-white">Push Notifications</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">Control how you receive governance alerts.</p>
              </div>
            </div>
            <div className="pl-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Email Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">SMS / Text Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-rose-500">
          <Trash2 className="text-rose-500" /> Danger Zone
        </h2>
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-rose-500">Deactivate Account</h3>
            <p className="text-xs text-rose-400/80 max-w-sm mt-1">Permanently remove your social profile. Your anonymous on-chain votes will remain on the blockchain forever.</p>
          </div>
          <button className="bg-rose-600 hover:bg-rose-700 text-sm rounded-lg px-4 py-2 text-white transition whitespace-nowrap font-semibold">
            Deactivate
          </button>
        </div>
      </div>

    </section>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Shield className="text-blue-500" /> CivicCheck
          </h1>
          <p className="text-sm text-slate-400 mt-1">Decentralized Tax-Funded Project Audit Protocol</p>
        </div>
        
        <div className="w-full md:w-auto flex justify-between md:justify-end items-center gap-4">
          {account ? (
            <div className="flex items-center gap-3">
              <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-xs font-mono text-emerald-400">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              {!isVerified ? (
                <button onClick={verifyCivicId} disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg font-medium transition">
                  {loading ? 'Verifying...' : 'Verify Civic ID'}
                </button>
              ) : (
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-2 rounded-lg flex items-center gap-1 cursor-default">
                  <CheckCircle2 size={14} /> Verified
                </span>
              )}
            </div>
          ) : (
            <button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2.5 rounded-lg font-semibold transition">
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-6xl mx-auto flex items-center gap-2 py-6 border-b border-slate-800 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
        >
          <LayoutDashboard size={16} /> Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('profile')} 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${activeTab === 'profile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
        >
          <User size={16} /> Profile
        </button>
        <button 
          onClick={() => setActiveTab('settings')} 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${activeTab === 'settings' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
        >
          <Settings size={16} /> Settings
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto pb-12">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
}
