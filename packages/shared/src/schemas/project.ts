export interface MilestoneInput {
  title: string;
  percent: number;
  proofRequired: string;
}

export interface CreateProjectInput {
  title: string;
  summary: string;
  categorySlug: string;
  location: string;
  coverImage: string;
  story: string;
  risks: string;
  goalUSDC: number;
  durationDays: number;
  milestones: MilestoneInput[];
}

export function validateProjectInput(input: CreateProjectInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!input.title || input.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (input.title.length > 70) {
    errors.push('Title must be at most 70 characters');
  }

  if (!input.summary || input.summary.trim().length === 0) {
    errors.push('Summary is required');
  } else if (input.summary.length > 140) {
    errors.push('Summary must be at most 140 characters');
  }

  if (!input.goalUSDC || input.goalUSDC <= 0) {
    errors.push('Goal must be greater than 0 USDC');
  }

  if (!input.durationDays || input.durationDays < 7 || input.durationDays > 60) {
    errors.push('Duration must be between 7 and 60 days');
  }

  if (!input.milestones || input.milestones.length === 0) {
    errors.push('At least 1 milestone is required');
  } else if (input.milestones.length > 5) {
    errors.push('Maximum 5 milestones permitted');
  } else {
    const totalPercent = input.milestones.reduce((acc, m) => acc + (Number(m.percent) || 0), 0);
    if (totalPercent !== 100) {
      errors.push(`Milestone percentages must sum to 100% (currently ${totalPercent}%)`);
    }

    input.milestones.forEach((m, idx) => {
      if (!m.title || m.title.trim().length === 0) {
        errors.push(`Milestone #${idx + 1} requires a title`);
      }
      if (!m.proofRequired || m.proofRequired.trim().length === 0) {
        errors.push(`Milestone #${idx + 1} requires proof verification details`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
