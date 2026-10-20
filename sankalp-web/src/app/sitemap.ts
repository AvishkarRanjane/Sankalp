import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getProjects, getCategories, seedCreators, getBlogPosts } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedDate = new Date('2026-10-18T00:00:00.000Z');

  const staticPages = [
    '',
    '/explore',
    '/how-it-works',
    '/for-creators',
    '/for-donors',
    '/trust-and-safety',
    '/fees',
    '/faq',
    '/about',
    '/blog',
    '/contact',
    '/terms',
    '/privacy',
    '/cookies',
    '/risk-disclosure',
    '/prohibited-projects',
    '/refund-policy',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: fixedDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const projects = getProjects().map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.created || '2026-10-18T00:00:00.000Z'),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const categories = getCategories().map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: fixedDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const creators = seedCreators.map((c) => ({
    url: `${SITE_URL}/creators/${c.handle}`,
    lastModified: fixedDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogPosts = getBlogPosts().map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.published || '2026-10-18T00:00:00.000Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projects, ...categories, ...creators, ...blogPosts];
}
