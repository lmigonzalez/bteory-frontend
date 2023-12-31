import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { globalState } from "~/Store";
import Image from "next/image";
import { type QuestionType } from "~/axios";
import Layout from "~/components/Layout";
import { useUser } from "@clerk/nextjs";

const Question = () => {
  const {
    query: { questionid, testid },
    push,
  } = useRouter();

  const { user } = useUser();

  const { test, setTest, solutions, questions, setQuestions, touchSolution } =
    globalState();

  const [question, setQuestion] = useState<QuestionType>();
  const [questionIndex, setQuestionIndex] = useState<number>(
    test.questionsId.indexOf(questionid as string)
  );

  useEffect(() => {
    async function set(testid: string) {
      await setTest(testid, user?.id ?? "");
    }
    void set(testid as string);
    void setQuestions();
  }, []);

  useEffect(() => {
    setQuestion(questions.find((q) => questionid === q._id));
    setQuestionIndex(test.questionsId.indexOf(questionid as string));
  }, [questionid, questions, test.questionsId, testid]);

  return (
    <Layout name="Question">
      <div className="flex flex-col items-center justify-center ">
        <Image
          src={question?.questionImg ?? ""}
          alt="image"
          width={500}
          height={500}
          className="mt-8 h-auto w-[300px]"
        />
        <p className="mt-8 text-lg font-bold text-center">{question?.question}</p>
        <ul className="m-auto my-8  w-[700px] max-w-full space-y-4  ">
          {question?.options.map((item, index) => {
            return (
              <li
                key={`${question._id}-${index}`}
                className="flex items-center gap-4 "
              >
                <input
                  type="checkbox"
                  id={`${question._id}-${index}`}
                  className="select-question-checkbox h-6 w-6 flex-shrink-0 cursor-pointer self-start rounded-full border-[1px] border-my_black"
                  checked={solutions.has(`${question._id}-${item}`)}
                  onClick={() => touchSolution(`${question._id}-${item}`)}
                />
                <label
                  htmlFor={`${question._id}-${index}`}
                  className="cursor-pointer"
                >
                  {item}
                </label>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-center gap-6">
          <button
            className="bg-my_black px-4 py-1 text-white"
            onClick={() =>
              void push({
                pathname: "/test/[testid]/question/[questionid]",
                query: {
                  testid: testid,
                  questionid:
                    test.questionsId[
                      questionIndex - 1 >= 0 ? questionIndex - 1 : questionIndex
                    ],
                },
              })
            }
          >
            prev
          </button>
          <p>
            {questionIndex + 1} - {test.questionsId.length}
          </p>
          <button
            className="bg-my_black px-4 py-1 text-white"
            onClick={() => {
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
            }}
          >
            next
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default Question;
