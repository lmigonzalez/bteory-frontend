import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { AiFillFlag } from "react-icons/ai";
import { globalState } from "~/Store";
import { AxiosHeaders } from "axios";

const Results = () => {
  const {
    query: { testid },
    push,
  } = useRouter();

  const { test, setTest, solutions, flags } = globalState();

  const [solved, setSolved] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    void setTest(testid as string, new AxiosHeaders());
  }, []);

  useEffect(() => {
    setSolved((prev) => {
      solutions.forEach((item) => prev.add(item.split("-")[0] ?? ""));
      return prev;
    });
  }, [solutions]);

  return (
    <Layout>
      <h1 className="mb-8 text-center text-5xl">Result</h1>
      <div className="flex h-10 items-center justify-between border-b-2 border-my_black pb-3">
        <div className="flex gap-8">
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-8 rounded-sm bg-my_grey"></div>
            <p>Unanswered</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-8 rounded-sm bg-my_black"></div>
            <p>Answered</p>
          </div>
        </div>
        <button
          onClick={() => void push("/final-result")}
          className="rounded bg-my_green px-6 py-2 text-white"
        >
          Final Result
        </button>
      </div>
      <div className="mt-8 grid grid-cols-10 place-items-center gap-5">
        {test.questionsId.map((item, index) => {
          return (
            <div
              onClick={() =>
                void push({
                  pathname: "question/[questionid]",
                  query: { testid: testid, questionid: item },
                })
              }
              key={index}
              className={`${
                solved.has(item) ? "bg-my_black" : "bg-my_grey"
              } relative flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded text-center text-white`}
            >
              {index}
              {flags.has(item) && (
                <AiFillFlag
                  fill="#1B9C85"
                  size={20}
                  className="absolute -right-4 -top-2 rotate-45"
                />
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Results;
