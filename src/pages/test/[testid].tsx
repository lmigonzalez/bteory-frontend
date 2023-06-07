import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { globalState } from "~/Store";
import TestExplanation from "~/components/TestExplanation";
import Layout from "~/components/Layout";
import { useAuth } from "@clerk/nextjs";

const Test = () => {
  const {
    query: { testid },
    push,
  } = useRouter();

  const { getToken } = useAuth();

  const { test, setTest, questions, setQuestions } = globalState();

  const [showExplanation, setShowExplanation] = useState(true);

  useEffect(() => {
    async function set(testid: string) {
      const auth = await getToken();
      void setTest(testid, auth);
    }
    void set(testid as string);
    void setQuestions();
  }, []);

  useEffect(() => {
    if (!showExplanation && questions.length > 0)
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
    <Layout name="Test Explanation">
      <TestExplanation
        explanation={test.explanation}
        close={() => setShowExplanation(false)}
      />
      {test._id != "" && <AiOutlineLoading size={30}></AiOutlineLoading>}
    </Layout>
  );
};

export default Test;
