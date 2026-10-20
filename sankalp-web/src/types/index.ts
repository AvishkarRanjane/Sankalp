export interface Stats {
  projectsFunded: number;
  totalRaisedUSDC: number;
  backers: number;
  milestonesOnTimePercent: number;
  isDemo?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
}

export interface Creator {
  id: string;
  handle: string;
  displayName: string;
  city: string;
  bio: string;
  walletAddress: string;
  verified: boolean;
  joined: string;
  isDemo?: boolean;
  avatar?: string;
}

export type ProjectStatus = 'live' | 'funded' | 'completed' | 'failed' | 'cancelled';

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  creatorId: string;
  goalUSDC: number;
  raisedUSDC: number;
  percentFunded: number;
  backersCount: number;
  deadline: string;
  daysLeft: number;
  status: ProjectStatus;
  coverImage: string;
  contractAddress: string;
  metadataCID: string;
  featured: boolean;
  isDemo?: boolean;
  created: string;
  createdAt?: string;
  creatorName?: string;
  story?: string;
  budgetBreakdown?: { item: string; amount: number }[];
  risks?: string;
}

export type MilestoneStatus = 'locked' | 'pending' | 'released';

export interface Milestone {
  id: string;
  projectId: string;
  index: number;
  title: string;
  percent: number;
  amountUSDC: number;
  proofRequired: string;
  status: MilestoneStatus;
  targetDays?: number;
  evidenceCID?: string;
  submissionDate?: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  dayNumber: number;
  title: string;
  body: string;
  timestamp: string;
  images?: string[];
  isDemo?: boolean;
}

export interface Comment {
  id: string;
  projectId: string;
  authorWallet: string;
  authorName: string;
  body: string;
  timestamp: string;
  isDemo?: boolean;
}

export interface Contribution {
  id: string;
  txHash: string;
  projectId: string;
  backerWallet: string;
  amountUSDC: number;
  timestamp: string;
  isDemo?: boolean;
}

export interface FAQ {
  id: string;
  audience: 'backers' | 'creators';
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  targetKeyword: string;
  metaDescription?: string;
  status: 'draft' | 'published';
  published: string;
  isDemo?: boolean;
  content?: string;
  readTime?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  isDemo?: boolean;
}

export interface SeedData {
  stats: Stats;
  categories: Category[];
  creators: Creator[];
  projects: Project[];
  milestones: Milestone[];
  updates: ProjectUpdate[];
  comments: Comment[];
  contributions: Contribution[];
  faqs: FAQ[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
}
