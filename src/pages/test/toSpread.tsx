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
  const [actQuestion, setActQuestion] = useState<QuestionType>();

  const [actQuestionIndex, setActQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<
    Record<string, FormDataEntryValue>
  >({});

  useEffect(() => {
    void getQuestions();
    void getTest(testid as string, new AxiosHeaders())
      .then((res) => {
        setTest(res);
      })
      .catch(Error);
  }, []);

  useEffect(() => {
    console.log(selectedOption);
  }, [actQuestionIndex]);

  useEffect(() => {
    const questionid = test?.questionsId[actQuestionIndex];
    if (questionid)
      setActQuestion(questions.find((act) => act._id === questionid));
  }, [actQuestionIndex, test]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.forEach((item, key) => console.log(key, item));

    setSelectedOption((prev) => {
      formData.forEach((item, key) => {
        prev[key] = item;
      });
      return prev;
    });
  }

  return (
    <Layout>
      <form id="form" onSubmit={(event) => handleSubmit(event)}>
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
                const isMarked =
                  selectedOption[
                    `${actQuestion._id}${actQuestionIndex}-${index}`
                  ];
                // console.log(isMarked);
                return (
                  <li key={index} className="flex items-center justify-between">
                    <input
                      type="checkbox"
                      id={`${actQuestion._id}${actQuestionIndex}-${index}`}
                      name={`${actQuestion._id}${actQuestionIndex}-${index}`}
                      key={`${actQuestion._id}${actQuestionIndex}-${index}`}
                      className="h-6 w-6 self-start rounded-full border-[1px] border-my_black"
                      defaultChecked={isMarked === "on"}
                    />
                    <label
                      htmlFor={`${actQuestion._id}${actQuestionIndex}-${index}`}
                    >
                      {item}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button
              className="bg-my_black px-4 py-1 text-white"
              onClick={() =>
                setActQuestionIndex((act) =>
                  test?.questionsId ? (act > 0 ? act - 1 : act) : act
                )
              }
            >
              prev
            </button>
            <p>
              {actQuestionIndex + 1} -{" "}
              {test?.questionsId.length
                ? test?.questionsId.length + 1
                : undefined ?? "loading"}
            </p>
            <button
              className="bg-my_black px-4 py-1 text-white"
              onClick={() => {
                setActQuestionIndex((act) =>
                  test?.questionsId
                    ? act < test.questionsId.length
                      ? act + 1
                      : act
                    : act
                );
              }}
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
