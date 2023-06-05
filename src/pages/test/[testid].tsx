import { AxiosHeaders } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { globalState } from "~/Store";
import TestExplanation from "~/components/TestExplanation";

const Test = () => {
  const {
    query: { testid },
    push,
  } = useRouter();

  const { test, setTest, questions, setQuestions } = globalState();

  const [showExplanation, setShowExplanation] = useState(true);

  useEffect(() => {
    void setQuestions();
    void setTest(testid as string, new AxiosHeaders());
  }, []);

  useEffect(() => {
    if (!showExplanation && test._id != "")
      void push({
        pathname: "/test/[testid]/question/[questionid]",
        query: {
          testid: testid,
          questionid: test.questionsId[0],
        },
      });
    else setShowExplanation(true);
  }, [showExplanation]);

  console.log(test);
  return (
    <>
      <TestExplanation
        explanation={test.explanation}
        close={() => setShowExplanation(false)}
      />
      {test._id != "" && <AiOutlineLoading size={30}></AiOutlineLoading>}
    </>
  );
};

export default Test;
