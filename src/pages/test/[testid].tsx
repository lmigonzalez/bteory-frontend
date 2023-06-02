import { AxiosHeaders } from "axios";
import React, { type FC, useEffect, useState } from "react";
import {
  type QuestionType,
  type TestType,
  getTest,
  getQuestion,
} from "~/axios";
import Layout from "~/components/Layout";
import Question from "~/components/Question";

const Test: FC<{ id: string }> = (props) => {
  const [test, setTest] = useState<TestType>();
  const [actQuestionIndex, setActQuestionIndex] = useState<number>(0);
  const [actQuestion, setActQuestion] = useState<QuestionType>();
  const [selectedOption, setSelectedOption] = useState<
    Record<string, Set<number>>
  >({});

  useEffect(() => {
    if (props.id)
      void getTest(props?.id, new AxiosHeaders())
        .then((res) => {
          setTest(res);
        })
        .catch(Error);
  }, [props.id]);

  useEffect(() => {
    async function Complain() {
      const a = test?.questions[actQuestionIndex];
      if (a) {
        const res = await getQuestion(a, new AxiosHeaders()).then((res) => res);
        setActQuestion(res);
      }
    }
    void Complain();
  }, [actQuestionIndex, test?.questions]);

  function selectOption(select: number): void {
    setSelectedOption((state) => {
      if (actQuestion) {
        const set = state[actQuestion.id] ?? new Set<number>();
        state[actQuestion.id] = set.delete(select) ? set : set.add(select);
      }
      return state;
    });
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center ">
        <div className="mt-auto h-8">
          {actQuestion && (
            <Question
              question={actQuestion}
              select={selectOption}
              selected={selectedOption[actQuestion.id] || new Set<number>()}
            ></Question>
          )}
          <div className="flex items-center justify-center gap-6">
            <button
              className="bg-my_black px-4 py-1 text-white"
              onClick={
                void setActQuestionIndex((act) =>
                  test?.questions
                    ? act < test.questions.length - 1
                      ? act + 1
                      : act
                    : act
                )
              }
            >
              prev
            </button>
            <p>1 - 75</p>
            <button
              className="bg-my_black px-4 py-1 text-white"
              onClick={
                void setActQuestionIndex((act) =>
                  test?.questions ? (act > 0 ? act - 1 : act) : act
                )
              }
            >
              next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Test;
