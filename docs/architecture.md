# Sankalp Architecture Specification

## Hybrid Web3 Architecture
Sankalp bridges high-throughput decentralized execution on Monad with off-chain indexing and metadata storage.

### 1. On-Chain Contracts (Monad EVM)
- **`PlatformConfig`**: Protocol fee accounting, multisig treasury reference, allowed token registry, and emergency pause mechanism.
- **`CampaignFactory`**: Factory generating campaign escrow clones or deployments. Emits `CampaignCreated` indexed off-chain.
- **`Campaign`**: Individual escrow contract holding backer USDC tokens. Enforces milestone locking, evidence verification, pull-payment withdrawals, and automatic refunds.

### 2. Off-Chain Indexing & Storage
- **Metadata Anchoring**: High-resolution project descriptions, videos, and milestone invoices are stored on IPFS, and their IPFS CID is stored immutably on-chain.
- **SIWE (Sign-In with Ethereum)**: Backers and creators sign a cryptographic challenge message using their private key to authenticate their session without passwords.

### 3. Frontend & SEO Engine
- **Framework**: Next.js 16 with App Router, TypeScript, and Tailwind CSS.
- **Rendering**: Static Site Generation (SSG) with ISR for high-performance crawling and instant first contentful paint.
- **Rich Structured Data**: Embedded JSON-LD schemas on every page (Organization, WebSite with SearchAction, BreadcrumbList, FAQPage, CollectionPage, HowTo, Article, Project/DonateAction).
