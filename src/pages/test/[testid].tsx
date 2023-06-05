import { AxiosHeaders } from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { globalState } from "~/Store";
import TestExplanation from "~/components/TestExplanation";

const Test = () => {
  const {
    query: { testid },
  } = useRouter();

  const { test, setTest, questions, setQuestions } = globalState();

  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    void setQuestions();
    void setTest(testid as string, new AxiosHeaders());
  }, []);
  console.log(test);
  return (
    <>
      {showExplanation && (
        <TestExplanation
          explanation={test.explanation}
          close={() => setShowExplanation(false)}
        />
      )}
      <div>
        <button onClick={() => setShowExplanation(true)}>Explanation</button>
        <br />
        {test.questionsId.map((item, index) => {
          const question = questions.find((q) => item === q._id);
          return (
            <>
              <Link
                key={index}
                href={`${test._id}/question/${question?._id ?? ""}`}
              >
                {question?.question}
              </Link>
              <br />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Test;
