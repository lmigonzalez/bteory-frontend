import { AxiosHeaders } from "axios";
import { useRouter } from "next/router";
import React, { use, useEffect } from "react";
import { globalState } from "~/Store";
import Image from "next/image";

const Question = () => {
  const {
    query: { questionid, testid },
  } = useRouter();

  const {
    test,
    setTest,
    solutions,
    setSolution,
    questions,
    setQuestions,
    removeSolution,
  } = globalState();

  useEffect(() => {
    async function set(testid: string) {
      await setTest(testid, new AxiosHeaders());
    }
    void set(testid as string);
    void setQuestions();
  }, []);

  const question = questions.find((q) => questionid === q._id);

  return (
    <div className="flex flex-col items-center justify-center ">
      <Image
        src={question?.questionImg || ""}
        alt=""
        width={500}
        height={500}
        className="w-[300px]"
      />
      <p>{question?.question}</p>
      <ul className="m-auto mt-8  w-[700px] max-w-full space-y-4  ">
        {question?.options.map((item, index) => {
          return (
            <li
              key={`${question._id}-${index}`}
              className="flex items-center justify-between"
            >
              <input
                type="checkbox"
                id={`${question._id}-${index}`}
                className={` ${
                  solutions.has(`${question._id}-${index}`)
                    ? "bg-my_red"
                    : "bg-transparent"
                } h-6 w-6  self-start rounded-full border-[1px] border-my_black`}
                onChange={() => {
                  if (removeSolution(`${question._id}-${index}`)) return;
                  setSolution(`${question._id}-${index}`);
                }}
              />
              <label htmlFor={`${index}`}>{item}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Question;
