declare module "*.pdf";

interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Post extends SanityBody {
  _type: "post";
  _id: string;
  publishedAt: string;
  title: string;
  subtitle: string;
  author: { name: string; image: string };
  comments: Comment[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: string;

  body: any;
}

export interface Comment extends SanityBody {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  image: string;
  post: {
    _ref: string;
    _type: string;
  };
  publishedAt: string;
  _type: string;
}
