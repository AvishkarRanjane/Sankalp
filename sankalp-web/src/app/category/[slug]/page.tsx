import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getCategories, getCategoryBySlug, getProjects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import { constructMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import { Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_SEO_DATA: Record<
  string,
  {
    h1: string;
    metaDescription: string;
    intro: string;
    faqs: { question: string; answer: string }[];
  }
> = {
  'education-students': {
    h1: 'Education & student projects',
    metaDescription:
      'Fund student research, school labs and learning tools. Milestone-protected crowdfunding for education projects across India.',
    intro:
      'Back classrooms, labs and student teams building something useful. Each project lists clear milestones, so you can see learning tools and prototypes take shape as funds are released.',
    faqs: [
      {
        question: 'Who can start a student or education campaign?',
        answer:
          'Enrolled college students, university researchers, school teachers, or registered educational clubs aged 18+ can apply.',
      },
      {
        question: 'What milestone proof is required for educational kits?',
        answer:
          'Component procurement receipts, assembly logs, and school delivery sign-offs or teacher acknowledgements.',
      },
      {
        question: 'Can donors get study kits as rewards?',
        answer:
          'Yes, creators can offer sample kits, open-hardware documentation, or donor recognition plaques.',
      },
    ],
  },
  'technology-hardware': {
    h1: 'Technology & hardware projects',
    metaDescription:
      'Back open-source tools, IoT devices and maker hardware. Contributions are held in smart contracts and released on milestones.',
    intro:
      'From sensors to software, support makers who share their designs. Hardware projects publish prototypes, test results and bills of materials at every milestone.',
    faqs: [
      {
        question: 'How do hardware creators verify progress?',
        answer:
          'Creators upload PCB fab orders, firmware Git commits, and video demonstrations of working prototype units.',
      },
      {
        question: 'What happens if hardware components are delayed?',
        answer:
          'Creators publish an update explaining the supply delay. Funds remain safely in escrow until delivery is verified.',
      },
      {
        question: 'Are open hardware licenses required?',
        answer:
          'Open-source schematics (CERN, TAPR, or MIT) are strongly recommended and receive priority placement.',
      },
    ],
  },
  'community-social': {
    h1: 'Community & social causes',
    metaDescription:
      'Support neighbourhood libraries, clean-ups and local initiatives with transparent, milestone-based crowdfunding.',
    intro:
      'Fund the things that make a neighbourhood better. Community projects show exactly how each stage of funding is spent, with photos and receipts.',
    faqs: [
      {
        question: 'How are community funds protected from misuse?',
        answer:
          'Funds are released in tranches only after civic approvals, site permits, and purchase invoices are verified.',
      },
      {
        question: 'Can anyone in the neighbourhood inspect the project?',
        answer:
          'Yes, physical sites are open to public visits, and every rupee spent is recorded on the Monad block explorer.',
      },
      {
        question: 'Are personal medical bills allowed here?',
        answer:
          'No. To prevent fraud, Sankalp does not support individual medical fundraising. Only community health programs are eligible.',
      },
    ],
  },
  'arts-culture': {
    h1: 'Arts & culture projects',
    metaDescription:
      'Help musicians, filmmakers, writers and artists bring work to life through protected crowdfunding.',
    intro:
      'Back independent creators and get closer to the work. Creators share drafts, behind-the-scenes updates and rewards as milestones are met.',
    faqs: [
      {
        question: 'What proof do arts projects provide?',
        answer:
          'Studio booking confirmations, rough music cuts, draft film screeners, and distribution links.',
      },
      {
        question: 'Do backers own copyright?',
        answer:
          'No, creators retain 100% intellectual property. Backers receive rewards, credits, and community access.',
      },
      {
        question: 'Can creators offer NFT or digital collectibles?',
        answer:
          'Yes, creators can distribute commemorative digital collectibles on Monad to verified backers.',
      },
    ],
  },
  'environment-sustainability': {
    h1: 'Environment & sustainability projects',
    metaDescription:
      'Fund tree planting, solar, waste reduction and clean-energy projects with transparent milestone releases.',
    intro:
      'Support practical climate and clean-up work. Creators report measurable outcomes, such as trees planted or kilowatts installed, at each milestone.',
    faqs: [
      {
        question: 'How is environmental impact measured?',
        answer:
          'Geo-tagged photos, third-party carbon audit reports, and periodic survival surveys after 90 days.',
      },
      {
        question: 'Can volunteer groups start campaigns?',
        answer:
          'Yes, community groups and registered environmental NGOs can launch campaigns with milestone deliverables.',
      },
      {
        question: 'What if seedlings do not survive?',
        answer:
          'Final milestone payouts require a 90-day survival report ensuring high plant longevity standards.',
      },
    ],
  },
  'small-business-startups': {
    h1: 'Small business & startup projects',
    metaDescription:
      'Help local businesses and early startups raise seed funding with milestone-based release and public proof of progress.',
    intro:
      'Back founders building small businesses. Reward-based campaigns let you pre-order products or services while funds are released in stages.',
    faqs: [
      {
        question: 'Is this equity crowdfunding?',
        answer:
          'No. In compliance with SEBI regulations, Sankalp is strictly reward and pre-order crowdfunding. No equity or profit share is offered.',
      },
      {
        question: 'What happens if a startup fails to deliver?',
        answer:
          'Any unreleased milestone funds remain in escrow and are refunded proportionally to all backers.',
      },
      {
        question: 'What is the platform fee?',
        answer:
          'A flat 3% fee applies only if the campaign successfully reaches 100% of its target.',
      },
    ],
  },
  'science-research': {
    h1: 'Science & research projects',
    metaDescription:
      'Crowdfund open science, citizen research and field studies with transparent budgets and milestone reporting.',
    intro:
      'Support curious people doing careful work. Researchers publish methods and results, and funds release as data is collected and shared.',
    faqs: [
      {
        question: 'Are lab facilities verified?',
        answer:
          'Yes, research teams must provide institutional affiliation or verified maker-space partnership documents.',
      },
      {
        question: 'How are research milestones formatted?',
        answer:
          'Phased across field sampling, laboratory assay results, and open-access data publication.',
      },
      {
        question: 'Is data published openly?',
        answer:
          'Yes, projects in this category commit to open-access preprints and public data repositories.',
      },
    ],
  },
  'health-wellbeing': {
    h1: 'Health & wellbeing projects',
    metaDescription:
      'Fund community wellness, mental-health awareness and fitness initiatives. Not for individual medical treatment.',
    intro:
      'Back programmes that help communities stay well. Individual medical fundraising is not supported on Sankalp in this version.',
    faqs: [
      {
        question: 'Why are personal medical emergencies excluded?',
        answer:
          'Personal medical campaigns have the highest fraud and compliance risks. We focus exclusively on institutional and community wellness programs.',
      },
      {
        question: 'What types of wellness projects qualify?',
        answer:
          'Mental health workshops, school nutrition initiatives, clean drinking water dispensaries, and public fitness facilities.',
      },
      {
        question: 'Who verifies health workshop deliverables?',
        answer:
          'Attendance rosters, venue agreements, and certified trainer credential submissions.',
      },
    ],
  },
};

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const data = CATEGORY_SEO_DATA[slug];

  if (!category) {
    return constructMetadata({ title: 'Category Not Found' });
  }

  return constructMetadata({
    title: `${category.name} Crowdfunding Projects`,
    description: data?.metaDescription || category.description,
    canonical: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const allCategories = getCategories();

  if (!category) {
    notFound();
  }

  const categoryData = CATEGORY_SEO_DATA[slug] || {
    h1: `${category.name} projects`,
    metaDescription: category.description,
    intro: category.description,
    faqs: [],
  };

  const projects = getProjects({ category: slug });
  const relatedCategories = allCategories.filter((c) => c.slug !== slug).slice(0, 4);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/explore' },
    { name: category.name, url: `/category/${slug}` },
  ]);

  const faqSchema = generateFAQSchema(categoryData.faqs);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Category Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          {categoryData.h1}
        </h1>
        <p className="text-base text-[#4B5563] leading-relaxed">{categoryData.intro}</p>
      </div>

      {/* Projects Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#111827] font-editorial">
            Live and funded campaigns ({projects.length})
          </h2>
          <Link
            href="/creator/new"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] hover:text-[#B45309] transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start a {category.name.toLowerCase()} project
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs text-center">
            <p className="text-sm text-[#4B5563] mb-4">
              Be the first to launch a campaign in {category.name}!
            </p>
            <Link
              href="/creator/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs transition"
            >
              Start a project
            </Link>
          </div>
        )}
      </div>

      {/* Category FAQs */}
      {categoryData.faqs.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-16 max-w-4xl">
          <h3 className="text-xl font-bold text-[#111827] font-editorial mb-6">
            Frequently asked questions about {category.name}
          </h3>
          <div className="space-y-4">
            {categoryData.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB]">
                <h4 className="text-sm font-bold text-[#111827] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  {faq.question}
                </h4>
                <p className="text-xs text-[#4B5563] leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Categories */}
      <div className="pt-8 border-t border-[#E5E7EB]">
        <h3 className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-4">
          Explore Related Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedCategories.map((rc) => (
            <Link
              key={rc.slug}
              href={`/category/${rc.slug}`}
              className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs hover:border-amber-400 transition text-xs flex items-center justify-between group"
            >
              <span className="font-semibold text-slate-700 group-hover:text-amber-600 transition">
                {rc.name}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
