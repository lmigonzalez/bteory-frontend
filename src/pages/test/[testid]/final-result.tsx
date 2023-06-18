import React, { useState } from "react";
import Layout from "~/components/Layout";
import { AiFillExclamationCircle } from "react-icons/ai";
import { globalState } from "~/Store";

const FinalResult = () => {
  const { evaluation, test } = globalState();
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Layout name="Test Evaluation">
      <h1 className="mb-4 text-center text-2xl md:text-5xl">Final Result</h1>
      <div className="relative my-4 flex justify-end gap-4 md:my-8">
        <div className="flex h-10 w-fit items-center justify-center rounded bg-my_black px-6 py-1 text-white">
          {evaluation.reduce(
            (prev, curr) => prev + (curr.isCorrect ? 1 : 0),
            0
          )}{" "}
          {"-"}
          {test.questionsId.length}
        </div>
        <div
          className="relative flex h-10 w-fit cursor-pointer items-center justify-center rounded bg-my_black px-6 py-1 text-white"
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          {evaluation.reduce(
            (prev, curr) => prev + (curr.isCorrect ? 1 : 0),
            0
          )}{" "}
          {"-"}
          {test.questionsId.length}
          <AiFillExclamationCircle className="absolute right-0 top-0" />
        </div>
        {isHovered && (
          <div className="absolute -top-16 z-30 w-52 rounded border-[1px] border-my_grey bg-white px-4 text-center">
            <p>You need a minimum of 85% to pass the exam</p>
          </div>
        )}
      </div>
      <div className="min-h-10 flex flex-col items-center justify-between border-b-2 border-my_black pb-3">
        <div className="flex w-full justify-between gap-4 md:gap-8">
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-4 rounded-sm bg-my_grey md:w-8"></div>
            <p>Unanswered</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-4 rounded-sm bg-my_green md:w-8"></div>
            <p>Correct</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-4 rounded-sm bg-my_red md:w-8"></div>
            <p>Incorrect</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-5 place-items-center gap-5 md:grid-cols-10">
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
                !result?.userAnswer
                  ? "bg-my_grey"
                  : result.isCorrect
                  ? "bg-my_green"
                  : "bg-my_red"
              } relative flex h-[50px] w-[50px] items-center justify-center rounded text-center text-white md:h-[70px] md:w-[70px]`}
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
