import { AxiosHeaders } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { globalState } from "~/Store";
import Image from "next/image";
import { type QuestionType } from "~/axios";
import Layout from "~/components/Layout";

const Question = () => {
  const {
    query: { questionid, testid },
    push,
  } = useRouter();

  const { test, setTest, solutions, questions, setQuestions, touchSolution } =
    globalState();

  const [question, setQuestion] = useState<QuestionType>();
  const [questionIndex, setQuestionIndex] = useState<number>(
    test.questionsId.indexOf(questionid as string)
  );

  useEffect(() => {
    async function set(testid: string) {
      await setTest(testid, new AxiosHeaders());
    }
    void set(testid as string);
    void setQuestions();
  }, []);

  useEffect(() => {
    setQuestion(questions.find((q) => questionid === q._id));
    setQuestionIndex(test.questionsId.indexOf(questionid as string));
    console.log(solutions);
  }, [questionid, questions, solutions, test.questionsId, testid]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center ">
        <Image
          src={question?.questionImg ?? ""}
          alt="image"
          width={500}
          height={500}
          className="h-auto w-[300px]"
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
                  className="h-6 w-6  self-start rounded-full border-[1px] border-my_black"
                  defaultChecked={solutions.has(`${question._id}-${index}`)}
                  onClick={() => touchSolution(`${question._id}-${index}`)}
                />
                <label htmlFor={`${index}`}>{item}</label>
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
