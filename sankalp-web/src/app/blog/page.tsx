import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { getBlogPosts } from '@/lib/data';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Sankalp Blog: Crowdfunding Guides and Updates',
  description:
    'Practical guides on running a crowdfunding campaign, understanding blockchain funding and getting started with wallets.',
  canonical: '/blog',
});

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Sankalp Crowdfunding Guides & Updates',
    description:
      'Practical guides on running a crowdfunding campaign, understanding blockchain funding and getting started with wallets.',
    url: 'https://sankalp.fund/blog',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `https://sankalp.fund/blog/${p.slug}`,
      datePublished: p.published,
      keywords: p.targetKeyword,
    })),
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6">
          Guides and stories
        </h1>
        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
          Practical guides on running a crowdfunding campaign in India, understanding blockchain escrow,
          milestone release, and safely getting started with wallets.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center text-xs text-[#64748B] mb-3">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime || '6 min read'}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-lg font-bold text-[#111827] group-hover:text-[#D97706] transition mb-3 line-clamp-2 font-editorial">
                  {post.title}
                </h2>
              </Link>

              <p className="text-xs text-[#4B5563] line-clamp-3 leading-relaxed mb-6">
                {post.metaDescription ||
                  'Learn practical frameworks for decentralized milestone-based funding on Monad.'}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <span className="text-[#64748B]">{post.published}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-[#D97706] group-hover:text-[#B45309] font-bold flex items-center gap-1"
              >
                Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
