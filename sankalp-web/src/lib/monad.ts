export const MONAD_TESTNET = {
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
    public: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadVision', url: 'https://testnet.monadexplorer.com' },
  },
  testnet: true,
};

export const MONAD_MAINNET = {
  id: 143,
  name: 'Monad Mainnet',
  network: 'monad',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: { http: ['https://rpc.monad.xyz'] },
    public: { http: ['https://rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadVision', url: 'https://monadexplorer.com' },
  },
  testnet: false,
};

export const USDC_INR_RATE = 85;

export function formatUSDC(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatINR(usdcAmount: number): string {
  const inr = usdcAmount * USDC_INR_RATE;
  if (inr >= 100000) {
    return `₹${(inr / 100000).toFixed(1)} lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inr);
}

export function getExplorerTxUrl(txHash: string): string {
  return `${MONAD_TESTNET.blockExplorers.default.url}/tx/${txHash}`;
}

export function getExplorerAddressUrl(address: string): string {
  return `${MONAD_TESTNET.blockExplorers.default.url}/address/${address}`;
}

export function shortenAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
