import { Post } from "../typings";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
dayjs.extend(tz);

type Props = {
  posts: Post[];
};

function Feed({ posts }: Props) {
  const timeZone = dayjs.tz.guess();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 py-6 max-w-7xl mx-5 md:mx-auto place-items-center  ">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug}`}>
          <div className="shadow shadow-primaryColor/50 max-w-xs h-[400px] group rounded-md ">
            <div className="h-3/6 w-full overflow-hidden rounded-t-md">
              <Image
                width={300}
                height={300}
                className="w-full h-full rounded-t-md object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                src={urlFor(post.mainImage).url()}
                alt=""
              />
            </div>
            <div className="h-2/5 w-full flex flex-col  justify-start  ">
              <p className="p-2  text-slate-50 text-2xl md:text-2xl flex flex-col font-semibold">
                {post.title}{" "}
                <span className="text-sm md:text-xs text-slate-200 font-normal">
                  {post.subtitle}
                </span>
              </p>
              <p className="py-1 px-2  text-xs text-stone-400 text-justify">
                {post.description.substring(0, 150)}...
              </p>
              <div className="flex items-center justify-start gap-4 p-2 ">
                <Image
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full object-cover shadow-sm shadow-primaryColor "
                  src={urlFor(post.author.image).url()}
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="font-semibold customText  ">
                    {" "}
                    {post.author.name}
                  </span>
                  <span className="text-xs text-stone-400">
                    {dayjs(post.publishedAt).format("ll")}
                    {/* {dayjs
                    .utc(productDetails?.date)
                    .tz(timeZone)
                    .format("YYYY-MM-DD HH:mm:ss A")} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Feed;
