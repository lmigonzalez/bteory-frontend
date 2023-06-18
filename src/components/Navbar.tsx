import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineLogin, AiFillFlag, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import { UserButton } from "@clerk/nextjs";
import { globalState } from "~/Store";
import TestExplanation from "./TestExplanation";
import { checkIfAdmin } from "../axios";
const Navbar = () => {
  const {
    query: { testid, questionid },
    push,
    asPath,
  } = useRouter();
  const [isTimer, setIsTimer] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [urlInArray, setUrlInArray] = useState(false);
  const { flags, touchFlag, questions, test } = globalState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      isTimer &&
      asPath === `/test/${testid as string}/question/${questionid as string}`
    ) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
        const questionIndex = test.questionsId.findIndex(
          (q_id) => q_id == (questionid as string)
        );

        console.log(questionIndex);
        if (questionIndex === test.questionsId.length - 1) {
          void push({
            pathname: "/test/[testid]/result",
            query: {
              testid: testid,
            },
          });
        }
        void push({
          pathname: "/test/[testid]/question/[questionid]",
          query: {
            testid: testid,
            questionid:
              test.questionsId[
                questionIndex + 1 < test.questionsId.length
                  ? questionIndex + 1
                  : questionIndex
              ],
          },
        });
        clearInterval(timer);
        setCountdown(30);
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [countdown]);

  useEffect(() => {
    setCountdown(30);
  }, [isTimer]);

  useEffect(() => {
    checkIdUserIsAdmin();
    setUrlInArray(arrayContainsSubstring);
    protectRouters();
  }, []);

  async function checkIdUserIsAdmin() {
    try {
      const res = await checkIfAdmin();
      setIsAdmin(res);
    } catch (err) {
      console.log(err);
    }
  }

  const adminUrls = [
    "dashboard",
    "questions",
    "admin-question",
    "create-test",
    "admin-test",
  ];

  function arrayContainsSubstring() {
    return adminUrls.some((item) => item === asPath.split("/")[1]?.trim());
  }

  async function protectRouters() {
    const test = await checkIfAdmin();
    if (arrayContainsSubstring() && !test) {
      console.log("here!!!!!!!!");
      push("/home");
    }
  }

  return (
    <>
      <nav className="absolute left-0 top-0 flex h-14 w-full justify-center bg-my_black text-white">
        {asPath === "/home" && (
          <div className="flex h-full w-[1200px] max-w-full items-center justify-between px-4 text-xl">
            {" "}
            <Link href={"/home"}>B-Teori</Link>
            <ul className="flex items-center justify-between gap-6">
              <li>
                <Link href={"/home"}>Home</Link>{" "}
              </li>
              {isAdmin && (
                <li>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>
              )}
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            </ul>
          </div>
        )}

        {(asPath === `/test/${testid as string}/result` ||
          asPath === `/test/${testid as string}/final-result`) && (
          <div className="flex h-full w-[1200px] max-w-full items-center justify-between px-4 text-xl">
            <Link href={"/home"}>B-Teori</Link>
            <ul className="flex items-center justify-between gap-6">
              <li>
                <Link href={"/home"}>Home</Link>{" "}
              </li>
              {/* <li>
                <Link href={"/"}>Retake</Link>
              </li> */}
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            </ul>
          </div>
        )}

        {asPath ===
          `/test/${testid as string}/question/${questionid as string}` && (
          <div className="relative flex h-full w-[1200px] max-w-full items-center justify-between px-4 text-xl">
            <div className="gap:0 flex items-center justify-center md:gap-6">
              <div className="form-control w-20 md:w-32 ">
                <label className="label cursor-pointer">
                  <span className="label-text hidden text-lg text-white md:block">
                    Timer
                  </span>
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
                      <span
                        style={{ "--value": countdown } as React.CSSProperties}
                      ></span>
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button onClick={() => touchFlag(questionid as string)}>
                <AiFillFlag
                  size={30}
                  fill={flags.has(questionid as string) ? "#EA5455" : "#fff"}
                />
              </button>
            </div>
            <div className="flex md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <AiOutlineMenu />
              </button>
            </div>
            <div className="hidden gap-6 md:flex">
              {/* <button>See answer</button> this here, really? */}
              <button onClick={() => setShowExplanation(true)}>
                Explanation
              </button>
              <Link href={`/test/${testid as string}/result`}>Results</Link>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-full w-1/2 bg-my_black">
                <div className="flex flex-col items-center justify-center gap-4 p-4 md:hidden">
                  {/* <button>See answer</button> this here, really? */}
                  <button onClick={() => setShowExplanation(true)}>
                    Explanation
                  </button>
                  <Link href={`/test/${testid as string}/result`}>Results</Link>
                </div>
              </div>
            )}
          </div>
        )}
        {/* /* for admin */}
        {arrayContainsSubstring() && (
          <div className="flex h-full w-[1200px] max-w-full items-center justify-between px-4 text-xl">
            <Link href={"/home"}>B-Teori</Link>

            <ul className="flex items-center justify-between gap-6">
              <li>
                <Link href={"/home"}>Home</Link>{" "}
              </li>
              <li>
                <Link href={"/dashboard"}>Dashboard</Link>{" "}
              </li>
              <li>
                <Link href={"/questions"}>Questions</Link>{" "}
              </li>
              <li>
                <Link href={"/create-test"}>New Test</Link>{" "}
              </li>
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            </ul>
          </div>
        )}
      </nav>
      {showExplanation && (
        <TestExplanation
          explanation={
            questions.find((item) => item._id === (questionid as string))
              ?.explanation ?? [
              {
                explanation: "No Explanation",
                type: "text",
              },
            ]
          }
          close={() => setShowExplanation(false)}
        />
      )}
    </>
  );
};

export default Navbar;
