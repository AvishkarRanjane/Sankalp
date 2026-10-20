# Sankalp (संकल्प) — Decentralized Milestone-Based Crowdfunding Platform

<p align="center">
  <img src="sankalp-web/public/images/logo/logo.png" alt="Sankalp Logo" width="96" height="96" />
</p>

<p align="center">
  <strong>Fund ideas that keep their promises.</strong><br />
  A next-generation crowdfunding platform built from scratch on the high-throughput <strong>Monad EVM</strong> blockchain.<br />
  Empowering grassroots student innovators, social enterprises, and community builders with 100% smart-contract escrow protection and milestone-verified releases.
</p>

<p align="center">
  <a href="#-deploy-to-vercel"><img src="https://img.shields.io/badge/Demo-Deploy%20on%20Vercel-black?style=for-the-badge&logo=vercel" alt="Deploy on Vercel" /></a>
  <a href="#-monad-testnet-deployment-parameters"><img src="https://img.shields.io/badge/Network-Monad%20Testnet%20(10143)-8338EC?style=for-the-badge&logo=ethereum" alt="Monad Network" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Next.js-16%20(Turbopack)-000000?style=for-the-badge&logo=next.js" alt="Next.js 16" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  <a href="#-license"><img src="https://img.shields.io/badge/License-MIT-amber?style=for-the-badge" alt="MIT License" /></a>
</p>

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAvishkarRanjane%2FSankalp&root-directory=sankalp-web">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</p>

---

## 🌟 Key Differentiators & Problem Solved

Traditional crowdfunding platforms (Kickstarter, GoFundMe, Ketto) suffer from a fundamental **trust deficit**: once a campaign finishes, funds are paid out upfront in a single lump sum directly to the creator's bank account. If the creator abandons the project, delays delivery, or mismanages resources, backers have zero recourse.

**Sankalp completely re-architects crowdfunding:**

1. **Milestone-Locked Escrow**: Pledged funds (USDC) are locked directly in an audited Monad EVM smart contract. Creators receive funding strictly in verifiable tranches (e.g., 30% materials, 50% assembly, 20% distribution) only after evidence is approved.
2. **Guaranteed Pull-Payment Refunds**: If a campaign misses its target by the deadline or defaults on milestone delivery, backers trigger automatic 100% principal refunds directly from the smart contract without middleman approvals.
3. **Monad High-Performance Execution**: 10,000 TPS, 1-second single-slot finality, and sub-cent gas fees make micro-contributions (as small as ₹100 / $1) economically viable on-chain.
4. **Instant Dual Currency Toggle**: Seamless 1-click global currency conversion between USD ($) and Indian Rupees (₹) with synchronized calculation across all pledge tiers, budget tables, and milestone releases.
5. **Multi-Wallet Web3 & Sandbox Personas**: Full connection support for MetaMask, Coinbase Wallet, Rabby, and Phantom, accompanied by built-in testnet sandbox personas (Student Creator, Backer, Admin) for immediate evaluation without setup friction.
6. **Regulatory Compliance (SEBI & DPDP)**: Strictly designed for rewards/pre-orders and charitable donations (no equity/securities offering). Strict data minimization with zero storage of personal ID documents.

---

## 🏛️ Architecture Overview

```
                                +---------------------------------------+
                                |           Monad Blockchain            |
                                |       (Chain ID: 10143 / MON)         |
                                +-------------------+-------------------+
                                                    |
                  +---------------------------------+---------------------------------+
                  |                                 |                                 |
          +-------v---------+             +---------v---------+             +---------v---------+
          | PlatformConfig  |             |  CampaignFactory  |             |  Campaign Escrow  |
          | - 3% Platform Fee             | - Deploys new     |             | - Milestone lock  |
          | - Monad Safe    |             |   Campaigns       |             | - 100% Pull Refund|
          | - Circuit Breaker             | - Creator Registry|             | - Invariant Tested|
          +-----------------+             +-------------------+             +-------------------+
                  ^                                 ^                                 ^
                  |                                 |                                 |
+-----------------+---------------------------------+---------------------------------+-----------------+
|                                     Sankalp Web Application                                           |
|              Next.js 16 (App Router) + Tailwind CSS + wagmi/viem + TypeScript                         |
+-------------------------------------------------------------------------------------------------------+
|  / (Home)             |  /explore           |  /projects/[slug]   |  /creator                         |
|  /category/[slug]     |  /how-it-works      |  /fees              |  /admin                           |
|  /dashboard (Backer)  |  /trust-and-safety  |  /blog/[slug]       |  /faq                             |
+-------------------------------------------------------------------------------------------------------+
```

---

## 🧪 Smart Contract Invariant & Security Guarantees

Every campaign deployed via `CampaignFactory.sol` enforces the mathematical balance invariant:

