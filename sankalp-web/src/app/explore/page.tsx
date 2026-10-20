import React from 'react';
import { Metadata } from 'next';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import ExploreClient from './ExploreClient';
import { getCategories, getProjects } from '@/lib/data';

export const metadata: Metadata = constructMetadata({
  title: 'Explore Verified Campaigns | Milestone Protected Crowdfunding',
  description:
    'Discover verified student technology, community ovens, solar initiatives, and creative arts campaigns on Monad. Filter by impact category, raised funds, and milestone delivery status.',
  keywords: [
    'explore crowdfunding projects',
    'student STEM kits funding',
    'clean energy community projects',
    'verified tech campaigns India',
    'milestone escrow projects',
    'back Indian creators',
    'active fundraisers',
  ],
  canonical: '/explore',
});

export default function ExplorePage() {
  const categories = getCategories();
  const allProjects = getProjects();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Explore', url: '/explore' },
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Explore Crowdfunding Projects',
    description:
      'Discover student, community, tech and creative projects raising funds with milestone protection.',
    url: 'https://sankalp.fund/explore',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allProjects.slice(0, 12).map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://sankalp.fund/projects/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <ExploreClient categories={categories} initialProjects={allProjects} />
    </>
  );
}
