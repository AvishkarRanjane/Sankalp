import rawSeedData from '@/data/seed-data.json';
import {
  Category,
  Creator,
  Project,
  Milestone,
  ProjectUpdate,
  Comment,
  Contribution,
  FAQ,
  BlogPost,
  Testimonial,
  Stats,
} from '@/types';

// Augment projects with rich story, budget, and risks from the SEO pack
const enrichedProjects: Project[] = (rawSeedData.projects as unknown as Project[]).map((p) => {
  if (p.slug === 'pocket-lab-science-kits-village-schools') {
    return {
      ...p,
      story: `Most village schools we visited had a lab room but no equipment. Students learn about circuits and chemical reactions from the blackboard and never touch a battery. Pocket Lab changes that with a kit that costs about ₹2,500 to build, fits in a school bag, and covers 20 experiments from the state curriculum.

Our team of four engineering students has tested a prototype kit with 120 students in two schools. Test scores on practical questions rose by an average of 22%. Now we want to build and deliver 40 kits, train one teacher per school, and publish all designs openly so anyone can copy them.

All parts are locally sourced in Maharashtra, repairable with basic tools, and come with Marathi and English illustrated experiment guides.`,
      budgetBreakdown: [
        { item: 'Components and packaging for 40 kits', amount: 6900 },
        { item: 'Teacher training workshops (8 sessions)', amount: 2400 },
        { item: 'Transport and delivery across 4 districts', amount: 1300 },
        { item: 'Documentation and open-source release', amount: 600 },
        { item: 'Platform fee (3%) and contingency reserve', amount: 800 },
      ],
      risks: `Component prices may fluctuate slightly, so we kept an 8% contingency buffer. School calendars can delay deliveries during exam seasons, so we scheduled field trips outside test windows. If we raise less than the goal, the smart contract automatically enables 100% refunds for all backers, and we will not proceed with an underfunded batch.`,
    };
  }

  if (p.slug === 'harbour-light-library') {
    return {
      ...p,
      story: `Colaba is known for historic monuments, but children of municipal workers and dockworkers have virtually no quiet, air-cooled study spaces with modern reference books. Harbour Light Library takes an abandoned 650 sq ft municipal ward room and converts it into a community learning hub.

We are curating 3,000 books spanning competitive exam guides (MPSC, UPSC, NEET), science textbooks, Marathi and Hindi literature, plus high-speed Wi-Fi and 6 donated laptops for online research.`,
      budgetBreakdown: [
        { item: 'Refurbishment, flooring & lighting', amount: 3200 },
        { item: '3,000 curated books & reference guides', amount: 3100 },
        { item: 'Workstations, ergonomic chairs & shelves', amount: 1600 },
        { item: 'Security, Wi-Fi & platform fee (3%)', amount: 1100 },
      ],
      risks: `Local civic permissions have been secured in principle. Any renovation delays will be communicated immediately via verified on-chain updates.`,
    };
  }

  if (p.slug === 'solarstack-mini-phone-charging-stations') {
    return {
      ...p,
      story: `Rural bus stops in the Western Ghats frequently lose power for days during monsoons. Passengers, students, and emergency workers often find their communication cut off.

SolarStack Mini is an open-hardware, weather-proof charging terminal with dual 50W monocrystalline solar panels, LiFePO4 battery pack, and 8 tamper-proof USB-C fast-charging ports. All designs and CAD schematics will be released under CERN Open Hardware Licence.`,
      budgetBreakdown: [
        { item: 'Solar panels, LiFePO4 batteries & charge controllers', amount: 7800 },
        { item: 'Vandal-resistant CNC metal enclosures & poles', amount: 4200 },
        { item: 'Installation across 10 rural bus junctions', amount: 1900 },
        { item: 'Documentation, tooling & contingency', amount: 1100 },
      ],
      risks: `Theft and weather damage are mitigated by anti-theft security bolts, embedded GPS trackers, and IP67 weather-sealing.`,
    };
  }

  return {
    ...p,
    story: `${p.summary}

This project is built from the ground up to solve real community needs with transparent milestone delivery. Backers can track every stage of development, inspect receipts, and verify fund releases on the Monad blockchain explorer.`,
    budgetBreakdown: [
      { item: 'Primary materials & production', amount: Math.round(p.goalUSDC * 0.6) },
      { item: 'Logistics, delivery & setup', amount: Math.round(p.goalUSDC * 0.25) },
      { item: 'Platform fee (3%) & contingency', amount: Math.round(p.goalUSDC * 0.15) },
    ],
    risks: `Supply chain delays or seasonal constraints could push target dates by 1–2 weeks. All milestone evidence will be published transparently with photo and invoice proof.`,
  };
});

