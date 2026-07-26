'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Shield, Vote, PlusCircle, CheckCircle2, FileText, Lock, ExternalLink } from 'lucide-react';

export default function Home() {
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

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center pb-8 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Shield className="text-blue-500" /> CivicCheck
          </h1>
          <p className="text-sm text-slate-400 mt-1">Decentralized Tax-Funded Project Audit Protocol</p>
        </div>
        <div>
          {account ? (
            <div className="flex items-center gap-3">
              <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-xs font-mono text-emerald-400">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              {!isVerified ? (
                <button onClick={verifyCivicId} disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg font-medium">
                  {loading ? 'Verifying...' : 'Verify Civic ID'}
                </button>
              ) : (
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-2 rounded-lg flex items-center gap-1">
                  <CheckCircle2 size={14} /> Verified Citizen
                </span>
              )}
            </div>
          ) : (
            <button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2.5 rounded-lg font-semibold">
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto mt-10">
        {txHash && (
          <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="text-emerald-400" />
              <span><strong>Proof of Work Recorded in Block:</strong> Tx Hash recorded on-chain.</span>
            </div>
            <span className="font-mono text-xs text-slate-400 truncate max-w-xs">{txHash}</span>
          </div>
        )}

        <section>
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
      </main>
    </div>
  );
}
