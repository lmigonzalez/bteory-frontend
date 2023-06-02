import { AxiosHeaders } from "axios";
import React, { type FC, useEffect, useState } from "react";
import { type QuestionType, Test, getTest } from "~/axios";
import Layout from "~/components/Layout";
import Question from "~/components/Question";

const Test: FC<{ id: string }> = (props) => {
  const [test, setTest] = useState<Test>();
  const [actQuestion, setActQuestion] = useState<QuestionType | undefined>(
    test?.questions[0]
  );
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
  });

  function selectOption(select: number) {
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
              onClick={() => {
                const index =
                  test?.questions
                    .map((act) => act.id)
                    .indexOf(actQuestion?.id || "") || 0;
                setActQuestion(test?.questions[index + 1]);
              }}
            >
              prev
            </button>
            <p>1 - 75</p>
            <button
              className="bg-my_black px-4 py-1 text-white"
              onClick={() => {
                const index =
                  test?.questions
                    .map((act) => act.id)
                    .indexOf(actQuestion?.id || "") || 0;
                setActQuestion(test?.questions[index - 1]);
              }}
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
