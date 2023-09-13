import { groq } from "next-sanity";

const postFields = groq`
_id,
publishedAt,
title,
subtitle,
author -> {
  name, 
  image
},
description,
mainImage,
"slug": slug.current,
`;

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
    "comments":*[_type == "comment" && post._ref == ^._id && approved == true],
    body,
  ${postFields}
}
`;

export const pathQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
