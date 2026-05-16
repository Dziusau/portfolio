export type SectionKind = 'scenario' | 'zone' | 'iteration' | 'logic';

export type ProjectSection = {
  kind: SectionKind;
  label: string;
  title: string;
  body: string;
  map?: string;
  media?: string[];
  beforeAfter?: { before: string; after: string };
};

export type ProjectMeta = {
  game: string;
  studio: string;
  year: number;
  role: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  intro: string;
  meta: ProjectMeta;
  hero: { type: 'image' | 'video'; src: string };
  thumbnail: string;
  sections: ProjectSection[];
  closingVideo?: string;
};

export type About = {
  bio: string;
  tools: string[];
  cvUrl: string;
  contacts: {
    email: string;
    linkedin: string;
    artstation: string | null;
    vimeo: string | null;
  };
};