$$\text{Contract Balance} = \text{Total Raised} - \text{Total Released} - \text{Total Refunded}$$

- **Pull-Payments Only**: Funds are never pushed automatically to recipients, preventing reentrancy, DoS on transfer, and gas-exhaustion griefing.
- **Safe Multisig Ownership**: `PlatformConfig` is controlled by a Monad Safe multisig with two-step ownership transfer (`Ownable2Step`).
- **Emergency Circuit Breaker**: An emergency `pause()` switch pauses incoming contributions while keeping backer refund routes unconditionally open.
- **Enterprise Web Security Headers**: Strict Content Security Policy (CSP), HSTS (`max-age=63072000`), `X-Frame-Options: SAMEORIGIN`, `nosniff`, and restricted Permissions-Policy.

---

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, zero `any`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Warm Saffron & Monad Violet design system
- **Smart Contracts**: [Solidity 0.8.24](https://soliditylang.org/) + [Foundry](https://getfoundry.sh/)
- **Web3 Integration**: [viem](https://viem.sh/), [wagmi](https://wagmi.sh/), EIP-1193 Injected Providers
- **SEO & Structured Data**: Complete JSON-LD schema (Organization, WebSite, FAQPage, CollectionPage, HowTo)
- **Deployment**: [Vercel](https://vercel.com/) & [Monad Testnet](https://testnet.monadexplorer.com/)

---

## 📁 Repository Structure

```
Monad Blitz hackathon/
├── packages/
│   ├── contracts/               # Foundry Smart Contracts
│   │   ├── src/
│   │   │   ├── PlatformConfig.sol  # Multisig config, 3% fee, token whitelist
│   │   │   ├── Campaign.sol        # Escrow, milestone releases, pull-refunds
│   │   │   └── CampaignFactory.sol # Campaign deployer & registry
│   │   ├── test/
│   │   │   └── Campaign.t.sol      # Invariant test suite
│   │   ├── script/
│   │   │   └── Deploy.s.sol        # Monad deployment script
│   │   └── foundry.toml            # Monad RPC & compiler setup
│   └── abi/                     # Type-safe contract ABIs
├── sankalp-web/                 # Next.js 16 Frontend Web Application
│   ├── public/
│   │   └── images/              # Topic-based project assets & official logo
│   ├── src/
│   │   ├── app/                 # 68 Static & Dynamic App Router pages
│   │   ├── components/          # UI widgets, Navigation, ProjectCard, Modals
│   │   ├── context/             # WalletContext & CurrencyContext
│   │   ├── data/                # Seed data (12 campaigns, 8 creators)
│   │   ├── lib/                 # monad.ts, data.ts, seo.ts
│   │   └── types/               # TypeScript data models
│   ├── next.config.ts           # Enterprise security headers & CSP
│   └── package.json
├── docs/                        # Architecture & Threat Model specifications
├── sankalp-seed-data.json       # Validated seed data pack
└── README.md
```

---

## 🚀 Quick Start & Local Development

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/AvishkarRanjane/Sankalp.git
cd Sankalp/sankalp-web
npm install
```

### 2. Configure Environment

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Default testnet values:

```env
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
NEXT_PUBLIC_MONAD_RPC_URL="https://testnet-rpc.monad.xyz"
NEXT_PUBLIC_MONAD_EXPLORER_URL="https://testnet.monadexplorer.com"
NEXT_PUBLIC_PLATFORM_FEE_BPS=300
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## ☁️ Deploy to Vercel (Live in 60 Seconds)

### Option A: 1-Click Import (Recommended)

1. Click the **[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAvishkarRanjane%2FSankalp&root-directory=sankalp-web)** button above.
2. Sign in with your GitHub account.
3. Vercel automatically detects Next.js 16 and sets the Root Directory to `sankalp-web`.
4. Click **Deploy**. Your live production instance will be available at `https://sankalp-[your-username].vercel.app` with instant global CDN caching and automatic deployments on every Git push.

### Option B: Deploy via Vercel CLI

```bash
cd sankalp-web
npx vercel login
npx vercel --prod
```

---

## 🌐 Monad Testnet Deployment Parameters

| Resource | Value |
|---|---|
| **Network** | Monad Testnet |
| **Chain ID** | `10143` (`0x279f`) |
| **Native Token** | `MON` |
| **RPC Endpoint** | `https://testnet-rpc.monad.xyz` |
| **Block Explorer** | `https://testnet.monadexplorer.com` |
| **Success-Only Platform Fee** | 3.0% |
| **Default Escrow Asset** | USDC (1 USDC ≈ ₹85) |

---

## 📄 License

This project is open-source under the [MIT License](LICENSE). Built with pride for the **Monad Blitz Hackathon**.
