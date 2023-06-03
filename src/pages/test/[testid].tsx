import { AxiosHeaders } from "axios";
import React, { type FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type QuestionType, type TestType, getTest } from "~/axios";
import Layout from "~/components/Layout";
import Question from "~/components/Question";
import { globalState } from "~/Store";

const Test: FC = () => {
  const router = useRouter();
  const { testid } = router.query;

  const { questions, getQuestions } = globalState();

  const [test, setTest] = useState<TestType>();
  const [actQuestionIndex, setActQuestionIndex] = useState<number>(0);
  const [actQuestion, setActQuestion] = useState<QuestionType>();
  const [selectedOption, setSelectedOption] = useState<
    Record<string, Set<number>>
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
    console.log(questions.filter((act) => act._id === questionid));
    console.log(actQuestionIndex);
  }, [actQuestionIndex, questions, test?.questionsId]);

  function selectOption(select: number): void {
    setSelectedOption((state) => {
      if (actQuestion) {
        const set = state[actQuestion._id] ?? new Set<number>();
        state[actQuestion._id] = set.delete(select) ? set : set.add(select);
      }
      return state;
    });
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-4">
        {actQuestion && (
          <Question
            question={actQuestion}
            select={selectOption}
            selected={selectedOption[actQuestion._id] || new Set<number>()}
          />
        )}
        <div className="flex items-center justify-center gap-6">
          <button
            className="bg-my_black px-4 py-1 text-white"
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
            prev
          </button>
          <p>1 - 75</p>
          <button
            className="bg-my_black px-4 py-1 text-white"
            onClick={() =>
              setActQuestionIndex((act) =>
                test?.questionsId ? (act > 0 ? act - 1 : act) : act
              )
            }
          >
            next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Test;
