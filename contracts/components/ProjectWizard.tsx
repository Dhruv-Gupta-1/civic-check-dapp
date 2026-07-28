'use client';

import React, { useState } from 'react';
import { X, MapPin, UploadCloud, FileText, CheckCircle2, Shield, Loader2 } from 'lucide-react';

export function ProjectWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '', description: '', budget: '', region: 'Delhi-NCR', files: []
  });

  const handleNext = () => setStep(s => Math.min(7, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const submitToBlockchain = () => {
    setIsSubmitting(true);
    // Simulate IPFS upload and Smart Contract interaction
    setTimeout(() => {
      setIsSubmitting(false);
      setTxHash('0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''));
      setStep(7); // Move to success step
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <Shield className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Suggest Civic Project</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5">
          <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${(step / 7) * 100}%` }}></div>
        </div>

        {/* Wizard Steps */}
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900">What is the title of the project?</h3>
              <p className="text-gray-500">Keep it clear and specific (e.g., "Sector 4 Water Treatment Plant").</p>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Project Title" 
                className="w-full text-2xl border-b-2 border-gray-200 focus:border-blue-600 py-3 outline-none transition placeholder-gray-300 font-medium text-gray-900" 
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900">Describe the project</h3>
              <p className="text-gray-500">Why is this necessary? What civic problem does it solve?</p>
              <textarea 
                rows={5}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Provide a detailed description..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition resize-none text-gray-900"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900">Estimated Budget</h3>
              <p className="text-gray-500">What is the proposed tax funding required for this project?</p>
              <div className="relative">
                <span className="absolute left-4 top-4 text-2xl font-bold text-gray-400">₹</span>
                <input 
                  type="number" 
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                  placeholder="0.00" 
                  className="w-full text-3xl font-black border-2 border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-600 text-gray-900" 
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900">Location Details</h3>
              <p className="text-gray-500">Pin the exact location for this infrastructure.</p>
              <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition">
                <div className="text-center">
                  <MapPin className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-600 font-medium">Click to open Google Maps Picker</p>
                  <p className="text-gray-400 text-sm mt-1">{formData.region}</p>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900">Upload Documents</h3>
              <p className="text-gray-500">Upload blueprints, PDFs, and environmental reports to IPFS.</p>
              <div className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-100 transition cursor-pointer">
                <UploadCloud className="mx-auto text-blue-500 mb-3" size={40} />
                <p className="font-bold text-gray-900">Drag & drop files here</p>
                <p className="text-sm text-gray-500 mt-1">Supports PDF, JPG, PNG (Max 50MB)</p>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900">Blockchain Review</h3>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2"><FileText size={20}/> Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Title</span>
                    <span className="font-semibold text-gray-900">{formData.title || 'Untitled'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Budget</span>
                    <span className="font-semibold text-gray-900">₹{formData.budget || '0'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Storage</span>
                    <span className="font-semibold text-emerald-600">IPFS Ready</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-500">Network</span>
                    <span className="font-semibold text-purple-600">Polygon Mainnet</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Submitting this proposal requires a cryptographic signature. Gas fees are subsidized by the platform.
              </p>
            </div>
          )}

          {step === 7 && (
            <div className="text-center py-10 space-y-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-emerald-600" size={40} />
              </div>
              <h3 className="text-3xl font-black text-gray-900">Project Published!</h3>
              <p className="text-gray-500">Your civic proposal is now live on the blockchain and open for public voting.</p>
              <div className="bg-gray-50 rounded-xl p-4 inline-block mt-4 text-left border border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Transaction Hash</p>
                <p className="font-mono text-sm text-gray-900 break-all">{txHash}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 7 && (
          <div className="border-t border-gray-100 px-8 py-5 bg-gray-50 flex justify-between items-center rounded-b-3xl">
            <button 
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="text-gray-600 font-bold hover:text-gray-900 disabled:opacity-30 transition px-4 py-2"
            >
              Back
            </button>
            
            {step < 6 ? (
              <button 
                onClick={handleNext}
                className="bg-gray-900 hover:bg-black text-white font-bold px-8 py-3 rounded-full transition shadow-md"
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={submitToBlockchain}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition shadow-md flex items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Shield size={20} />}
                {isSubmitting ? 'Confirming in Wallet...' : 'Sign & Publish'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
