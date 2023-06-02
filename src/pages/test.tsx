import { AxiosHeaders } from "axios";
import React, { type FC, useEffect, useState } from "react";
import { type QuestionType, Test, getTest } from "~/axios";
import Layout from "~/components/Layout";
import Question from "~/components/Question";

const Test: FC<{ id: string | undefined }> = (props) => {
  const [test, setTest] = useState<Test>({
    id: "0",
    questions: [
      {
        id: "",
        question: "",
        questionImg: "",
        options: [],
        answer: "",
        explanation: [],
        category: "",
        complexity: "",
      },
    ],
  });
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
            <button className="bg-my_black px-4 py-1 text-white">prev</button>
            <p>1 - 75</p>
            <button className="bg-my_black px-4 py-1 text-white">next</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Test;
