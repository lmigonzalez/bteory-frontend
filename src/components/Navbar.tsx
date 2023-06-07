import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineLogin, AiFillFlag } from "react-icons/ai";
import { useRouter } from "next/router";
import { UserButton } from "@clerk/nextjs";
import { globalState } from "~/Store";
import TestExplanation from "./TestExplanation";
const Navbar = () => {
  const {
    query: { testid, questionid },
    push,
    asPath,
  } = useRouter();
  const [isTimer, setIsTimer] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);

  const { flags, touchFlag, questions, test } = globalState();

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
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
              <li>
                <Link href={"/"}>
                  <AiOutlineLogin />
                </Link>
              </li>
            </ul>
          </div>
        )}

        {asPath === "/result" ||
          (asPath === "/final-result" && (
            <div className="flex h-full w-[1200px] max-w-full items-center justify-between px-4 text-xl">
              <Link href={"/home"}>B-Teori</Link>
              <ul className="flex items-center justify-between gap-6">
                <li>
                  <Link href={"/home"}>Home</Link>{" "}
                </li>
                <li>
                  <UserButton afterSignOutUrl="/" />
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

        {asPath ===
          `/test/${testid as string}/question/${questionid as string}` && (
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
            <div className="flex gap-6">
              {/* <button>See answer</button> this here, really? */}
              <button onClick={() => setShowExplanation(true)}>
                Explanation
              </button>
              <Link href={`/test/${testid as string}/result`}>Results</Link>
            </div>
          </div>
        )}
      </nav>
      {showExplanation && (
        <TestExplanation
          explanation={
            questions.find((item) => item._id === (questionid as string))
              ?.explanation ?? [{ type: "", image: "", explanation: "" }]
          }
          close={() => setShowExplanation(false)}
        />
      )}
    </>
  );
};

export default Navbar;
