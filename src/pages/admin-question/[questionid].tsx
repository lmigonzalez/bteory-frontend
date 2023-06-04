import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { globalState } from "../../Store";
const QuestionId = () => {
  const router = useRouter();
  const { id } = router.query;
  const { questions, getQuestions } = globalState();
  const [questionData, setQuestionData] = useState({});

  useEffect(() => {
    if (questions.length > 0) {
      const selectedQuestion = findQuestionById();
      setQuestionData(selectedQuestion);
    }
  }, []);

  function findQuestionById() {
    return questions.find((question) => question._id === id);
  }

  return (
    <Layout>
      <div>
        <p>{questionData.question}</p>
      </div>
    </Layout>
  );
};

export default QuestionId;
