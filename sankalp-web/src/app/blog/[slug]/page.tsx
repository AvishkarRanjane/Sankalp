import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts, getBlogPostBySlug, getProjects } from '@/lib/data';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Clock, Calendar, ArrowLeft, HelpCircle } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return constructMetadata({ title: 'Post Not Found' });
  }

  return constructMetadata({
    title: `${post.title} | Sankalp Blog`,
    description: post.metaDescription || `Read ${post.title} on Sankalp.`,
    canonical: `/blog/${slug}`,
  });
}

// Article rich content definitions
const POST_CONTENT: Record<string, { sections: { title: string; content: string }[]; faqs: { q: string; a: string }[] }> = {
  'how-blockchain-crowdfunding-works': {
    sections: [
      {
        title: '1. The Problem with Traditional Crowdfunding (The Trust Gap)',
        content: `Traditional crowdfunding platforms operate on a 'take the money and run' dynamic. Donors pledge funds to a campaign, the platform takes its cut, and the full remaining balance is wired directly to the creator's personal bank account. If the creator encounters difficulty, mismanages expenses, or abandons the project, backers have zero financial recourse. This trust deficit prevents high-potential creators from raising funds from skeptical communities.`,
      },
      {
        title: '2. What a Smart Contract is in One Paragraph',
        content: `A smart contract is a self-executing software program stored on a decentralized blockchain like Monad. Unlike arbitrary human promises, its code cannot be changed once deployed. It holds funds in an escrow vault and only releases money when predefined, mathematically verifiable criteria—such as milestone approval—are met. If conditions are missed, refund paths are automatically unlocked.`,
      },
      {
        title: '3. Life of a Contribution: From Pledge to Disbursement',
        content: `On Sankalp, your contribution follows four transparent phases:
1. Contribution: You confirm a single transaction on Monad testnet in USDC.
2. Escrow Lock: Funds are locked in the campaign contract, never accessible directly to the creator or platform staff.
3. Proof & Review: Creator uploads evidence (invoices, photos, test data) for milestone 1. Reviewers verify.
4. Stage Release: Upon approval, the creator pulls the specific milestone allocation. The 3% platform fee goes to the protocol treasury, while the remaining milestones remain locked.`,
      },
      {
        title: '4. What Happens if a Project Fails (The Refund Path)',
        content: `If a campaign fails to reach 100% of its funding goal by the deadline, the contract status transitions to Failed. Any backer can immediately click 'Claim Refund' in their dashboard, triggering a pull-payment transaction that returns 100% of their contributed USDC directly to their wallet.`,
      },
      {
        title: '5. What Blockchains Do NOT Solve',
        content: `Decentralized ledgers enforce financial rules, but they cannot eliminate real-world execution risk. Blockchains cannot prevent a supply chain disruption, bad engineering, or human error in the workshop. This is why Sankalp implements mandatory milestone deliverables and identity verification rather than relying on code alone.`,
      },
      {
        title: '6. How to Evaluate a Project Before Backing It',
        content: `Before backing any campaign:
• Inspect the milestone breakdown: Are deliverables measurable and realistic?
• Verify creator profile: Look for the verified identity badge and track record.
• Check the budget table: Ensure the creator factored in shipping, component margins, and platform contingencies.`,
      },
    ],
    faqs: [
      {
        q: 'Can the creator withdraw all funds immediately?',
        a: 'No. The smart contract strictly forbids withdrawing locked milestones until proof is uploaded and reviewed.',
      },
      {
        q: 'Are my refunds subject to deductions if a campaign fails?',
        a: 'Zero deductions. Failed campaigns return 100% of contributed tokens.',
      },
    ],
  },
  'how-to-start-a-crowdfunding-campaign-india': {
    sections: [
      {
        title: '1. Understand the Indian Regulatory Framework',
        content: `In India, equity crowdfunding is tightly restricted by SEBI regulations. Platforms offering shares, dividends, or guaranteed returns face serious legal liability. Sankalp is strictly reward and donation-based: backers support innovation, receive product pre-orders, and obtain zero profit share.`,
      },
      {
        title: '2. Break Your Budget into 2 to 5 Concrete Milestones',
        content: `Do not ask for a single lump sum. Backers in India respond best to clear staged goals: e.g. 30% for component procurement, 50% for fabrication and testing, and 20% for delivery and open-source documentation.`,
      },
      {
        title: '3. Prepare Verifiable Proof Requirements Early',
        content: `Specify what tangible artifacts you will submit at each milestone. Examples include GST invoices from vendors, assembly photos, unboxing videos, and institutional sign-offs.`,
      },
      {
        title: '4. Secure Your First 30 Backers Before Launch',
        content: `Marketplace dynamics rely on social proof. Before taking your campaign public, share your draft preview with college classmates, maker community groups, and local supporters to build initial momentum.`,
      },
    ],
    faqs: [
      {
        q: 'Do I need a registered company to launch a campaign?',
        a: 'Individual students, researchers, and makers aged 18+ can launch campaigns with a verified identity check.',
      },
      {
        q: 'How are platform fees collected?',
        a: 'A 3% fee is deducted only as milestones are approved on successful campaigns.',
      },
    ],
  },
  'milestone-based-funding-explained': {
    sections: [
      {
        title: '1. Why All-or-Nothing is Not Enough',
        content: `Traditional platforms popularized 'all-or-nothing' campaigns, which protect backers before the deadline. But once the deadline passes and money is wired, backers have zero leverage. Milestone-based funding extends protection across the entire project execution lifecycle.`,
      },
      {
        title: '2. The Mathematical Escrow Invariant',
        content: `On the Monad EVM, Sankalp enforces a strict mathematical invariant: Contract Balance == Total Raised - Total Released - Total Refunded. Funds cannot disappear or be redirected.`,
      },
      {
        title: '3. A Sample 3-Stage Milestone Plan',
        content: `Take a $10,000 hardware kit:
• Stage 1 (30%, $3,000): Raw parts and PCB fabrication. Proof: Vendor invoices + photo log.
• Stage 2 (50%, $5,000): Assembly and QA testing. Proof: Video of 40 functioning units.
• Stage 3 (20%, $2,000): Final school deliveries. Proof: Signed delivery receipts.`,
      },
    ],
    faqs: [
      {
        q: 'What happens if a creator fails to complete Stage 2?',
        a: 'Stage 3 funds ($2,000) remain safely in escrow and can be refunded back to backers.',
      },
    ],
  },
  'crypto-wallet-guide-for-first-time-backers': {
    sections: [
      {
        title: '1. Choosing the Right Wallet',
        content: `We recommend MetaMask or Rabby for Chrome/Brave/Edge desktop browsers, or MetaMask Mobile for iOS/Android. Avoid keeping funding balances in centralized exchange accounts.`,
      },
      {
        title: '2. Connecting to Monad Testnet',
        content: `Sankalp includes a 1-click network switcher that configures Monad Testnet (Chain ID 10143, RPC https://testnet-rpc.monad.xyz, Symbol MON).`,
      },
      {
        title: '3. Wallet Security Best Practices',
        content: `Never write your seed phrase on a computer or share it with anyone. Sankalp staff will never ask for your private key. Always verify the contract address on the Monad block explorer.`,
      },
    ],
    faqs: [
      {
        q: 'How much MON is needed for gas?',
        a: 'Less than $0.01 worth of MON is sufficient for dozens of campaign contributions.',
      },
    ],
  },
  'crowdfunding-for-students': {
    sections: [
      {
        title: '1. Funding University Prototypes and Final-Year Projects',
        content: `Engineering, robotics, and social-impact students frequently lack institutional funding for hardware parts. Sankalp allows students to raise $500 to $5,000 from alumni, tech professionals, and community supporters.`,
      },
      {
        title: '2. How to Write an Irresistible Student Story',
        content: `Focus on the problem you are solving, show initial sketches or breadboard prototypes, and explain how the project helps local schools or rural communities.`,
      },
    ],
    faqs: [
      {
        q: 'Can our college club run a team campaign?',
        a: 'Yes, a designated student leader can complete verification and manage milestones on behalf of the club.',
      },
    ],
  },
  'how-to-spot-a-risky-crowdfunding-project': {
    sections: [
      {
        title: '1. Red Flags in Crowdfunding Campaigns',
        content: `Watch out for:
• Vague milestone definitions (e.g. 'Marketing & Growth' without proof deliverables).
• Unrealistic goals that do not cover real bill-of-materials costs.
• Unverified creators with no external GitHub, portfolio, or community links.`,
      },
      {
        title: '2. The Power of On-Chain Transparency',
        content: `Inspect the project's contract on Monad. Check how many milestones are approved and examine community comments before pledging your USDC.`,
      },
    ],
    faqs: [
      {
        q: 'What should I do if I suspect a campaign is fraudulent?',
        a: 'Click the Report button on the project page. Our moderation team reviews reports within 48 hours.',
      },
    ],
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentData = POST_CONTENT[slug] || {
    sections: [
      {
        title: 'Introduction',
        content: post.metaDescription || 'Detailed analysis and guide for this crowdfunding topic.',
      },
    ],
    faqs: [],
  };

  const allProjects = getProjects().slice(0, 2);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    url: `https://sankalp.fund/blog/${slug}`,
    datePublished: post.published,
    author: {
      '@type': 'Organization',
      name: 'Sankalp Research',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sankalp',
      logo: 'https://sankalp.fund/logo.png',
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-8 transition font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to all guides
      </Link>

      <div className="space-y-4 mb-10 pb-8 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> {post.published}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readTime || '6 min read'}
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl">
          {post.metaDescription}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-3">
          Table of Contents
        </h2>
        <ul className="space-y-2 text-xs text-[#4B5563]">
          {contentData.sections.map((s, idx) => (
            <li key={idx}>
              <a
                href={`#section-${idx}`}
                className="hover:text-amber-600 transition flex items-center gap-2 font-medium"
              >
                <span className="text-amber-500">→</span>
                <span>{s.title}</span>
              </a>
            </li>
          ))}
          {contentData.faqs.length > 0 && (
            <li>
              <a href="#article-faqs" className="hover:text-amber-600 transition flex items-center gap-2 font-medium">
                <span className="text-amber-500">→</span>
                <span>Frequently Asked Questions</span>
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Sections Body */}
      <div className="space-y-10 mb-16">
        {contentData.sections.map((s, idx) => (
          <section key={idx} id={`section-${idx}`} className="space-y-3 scroll-mt-24">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">{s.title}</h2>
            <div className="text-sm text-[#4B5563] leading-relaxed whitespace-pre-line space-y-3 font-normal">
              {s.content}
            </div>
          </section>
        ))}
      </div>

      {/* Article FAQs */}
      {contentData.faqs.length > 0 && (
        <div id="article-faqs" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-16 scroll-mt-24">
          <h2 className="font-editorial text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            Article FAQ
          </h2>
          <div className="space-y-4">
            {contentData.faqs.map((f, i) => (
              <div key={i} className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB] space-y-1.5 text-xs">
                <h4 className="font-bold text-[#111827]">{f.q}</h4>
                <p className="text-[#4B5563] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internal Link Callouts */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-12">
        <h3 className="font-editorial text-xl font-bold text-[#111827] mb-2">Explore live campaigns in action</h3>
        <p className="text-xs text-[#4B5563] mb-6">
          See how real creators use milestone-based escrow to fund student labs and hardware.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allProjects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB] hover:border-amber-400 transition group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-wider">{p.categorySlug}</span>
                <h4 className="text-xs font-bold text-[#111827] group-hover:text-amber-600 transition mt-1 line-clamp-1">
                  {p.title}
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 font-mono mt-3">
                ${p.raisedUSDC.toLocaleString()} raised ({p.percentFunded}%)
              </span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
