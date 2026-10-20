import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getProjects,
  getProjectBySlug,
  getCreatorById,
  getCategoryBySlug,
  getMilestonesForProject,
  getUpdatesForProject,
  getCommentsForProject,
  getContributionsForProject,
} from '@/lib/data';
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateProjectSchema,
} from '@/lib/seo';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({ title: 'Project Not Found' });
  }

  const trimmedTitle =
    project.title.length > 40 ? `${project.title.slice(0, 37)}...` : project.title;

  const category = getCategoryBySlug(project.categorySlug);
  const creator = getCreatorById(project.creatorId);

  return constructMetadata({
    title: `${trimmedTitle} | Fund on Sankalp`,
    description: `${project.summary} Raised $${project.raisedUSDC.toLocaleString()} of $${project.goalUSDC.toLocaleString()}. ${project.daysLeft} days left. Funds protected by smart contract.`,
    keywords: [
      project.title,
      category ? category.name : 'Crowdfunding',
      creator ? creator.displayName : 'Indian Creator',
      'milestone crowdfunding',
      'back this project',
      'Monad testnet escrow',
      'smart contract funding',
    ],
    canonical: `/projects/${slug}`,
    image: project.coverImage,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const creator = getCreatorById(project.creatorId);
  const category = getCategoryBySlug(project.categorySlug);
  const milestones = getMilestonesForProject(project.id);
  const updates = getUpdatesForProject(project.id);
  const comments = getCommentsForProject(project.id);
  const contributions = getContributionsForProject(project.id);
  const relatedProjects = getProjects({ category: project.categorySlug })
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Explore', url: '/explore' },
    { name: project.title, url: `/projects/${project.slug}` },
  ]);

  const projectSchema = generateProjectSchema({
    title: project.title,
    summary: project.summary,
    slug: project.slug,
    goalUSDC: project.goalUSDC,
    raisedUSDC: project.raisedUSDC,
    creatorName: creator?.displayName || 'Creator',
    created: project.created,
    coverImage: project.coverImage,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectDetailClient
        project={project}
        creator={creator}
        category={category}
        milestones={milestones}
        updates={updates}
        comments={comments}
        contributions={contributions}
        relatedProjects={relatedProjects}
      />
    </>
  );
}
