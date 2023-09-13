import Header from "../../components/Header";
import { GetStaticProps } from "next";
import { Post } from "../../typings";
import Image from "next/image";
import { urlFor } from "../../sanity";
import { PortableText } from "@portabletext/react";
import { PortableTextComponent } from "../../components/PortableTextComponent";
import CommentForm from "../../components/CommentForm";
import Footer from "../../components/Footer";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  getAllPostsSlugs,
  getClient,
  getPostBySlug,
} from "../../sanity/lib/client";

type Props = {
  post: Post;
};

interface Query {
  [key: string]: string;
}

export const revalidate = 10;

const Page = ({ post }: Props) => {
  const { data: session } = useSession();
  // console.log(post);
  return (
    <div className="bg-bgColor">
      <Header />
      <div className=" pb-20 max-w-5xl mx-auto">
        {/* title && sub-title*/}
        <h1 className="flex flex-col font-tileFont font-medium text-3xl md:text-5xl text-white  py-5 px-2 ">
          {post.title}
          <span className="text-sm py-1 md:text-xl md:py-2">
            {post.subtitle}
          </span>
        </h1>
        {/* author */}
        <div className="flex items-center justify-start gap-2 pb-5">
          <Image
            width={300}
            height={300}
            className="w-10  h-10 rounded-full object-cover "
            src={urlFor(post.author.image).url()}
            alt=""
          />
          <p className="flex flex-col text-gray-200">
            <span className="font-bold customText ">{post.author.name}</span>{" "}
            <span className="text-xs text-stone-400">
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* mainImage */}
        <div className=" z-0">
          <Image
            width={300}
            height={300}
            className="w-full h-96 object-cover "
            src={urlFor(post.mainImage).url()}
            alt=""
          />
        </div>
        {/* article */}
        <div className="max-w-3xl mx-auto -translate-y-10 ">
          <article className="w-full mx-auto p-5 bg-bgColor rounded-t-2xl">
            <h2 className="font-bodyFont text-xs md:text-sm text-gray-300 py-2 border-t border-gray-500">
              {post.description}
            </h2>
            <div className="mt-10 text-gray-300">
              <PortableText
                value={post.body}
                components={PortableTextComponent}
              />
            </div>
          </article>
        </div>

        {/* Comment section */}
        <hr className="max-w-lg mx-5 md:mx-auto border-t border-primaryColor my-5" />
        <div className="max-w-3xl mx-auto">
          <div className="mx-2 text-gray-300 ">
            {post.comments.length > 0 ? (
              <p className="font-titleFont text-2xl font-semibold ">
                {post.comments.length === 1
                  ? `1 Comment`
                  : `${post.comments.length} Comments`}{" "}
              </p>
            ) : (
              <p className="font-titleFont text-2xl font-semibold">
                Leave a comment below!
              </p>
            )}
          </div>
          {session ? (
            <div className="mx-2 py-5">
              <CommentForm post={post} />
            </div>
          ) : (
            <div className="mx-2 py-5">
              <p className="text-gray-200">
                <button
                  onClick={() => signIn()}
                  className="text-xl cursor-pointer customText underline underline-offset-2 decoration-primaryColor tracking-wider "
                >
                  Sign In
                </button>{" "}
                to Leave a comment
              </p>
            </div>
          )}

          <div className="flex flex-col gap-5  mx-5">
            {post.comments.map((comment, idx) => (
              <div key={comment._id} className="flex items-start gap-3">
                <Image
                  width={300}
                  height={300}
                  className="w-6  h-6 rounded-full object-cover "
                  src={comment.image}
                  alt=""
                />
                <div className="flex flex-col gap-1  ">
                  <p className="text-sm text-white">{comment.name}</p>
                  <p className="text-base text-gray-300">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs();

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx;
  const client = getClient();

  const post: Post = await getPostBySlug(client, params.slug);

  // console.log("staticpost", post);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
