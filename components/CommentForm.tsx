import { useSession } from "next-auth/react";
import React, { useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm, SubmitHandler } from "react-hook-form";
import { Post } from "../typings";
import Image from "next/image";

type Inputs = {
  comment: string;
};

type Props = {
  post: Post;
};

const CommentForm = ({ post }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { data: session } = useSession();
  const [isCommentSuccess, setIsCommentSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const content = {
      name: session?.user!.name,
      email: session?.user!.email,
      image: session?.user!.image,
      comment: data.comment,
      _id: post._id,
    };
    try {
      const res = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(content),
      });

      const json = await res.json();

      if (json) {
        setIsCommentSuccess(true);
        setTimeout(() => {
          setIsCommentSuccess(false);
        }, 6000);
        reset();
      }
    } catch (error) {
      setIsCommentSuccess(false);
    }
  };

  return (
    <div className=" ">
      <form className="">
        <div className="flex items-start gap-2 ">
          <Image
            width={300}
            height={300}
            className="w-8  h-8 rounded-full object-cover "
            src={session ? session?.user!.image! : ""}
            alt=""
          />

          <div className="grow ">
            <TextareaAutosize
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  console.log("yoyo");

                  handleSubmit(onSubmit)();
                }
              }}
              rows={1}
              {...register("comment", { required: true })}
              placeholder={`Message `}
              className="rounded-xl p-2  bg-gray-50 w-full border-0 text-sm resize-none  text-gray-900 placeholder:text-gray-400 focus:outline-none sm:py-1.5 sm:text-sm sm:leading-6"
            />

            {/* errors will return when field validation fails  */}
            {errors.comment && (
              <span className="text-red-500 py-2 animate-bounce">
                This field is required!
              </span>
            )}
            {isCommentSuccess && (
              <span className="text-green-500 py-2 animate-pulse">
                Comment sent for validation.
              </span>
            )}
          </div>
        </div>

        {/* <input type="submit" /> */}
      </form>
    </div>
  );
};

export default CommentForm;
