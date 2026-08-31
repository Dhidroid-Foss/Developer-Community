/** GROQ queries — field lists follow the project's provided Sanity queries. */

export const POSTS_QUERY = `*[_type == "post"] {
  title,
  slug { current },
  mainImage { asset->{_id, url}, alt },
  author -> { name, slug, image { asset->{_id, url} } },
  categories[] -> { title },
  publishedAt,
  "excerpt": pt::text(body)[0...200],
  "bodyText": pt::text(body)
} | order(publishedAt desc)`;

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug { current },
  mainImage { asset->{_id, url}, alt },
  author -> { name, slug, image { asset->{_id, url} }, bio },
  categories[] -> { title },
  publishedAt,
  "excerpt": pt::text(body)[0...200],
  "bodyText": pt::text(body),
  body
}`;

export const RELATED_POSTS_QUERY = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage { asset->{_id, url} },
  categories[] -> { title },
  "bodyText": pt::text(body)
}`;

export const AUTHORS_QUERY = `*[_type == "author"] {
  _id,
  name,
  slug,
  image { asset->{_id, url} },
  bio,
  "postCount": count(*[_type == "post" && references(^._id)]),
  "latestPosts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3] {
    title,
    slug,
    publishedAt
  }
} | order(postCount desc)`;

export const AUTHOR_SLUGS_QUERY = `*[_type == "author" && defined(slug.current)]{ "slug": slug.current }`;

export const AUTHOR_BY_SLUG_QUERY = `*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  image { asset->{_id, url} },
  bio,
  "postCount": count(*[_type == "post" && references(^._id)]),
  "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
    title,
    slug { current },
    mainImage { asset->{_id, url}, alt },
    categories[] -> { title },
    publishedAt,
    "excerpt": pt::text(body)[0...200],
    "bodyText": pt::text(body)
  }
}`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(year desc) {
  title,
  tagline,
  year,
  role,
  description,
  link,
  github,
  image { asset->{_id, url} },
  categories[] -> { title },
  slug { current }
}`;

export const PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  title,
  tagline,
  year,
  role,
  description,
  challenge,
  results,
  link,
  github,
  solution,
  image {
    asset->{ _id, url }
  },
  gallery[] {
    asset->{ _id, url }
  },
  categories[] -> { title },
  slug { current }
}`;
