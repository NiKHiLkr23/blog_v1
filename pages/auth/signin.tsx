import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="bg-bgColor flex flex-col items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className=" my-1">
          <button
            className="shadow-md py-3 px-8 rounded-lg bg-stone-900 text-gray-300 flex gap-2 items-center"
            onClick={() => signIn(provider.id)}
          >
            {provider.name === "Google" ? <FcGoogle /> : <AiFillGithub />}
            <span>{provider.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
