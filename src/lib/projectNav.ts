import type { Project } from '../data/types';

export function findProjectBySlug(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

function indexOfSlug(projects: Project[], slug: string): number {
  return projects.findIndex((p) => p.slug === slug);
}

export function getPrevProject(projects: Project[], slug: string): Project | undefined {
  const i = indexOfSlug(projects, slug);
  if (i === -1) return undefined;
  return projects[(i - 1 + projects.length) % projects.length];
}

export function getNextProject(projects: Project[], slug: string): Project | undefined {
  const i = indexOfSlug(projects, slug);
  if (i === -1) return undefined;
  return projects[(i + 1) % projects.length];
}
