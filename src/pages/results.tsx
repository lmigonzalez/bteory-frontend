import React from "react";
import Layout from "~/components/Layout";
import { AiFillFlag } from "react-icons/ai";
const Results = () => {
  const numbersArray = Array.from({ length: 76 }, (_, index) => index);
  return (
    <Layout>
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
        <button className="rounded bg-my_green px-6 py-2 text-white">
          Final Result
        </button>
      </div>
      <div className="mt-8 grid grid-cols-10 gap-5">
        {numbersArray.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                item % 3 === 0 ? "bg-my_grey" : "bg-my_black"
              } relative flex h-[70px] w-[70px] items-center justify-center rounded text-center text-white`}
            >
              {item}
              {item % 6 === 0 && (
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
