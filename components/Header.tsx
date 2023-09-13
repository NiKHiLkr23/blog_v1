import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
const Header = () => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const minScrollToHide = 100; // Adjust this value as needed

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - prevScrollY;

    if (scrollDelta > 0 && currentScrollY > minScrollToHide) {
      setScrollingUp(true);
    } else if (scrollDelta < 0) {
      setScrollingUp(false);
    }

    setPrevScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <div
      className={`w-full py-2  shadow-md font-titleFont sticky top-0 bg-bgColor z-50 px-4 transition-transform duration-300 ease-in-out transform ${
        scrollingUp ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-5xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            {/* <Image
              width={100}
              height={100}
              className="w-40"
              src={logoDark}
              alt="logoDark"
            /> */}
            <span className="text-xl md:text-3xl text-stone-300 font-bold">
              {"<"}Wannabe Dev{"/>"}
            </span>
          </div>
        </Link>

        {session ? (
          <div className="flex items-center gap-8 text-lg">
            <div className="flex items-center gap-1 relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-full focus:outline-none "
              >
                <Image
                  width={80}
                  height={80}
                  className="w-8 h-8 rounded-full"
                  src={session ? session?.user!.image! : ""}
                  alt="logo"
                />
              </button>
              <p className="text-sm font-medium hidden md:block text-gray-100">
                {session?.user!.name}
              </p>
              {showMenu && (
                <div className="absolute md:hidden bg-bgColor/60 top-10 right-2 flex items-center justify-center w-28 p-1 rounded-lg shadow-md ">
                  <button
                    onClick={() => signOut()}
                    className=" uppercase text-sm shadow-md bg-gradient-to-r from-blue-500 to-green-500 focus:outline-none px-4 py-1 font-semibold text-white hover:text-gray-200 hover:to-green-600 hover:from-blue-600 rounded-md hover:bg-secondaryColor transition-all duration-300 "
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => signOut()}
              className="hidden md:block  focus:outline-none  font-semibold text-white hover:text-gray-200  "
            >
              <FiLogOut />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-8 text-lg">
            <button
              onClick={() => signIn()}
              className="uppercase text-sm shadow-md bg-gradient-to-r from-blue-500 to-green-500 focus:outline-none px-4 py-1 font-semibold text-white hover:text-gray-200 hover:to-green-600 hover:from-blue-600 rounded-md hover:bg-secondaryColor transition-all duration-300 "
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
