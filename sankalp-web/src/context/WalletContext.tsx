'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MONAD_TESTNET } from '@/lib/monad';

export type UserRole = 'visitor' | 'backer' | 'creator' | 'admin';

export interface UserProfile {
  address: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  avatar?: string;
  balanceMON?: number;
  balanceUSDC?: number;
}

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  isWrongNetwork: boolean;
  chainId: number | null;
  role: UserRole;
  user: UserProfile | null;
  balanceMON: number;
  balanceUSDC: number;
  // Modal control
  isConnectModalOpen: boolean;
  openConnectModal: () => void;
  closeConnectModal: () => void;
  // Connection methods
  connect: (
    mode?: 'metamask' | 'coinbase' | 'rabby' | 'phantom' | 'demo-backer' | 'demo-creator' | 'demo-admin' | 'custom-address',
    customAddress?: string
  ) => Promise<void>;
  disconnect: () => void;
  switchNetwork: () => Promise<void>;
  // Interactive state actions
  contributions: { id: string; txHash: string; projectId: string; amountUSDC: number; timestamp: string }[];
  addContribution: (projectId: string, amountUSDC: number) => { success: boolean; txHash: string };
  refundsClaimed: Record<string, boolean>;
  claimRefund: (projectId: string) => { success: boolean; amount: number };
  approvedMilestones: Record<string, boolean>; // `${projectId}_${index}`
  approveMilestone: (projectId: string, milestoneIndex: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [role, setRole] = useState<UserRole>('visitor');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [balanceMON, setBalanceMON] = useState<number>(14.85);
  const [balanceUSDC, setBalanceUSDC] = useState<number>(500.0);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const [contributions, setContributions] = useState<
    { id: string; txHash: string; projectId: string; amountUSDC: number; timestamp: string }[]
  >([]);
  const [refundsClaimed, setRefundsClaimed] = useState<Record<string, boolean>>({});
  const [approvedMilestones, setApprovedMilestones] = useState<Record<string, boolean>>({});

  const openConnectModal = useCallback(() => setIsConnectModalOpen(true), []);
  const closeConnectModal = useCallback(() => setIsConnectModalOpen(false), []);

  // Load saved state from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedUser = localStorage.getItem('sankalp_user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setAddress(parsed.address);
          setRole(parsed.role || 'backer');
          setUser(parsed);
          setBalanceMON(parsed.balanceMON || 14.85);
          setBalanceUSDC(parsed.balanceUSDC || 500.0);
        }
        const savedContribs = localStorage.getItem('sankalp_contributions');
        if (savedContribs) {
          setContributions(JSON.parse(savedContribs));
        }
        const savedRefunds = localStorage.getItem('sankalp_refunds');
        if (savedRefunds) {
          setRefundsClaimed(JSON.parse(savedRefunds));
        }
        const savedApprovals = localStorage.getItem('sankalp_milestone_approvals');
        if (savedApprovals) {
          setApprovedMilestones(JSON.parse(savedApprovals));
        }
      } catch {
        // Local storage not available or parse failed
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Listen to window.ethereum events
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const eth = (window as unknown as {
      ethereum?: {
        on?: (event: string, handler: (...args: unknown[]) => void) => void;
        removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
      };
    }).ethereum;

    if (!eth || !eth.on) return;

    const handleAccountsChanged = (accounts: unknown) => {
      const accList = accounts as string[];
      if (!accList || accList.length === 0) {
        setAddress(null);
        setUser(null);
        setRole('visitor');
        localStorage.removeItem('sankalp_user');
      } else {
        const addr = accList[0];
        setAddress(addr);
        const profile: UserProfile = {
          address: addr,
          name: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
          role: 'backer',
          isVerified: true,
          balanceMON: 14.85,
          balanceUSDC: 500.0,
        };
        setUser(profile);
        localStorage.setItem('sankalp_user', JSON.stringify(profile));
      }
    };

    const handleChainChanged = (chainHex: unknown) => {
      const cId = parseInt(chainHex as string, 16);
      setChainId(cId);
      setIsWrongNetwork(cId !== MONAD_TESTNET.id);
    };

    eth.on('accountsChanged', handleAccountsChanged);
    eth.on('chainChanged', handleChainChanged);

    return () => {
      if (eth.removeListener) {
        eth.removeListener('accountsChanged', handleAccountsChanged);
        eth.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const connect = async (
    mode: 'metamask' | 'coinbase' | 'rabby' | 'phantom' | 'demo-backer' | 'demo-creator' | 'demo-admin' | 'custom-address' = 'demo-backer',
    customAddress?: string
  ) => {
    setIsConnecting(true);
    try {
      if (mode.startsWith('demo-')) {
        let dummyAddress = '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db';
        let name = 'Priya Sharma';
        let userRole: UserRole = 'backer';
        let isVerified = true;

        if (mode === 'demo-creator') {
          dummyAddress = '0x00000000000000000000000000000000000003e8';
          name = 'Aarav Kulkarni';
          userRole = 'creator';
          isVerified = true;
        } else if (mode === 'demo-admin') {
          dummyAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
          name = 'Monad Protocol Safe Admin';
          userRole = 'admin';
          isVerified = true;
        }

        const profile: UserProfile = {
          address: dummyAddress,
          name,
          role: userRole,
          isVerified,
          balanceMON: 14.85,
          balanceUSDC: 500.0,
        };

        setAddress(dummyAddress);
        setRole(userRole);
        setUser(profile);
        setChainId(MONAD_TESTNET.id);
        setIsWrongNetwork(false);
        localStorage.setItem('sankalp_user', JSON.stringify(profile));
        closeConnectModal();
      } else if (mode === 'custom-address' && customAddress) {
        const profile: UserProfile = {
          address: customAddress,
          name: `${customAddress.slice(0, 6)}...${customAddress.slice(-4)}`,
          role: 'backer',
          isVerified: true,
          balanceMON: 14.85,
          balanceUSDC: 500.0,
        };
        setAddress(customAddress);
        setRole('backer');
        setUser(profile);
        setChainId(MONAD_TESTNET.id);
        setIsWrongNetwork(false);
        localStorage.setItem('sankalp_user', JSON.stringify(profile));
        closeConnectModal();
      } else {
        // Connect real injected window.ethereum
        if (typeof window !== 'undefined' && (window as unknown as { ethereum?: unknown }).ethereum) {
          const eth = (window as unknown as {
            ethereum: {
              request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            };
          }).ethereum;

          const accounts = (await eth.request({ method: 'eth_requestAccounts' })) as string[];
          const currentChainHex = (await eth.request({ method: 'eth_chainId' })) as string;
          const currentChainId = parseInt(currentChainHex, 16);
          setChainId(currentChainId);
          setIsWrongNetwork(currentChainId !== MONAD_TESTNET.id);

          if (accounts.length > 0) {
            const addr = accounts[0];
            const profile: UserProfile = {
              address: addr,
              name: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
              role: 'backer',
              isVerified: true,
              balanceMON: 14.85,
              balanceUSDC: 500.0,
            };
            setAddress(addr);
            setUser(profile);
            setRole('backer');
            localStorage.setItem('sankalp_user', JSON.stringify(profile));
            closeConnectModal();
          }
        } else {
          // If extension not present, notify user or fallback gracefully to demo account
          await connect('demo-backer');
        }
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setUser(null);
    setRole('visitor');
    localStorage.removeItem('sankalp_user');
  };

  const switchNetwork = async () => {
    if (typeof window !== 'undefined' && (window as unknown as { ethereum?: unknown }).ethereum) {
      const eth = (window as unknown as {
        ethereum: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };
      }).ethereum;
      try {
        await eth.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${MONAD_TESTNET.id.toString(16)}` }],
        });
        setChainId(MONAD_TESTNET.id);
        setIsWrongNetwork(false);
      } catch (switchError: unknown) {
        if ((switchError as { code?: number })?.code === 4902) {
          await eth.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${MONAD_TESTNET.id.toString(16)}`,
                chainName: MONAD_TESTNET.name,
                nativeCurrency: MONAD_TESTNET.nativeCurrency,
                rpcUrls: MONAD_TESTNET.rpcUrls.default.http,
                blockExplorerUrls: [MONAD_TESTNET.blockExplorers.default.url],
              },
            ],
          });
          setChainId(MONAD_TESTNET.id);
          setIsWrongNetwork(false);
        }
      }
    } else {
      setChainId(MONAD_TESTNET.id);
      setIsWrongNetwork(false);
    }
  };

  const addContribution = (projectId: string, amountUSDC: number) => {
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const txHash = `0x${randomHex}`;
    const newContrib = {
      id: `tx_${Date.now()}`,
      txHash,
      projectId,
      amountUSDC,
      timestamp: new Date().toISOString(),
    };
    const updated = [newContrib, ...contributions];
    setContributions(updated);
    setBalanceUSDC((prev) => Math.max(0, prev - amountUSDC));
    try {
      localStorage.setItem('sankalp_contributions', JSON.stringify(updated));
    } catch {
      // Local storage full or unavailable
    }
    return { success: true, txHash };
  };

  const claimRefund = (projectId: string) => {
    const updated = { ...refundsClaimed, [projectId]: true };
    setRefundsClaimed(updated);
    try {
      localStorage.setItem('sankalp_refunds', JSON.stringify(updated));
    } catch {
      // Local storage full or unavailable
    }
    return { success: true, amount: 25 };
  };

  const approveMilestone = (projectId: string, milestoneIndex: number) => {
    const key = `${projectId}_${milestoneIndex}`;
    const updated = { ...approvedMilestones, [key]: true };
    setApprovedMilestones(updated);
    try {
      localStorage.setItem('sankalp_milestone_approvals', JSON.stringify(updated));
    } catch {
      // Local storage full or unavailable
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting,
        isWrongNetwork,
        chainId,
        role,
        user,
        balanceMON,
        balanceUSDC,
        isConnectModalOpen,
        openConnectModal,
        closeConnectModal,
        connect,
        disconnect,
        switchNetwork,
        contributions,
        addContribution,
        refundsClaimed,
        claimRefund,
        approvedMilestones,
        approveMilestone,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