export const seedStats: Stats = rawSeedData.stats as Stats;
export const seedCategories: Category[] = rawSeedData.categories as Category[];
export const seedCreators: Creator[] = rawSeedData.creators as Creator[];
export const seedProjects: Project[] = enrichedProjects;
export const seedMilestones: Milestone[] = rawSeedData.milestones as Milestone[];
const defaultUpdates: ProjectUpdate[] = [
  {
    id: 'up_01',
    projectId: 'pr_01',
    dayNumber: 12,
    title: 'All 40 PCB batches arrived',
    body: 'Photos of the soldering session are attached. Component testing has begun across all 20 curriculum experiments.',
    timestamp: '2026-08-31T10:00:00Z',
    isDemo: true,
  },
  {
    id: 'up_02',
    projectId: 'pr_01',
    dayNumber: 20,
    title: 'Milestone 1 submitted. Test report published',
    body: 'Completed initial assembly of prototype batch. Verification test report submitted to platform reviewers.',
    timestamp: '2026-09-08T10:00:00Z',
    isDemo: true,
  },
  {
    id: 'up_03',
    projectId: 'pr_02',
    dayNumber: 15,
    title: 'Ward room cleaning and first 1,200 books arrived',
    body: 'The municipal ward office floor has been refurbished and 1,200 competitive examination books catalogued.',
    timestamp: '2026-09-05T10:00:00Z',
    isDemo: true,
  },
];

const defaultComments: Comment[] = [
  {
    id: 'cm_01',
    projectId: 'pr_01',
    authorName: 'Vikram Joshi',
    authorWallet: '0x12c4...88ef',
    body: 'Great initiative for rural schools. Are the experiment manuals available in Marathi as well as English?',
    timestamp: '2026-09-02T14:30:00Z',
    isDemo: true,
  },
  {
    id: 'cm_02',
    projectId: 'pr_01',
    authorName: 'Aarav Kulkarni (Creator)',
    authorWallet: '0x0000...03e8',
    body: 'Yes Vikram! All 20 experiment cards are printed bilingually in Marathi and English with color illustrations.',
    timestamp: '2026-09-02T16:15:00Z',
    isDemo: true,
  },
  {
    id: 'cm_03',
    projectId: 'pr_02',
    authorName: 'Dr. Rahul D.',
    authorWallet: '0x0000...03ef',
    body: 'Pledged 50 USDC. Colaba youth desperately need this study space.',
    timestamp: '2026-09-10T11:00:00Z',
    isDemo: true,
  },
];

export const seedUpdates: ProjectUpdate[] = defaultUpdates;
export const seedComments: Comment[] = defaultComments;
export const seedContributions: Contribution[] = (rawSeedData.contributions || []) as Contribution[];
export const seedFAQs: FAQ[] = (rawSeedData.faqs || []) as FAQ[];
export const seedBlogPosts: BlogPost[] = (rawSeedData.blogPosts || []) as BlogPost[];
export const seedTestimonials: Testimonial[] = (rawSeedData.testimonials || []) as Testimonial[];

export function getStats(): Stats {
  return seedStats;
}

export function getCategories(): Category[] {
  return seedCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return seedCategories.find((c) => c.slug === slug);
}

export function getProjects(filters?: {
  category?: string;
  status?: string;
  search?: string;
  sort?: string;
}): Project[] {
  let list = [...seedProjects];

  if (filters?.category && filters.category !== 'all') {
    list = list.filter((p) => p.categorySlug === filters.category);
  }

  if (filters?.status && filters.status !== 'all') {
    list = list.filter((p) => p.status === filters.status);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q)
    );
  }

  if (filters?.sort) {
    switch (filters.sort) {
      case 'most-funded':
        list.sort((a, b) => b.percentFunded - a.percentFunded);
        break;
      case 'ending-soon':
        list.sort((a, b) => a.daysLeft - b.daysLeft);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        break;
      case 'trending':
      default:
        list.sort((a, b) => b.backersCount - a.backersCount);
        break;
    }
  }

  return list;
}

export function getFeaturedProjects(): Project[] {
  return seedProjects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return seedProjects.find((p) => p.slug === slug);
}

export function getMilestonesForProject(projectId: string): Milestone[] {
  return seedMilestones
    .filter((m) => m.projectId === projectId)
    .sort((a, b) => a.index - b.index);
}

export function getUpdatesForProject(projectId: string): ProjectUpdate[] {
  return seedUpdates
    .filter((u) => u.projectId === projectId)
    .sort((a, b) => b.dayNumber - a.dayNumber);
}

export function getCommentsForProject(projectId: string): Comment[] {
  return seedComments.filter((c) => c.projectId === projectId);
}

export function getContributionsForProject(projectId: string): Contribution[] {
  return seedContributions.filter((c) => c.projectId === projectId);
}

export function getCreatorById(id: string): Creator | undefined {
  return seedCreators.find((c) => c.id === id);
}

export function getCreatorByHandle(handle: string): Creator | undefined {
  return seedCreators.find((c) => c.handle === handle);
}

export function getCreatorProjects(creatorId: string): Project[] {
  return seedProjects.filter((p) => p.creatorId === creatorId);
}

export function getFAQs(audience?: 'backers' | 'creators'): FAQ[] {
  if (!audience) return seedFAQs;
  return seedFAQs.filter((f) => f.audience === audience);
}

export function getBlogPosts(): BlogPost[] {
  return seedBlogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return seedBlogPosts.find((p) => p.slug === slug);
}

export function getTestimonials(): Testimonial[] {
  return seedTestimonials;
}
