import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GetStaticProps } from "next";
import { Post } from "../typings";
import Feed from "../components/Feed";
import { getAllPosts, getClient } from "../sanity/lib/client";

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>Wannabe Developer</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont bg-bgColor flex flex-col min-h-screen">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        {/* <Banner /> */}
        {/* ============ Banner End here ============== */}

        {/* <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div> */}
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Feed Start here ============ */}
        <div className="grow">
          <Feed posts={posts} />
        </div>
        {/* ============ Feed End here ============== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = getClient();

  const posts: Post[] = await getAllPosts(client);

  return {
    props: {
      posts,
    },
  };
};
