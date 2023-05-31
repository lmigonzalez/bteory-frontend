import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineLogin, AiFillFlag } from "react-icons/ai";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const [isTimer, setIsTimer] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    if (router.asPath !== "/test") return;
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    setCountdown(30);
  }, [isTimer]);

  console.log(router.asPath);

  return (
    <nav className="absolute left-0 top-0 flex h-14 w-full justify-center bg-my_black text-white">
      {router.asPath === "/home" && (
        <div className="flex h-full w-[1200px] max-w-full items-center justify-between px-4 text-xl">
          {" "}
          <Link href={"/home"}>B-Teori</Link>
          <ul className="flex items-center justify-between gap-6">
            <li>
              <Link href={"/home"}>Home</Link>{" "}
            </li>
            <li>
              <Link href={"/account"}>Account</Link>
            </li>
            <li>
              <Link href={"/"}>
                <AiOutlineLogin />
              </Link>
            </li>
          </ul>
        </div>
      )}

      {router.asPath === "/results" ||
        (router.asPath === "/final-result" && (
          <div className="flex h-full w-[1200px] max-w-full items-center justify-between px-4 text-xl">
            <Link href={"/home"}>B-Teori</Link>
            <ul className="flex items-center justify-between gap-6">
              <li>
                <Link href={"/home"}>Home</Link>{" "}
              </li>
              <li>
                <Link href={"/account"}>Account</Link>
              </li>
              <li>
                <Link href={"/"}>Retake</Link>
              </li>
              <li>
                <Link href={"/"}>
                  <AiOutlineLogin />
                </Link>
              </li>
            </ul>
          </div>
        ))}

      {router.asPath === "/test" && (
        <div className="flex h-full w-[1200px] max-w-full items-center justify-between px-4 text-xl">
          <div className="flex items-center justify-center gap-12">
            <div className="form-control w-32 ">
              <label className="label cursor-pointer">
                <span className="label-text text-lg text-white">Timer</span>
                <input
                  type="checkbox"
                  className="toggle-accent toggle"
                  checked={isTimer}
                  onChange={() => setIsTimer(!isTimer)}
                />
              </label>
            </div>
            <div className="w-32">
              {isTimer && (
                <div className="w-fit rounded-sm bg-my_green px-4">
                  <span className="countdown">
                    <span style={{ "--value": countdown }}></span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <button onClick={() => setIsFlagged(!isFlagged)}>
              <AiFillFlag size={30} fill={isFlagged ? "#EA5455" : "#fff"} />
            </button>
          </div>
          <div className="flex gap-6">
            <button>See answer</button>
            <button>Explanation</button>
            <Link href="/results">Results</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
