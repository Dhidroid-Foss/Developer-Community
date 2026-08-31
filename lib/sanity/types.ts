/**
 * Types mapped from the project's Sanity GROQ queries.
 * Optional wherever CMS documents may omit a field.
 */

export type SanitySlug = string | { current?: string | null } | null;

export type SanityAsset = {
  _id?: string;
  url?: string;
};

export type SanityImage = {
  asset?: SanityAsset | null;
  alt?: string | null;
} | null;

export type SanityCategory = {
  title?: string | null;
};

export type PortableSpan = {
  _type?: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

export type PortableBlock = {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PortableSpan[];
  alt?: string;
  caption?: string;
  asset?: SanityAsset | null;
  code?: string;
  language?: string;
  [key: string]: unknown;
};

export type PortableTextValue = PortableBlock[] | string | null;

export type AuthorRef = {
  name?: string | null;
  slug?: SanitySlug;
  image?: SanityImage;
  bio?: PortableTextValue;
};

export type BlogPost = {
  _id?: string;
  title?: string | null;
  slug?: SanitySlug;
  mainImage?: SanityImage;
  author?: AuthorRef | null;
  categories?: SanityCategory[] | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  bodyText?: string | null;
  body?: PortableTextValue;
};

export type RelatedPost = {
  _id?: string;
  title?: string | null;
  slug?: SanitySlug;
  publishedAt?: string | null;
  mainImage?: SanityImage;
  categories?: SanityCategory[] | null;
  bodyText?: string | null;
};

export type AuthorLatestPost = {
  title?: string | null;
  slug?: SanitySlug;
  publishedAt?: string | null;
};

export type Author = {
  _id?: string;
  name?: string | null;
  slug?: SanitySlug;
  image?: SanityImage;
  bio?: PortableTextValue;
  postCount?: number | null;
  latestPosts?: AuthorLatestPost[] | null;
  posts?: BlogPost[] | null;
};

export type Work = {
  title?: string | null;
  slug?: SanitySlug;
  tagline?: string | null;
  year?: number | string | null;
  role?: string | null;
  description?: string | null;
  challenge?: string | null;
  results?: string | null;
  link?: string | null;
  github?: string | null;
  solution?: string | null;
  image?: SanityImage;
  gallery?: SanityImage[] | null;
  categories?: SanityCategory[] | null;
};
