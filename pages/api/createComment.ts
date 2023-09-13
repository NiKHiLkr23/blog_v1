import type { NextApiRequest, NextApiResponse } from "next";

import { createClient } from "next-sanity";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "2023-08-14",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
};

// Set up the client for fetching data in the getProps page
const sanityClient = createClient(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment, image } = JSON.parse(req.body);
  try {
    const response = await sanityClient.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      image,
      comment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed", error });
  }
  return res.status(200).json({ message: "Success" });
}
