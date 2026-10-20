import { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sankalp.fund';
export const SITE_NAME = 'Sankalp';
export const SITE_TAGLINE = 'Fund ideas that keep their promises.';
export const DEFAULT_TITLE = 'Sankalp - Crowdfunding platform';
export const DEFAULT_DESCRIPTION =
  'Back student, community and startup projects with smart-contract protection. Funds release on milestones, with refunds if goals aren’t met.';

export const DEFAULT_KEYWORDS = [
  'milestone crowdfunding',
  'blockchain crowdfunding India',
  'smart contract escrow',
  'Monad blockchain',
  'transparent donations',
  'student startup funding',
  'community fundraisers',
  'refund protected crowdfunding',
  'decentralized Kickstarter India',
  'USDC funding',
  'proof of milestone release',
  'public goods funding',
];

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = '/og-default.png',
  canonical,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const fullTitle = !title || title === DEFAULT_TITLE
    ? DEFAULT_TITLE
    : (title.includes('Sankalp') ? title : `${title} | ${SITE_NAME}`);
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return {
    title: fullTitle,
    description,
    keywords: keywords || DEFAULT_KEYWORDS,
    authors: [{ name: 'Sankalp Team', url: SITE_URL }],
    creator: 'Sankalp Foundation',
    publisher: 'Sankalp Crowdfunding',
    applicationName: 'Sankalp',
    category: 'Finance / Crowdfunding',
    formatDetection: {
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl || SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
      creator: '@sankalp',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sankalp',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: ['https://x.com/sankalp', 'https://www.linkedin.com/company/sankalp', 'https://github.com/sankalp-fund'],
    description: 'Decentralized milestone-based crowdfunding on Monad blockchain',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sankalp',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/explore?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateProjectSchema(project: {
  title: string;
  summary: string;
  slug: string;
  goalUSDC: number;
  raisedUSDC: number;
  creatorName: string;
  created: string;
  coverImage: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FundingCampaign',
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}/projects/${project.slug}`,
    image: project.coverImage,
    startDate: project.created,
    funder: {
      '@type': 'Person',
      name: project.creatorName,
    },
    potentialAction: {
      '@type': 'DonateAction',
      target: `${SITE_URL}/projects/${project.slug}`,
      recipient: {
        '@type': 'Organization',
        name: project.title,
      },
    },
  };
}
