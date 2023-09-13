import { AiOutlineCopyrightCircle, AiOutlineSelect } from "react-icons/ai";

import { LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="w-full pb-5 pt-10  bg-bgColor  px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-4 justify-center items-center md:justify-between">
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/nikhilkrofficial/"
            target="_blank noreferrer"
          >
            <LuLinkedin className="w-6 h-6 text-white/50 hover:text-blue-500 duration-300 cursor-pointer" />
          </a>
          <a href="https://github.com/NiKHiLkr23" target="_blank noreferrer">
            <LuGithub className="w-6 h-6 text-white/50  hover:text-white duration-300 cursor-pointer" />
          </a>
          <a href="https://twitter.com/Nikhil_kr_23" target="_blank noreferrer">
            <LuTwitter className="w-6 h-6 text-white/50 hover:text-blue-500 duration-300 cursor-pointer" />
          </a>
          <a href="" target="_blank noreferrer">
            <AiOutlineSelect className="w-6 h-6 text-white/50 hover:text-green-500 duration-300 cursor-pointer" />
          </a>
        </div>
        <div className="flex items-center gap-3">
          <p className="flex items-center text-sm font-titleFont text-gray-200 gap-1">
            <AiOutlineCopyrightCircle className="" />
            Nikhil Kumar || All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
