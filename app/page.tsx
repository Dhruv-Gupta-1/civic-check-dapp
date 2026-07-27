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

export default function Home() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'profile' | 'settings'>('dashboard');
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

  const renderDashboard = () => (
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
        <div className="m-4 p-3 bg-emerald
