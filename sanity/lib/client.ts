import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";
import { indexQuery, pathQuery, postBySlugQuery } from "./queries";
import { Post } from "../../typings";

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
  });
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts");
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    });
  }
  return client;
}

export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(indexQuery)) || [];
}

export async function getAllPostsSlugs(): Promise<Pick<Post, "slug">[]> {
  const client = getClient();
  const slugs = (await client.fetch<string[]>(pathQuery)) || [];

  return slugs.map((slug) => ({ slug }));
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any);
}
