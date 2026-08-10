/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Developer {
  id: string;
  name: string;
  role: string;
  location: string;
  /** Accepts a string URL, a Next.js static-import object, or any legacy shape. Use getAvatarUrl() to normalise. */
  avatar: string | undefined | any;
  bio: string;
  skills: string[];
  projects: { title: string; desc: string }[];
  github: string;
  linkedin: string;
  email: string;
  stack: string[];
  website?: string;
}
