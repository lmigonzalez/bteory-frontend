import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { AiFillExclamationCircle } from "react-icons/ai";
import { globalState } from "~/Store";

const FinalResult = () => {
  const router = useRouter();

  const { evaluation, test } = globalState();
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Layout>
      <h1 className="mb-8 text-center text-5xl">Final Result</h1>
      <div className="relative my-8 flex justify-end gap-4">
        <div className="flex h-10 w-fit items-center justify-center rounded bg-my_black px-6 py-1 text-white">
          19 / 75
        </div>
        <div
          className="relative flex h-10 w-fit cursor-pointer items-center justify-center rounded bg-my_black px-6 py-1 text-white"
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          19 / 75
          <AiFillExclamationCircle className="absolute right-0 top-0" />
        </div>
        {isHovered && (
          <div className="absolute -top-16 w-52 rounded border-[1px] border-my_grey px-4 text-center">
            <p>You need a minimum of 85% to pass the exam</p>
          </div>
        )}
      </div>
      <div className="flex h-10 flex-col items-center justify-between border-b-2 border-my_black pb-3">
        <div className="flex w-full justify-between gap-8">
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-8 rounded-sm bg-my_grey"></div>
            <p>Unanswered</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-8 rounded-sm bg-my_green"></div>
            <p>Correct</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-8 rounded-sm bg-my_red"></div>
            <p>Incorrect</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-10 place-items-center gap-5">
        {test.questionsId.map((item, index) => {
          const result = evaluation?.find(
            (question) => question.questionId == item
          );
          console.log(evaluation);
          console.log(result);
          return (
            <div
              key={index}
              className={`${
                !result
                  ? "bg-my_grey"
                  : result.isCorrect
                  ? "bg-my_green"
                  : "bg-my_red"
              } relative flex h-[70px] w-[70px] items-center justify-center rounded text-center text-white`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default FinalResult;
