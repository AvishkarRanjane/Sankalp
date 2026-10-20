'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('backer');
  const [message, setMessage] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-4">
          Contact us
        </h1>
        <p className="text-base text-[#4B5563] leading-relaxed">
          Questions about a campaign, a refund or your account? Contact the Sankalp support team and
          we’ll reply within one working day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">Message received!</h3>
              <p className="text-xs text-[#4B5563] max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. A Sankalp community manager will review your ticket and reply
                to <strong>{email}</strong> within one working day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 text-xs font-semibold text-[#111827] bg-[#F3F4F6] rounded-xl hover:bg-[#E5E7EB] transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#374151]">Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#F59E0B]"
                >
                  <option value="backer">Backer question (contributions, refunds)</option>
                  <option value="creator">Creator question (milestones, payouts)</option>
                  <option value="report">Report a project (dispute, fraud alert)</option>
                  <option value="press">Press or Partnership</option>
                  <option value="other">Other general inquiry</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#374151]">
                  Project link <span className="text-[#9CA3AF] font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="https://sankalp.fund/projects/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#374151]">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question or issue in detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                Submit ticket
              </button>

              {/* Security warning required by PDF */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  <strong>Security notice:</strong> We will never ask for your seed phrase or private key.
                  Never share your secret recovery phrase with anyone.
                </span>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6 text-xs text-[#4B5563]">
          <div>
            <h3 className="font-bold text-[#111827] mb-1">Direct Email</h3>
            <p className="text-[#64748B]">support@sankalp.fund</p>
          </div>
          <div>
            <h3 className="font-bold text-[#111827] mb-1">Response Time</h3>
            <p className="text-[#64748B]">Within 24 hours on business days</p>
          </div>
          <div>
            <h3 className="font-bold text-[#111827] mb-1">Office Hours</h3>
            <p className="text-[#64748B]">Monday to Friday, 9:00 AM – 6:00 PM IST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
