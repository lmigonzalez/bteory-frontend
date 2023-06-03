import { AxiosHeaders } from "axios";
import React, { type FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type QuestionType, type TestType, getTest } from "~/axios";
import Layout from "~/components/Layout";
import { globalState } from "~/Store";
import Image from "next/image";

const Test: FC = () => {
  const router = useRouter();
  const { testid } = router.query;

  const { questions, getQuestions } = globalState();

  const [test, setTest] = useState<TestType>();
  const [actQuestionIndex, setActQuestionIndex] = useState<number>(0);
  const [actQuestion, setActQuestion] = useState<QuestionType>();
  const [selectedOption, setSelectedOption] = useState<
    Record<string, FormData>
  >({});

  useEffect(() => {
    void getTest(testid as string, new AxiosHeaders())
      .then((res) => {
        setTest(res);
        console.log(test);
      })
      .catch(Error);
    void getQuestions();
  }, []);

  useEffect(() => {
    const questionid = test?.questionsId[actQuestionIndex];
    if (questionid)
      setActQuestion(questions.find((act) => act._id === questionid));
  }, [actQuestionIndex, questions, test?.questionsId]);

  return (
    <Layout>
      <form
        action={(form) =>
          setSelectedOption((prev) => {
            if (actQuestion?._id) prev[actQuestion?._id] = form;
            return prev;
          })
        }
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center ">
            <Image
              src={actQuestion?.questionImg || ""}
              alt=""
              width={500}
              height={500}
              className="w-[300px]"
            />
            <p>{actQuestion?.question}</p>

            <ul className="m-auto mt-8  w-[700px] max-w-full space-y-4  ">
              {actQuestion?.options.map((item, index) => {
                const isMarked = selectedOption[actQuestion._id]
                  ?.get(`${index}`)
                  ?.valueOf() as boolean;
                return (
                  <li key={index} className="flex items-center justify-between">
                    <input
                      type="checkbox"
                      id={`${index}`}
                      className="h-6 w-6 self-start rounded-full border-[1px] border-my_black"
                      checked={isMarked}
                    />
                    <label htmlFor={`${index}`}>{item}</label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button
              className="bg-my_black px-4 py-1 text-white"
              type="submit"
              onClick={() =>
                setActQuestionIndex((act) =>
                  test?.questionsId ? (act > 0 ? act - 1 : act) : act
                )
              }
            >
              prev
            </button>
            <p>1 - 75</p>
            <button
              className="bg-my_black px-4 py-1 text-white"
              type="submit"
              onClick={() =>
                setActQuestionIndex((act) =>
                  test?.questionsId
                    ? act < test.questionsId.length - 1
                      ? act + 1
                      : act
                    : act
                )
              }
            >
              next
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Test;
