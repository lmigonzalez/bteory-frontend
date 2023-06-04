import React, { useState, useEffect, useCallback } from "react";
import Layout from "~/components/Layout";
import { AiOutlineArrowLeft, AiFillDelete } from "react-icons/ai";
import AddNewQuestion from "~/components/dashboard/AddNewQuestion";
import { useRouter } from "next/router";
import { getTest, deleteTestById } from "../../axios";

import { globalState } from "../../Store";
import { AxiosHeaders } from "axios";

const Question = () => {
  const router = useRouter();
  const { id } = router.query;
  const { questions, getQuestions } = globalState();
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [selectedTest, setSelectedTest] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const deleteTest = useCallback(async () => {
    try {
      const response = await deleteTestById(id, new AxiosHeaders());
      router.push("/dashboard");

    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    getAllQuestions();
    if (id) {
      getTestById();
    }
  }, [id]);

  useEffect(() => {

    const selected = findQuestionsByIds();


    if (selected.length > 0) {
      setSelectedQuestions(selected);
    }
  }, [selectedTest]);

  async function getTestById() {
    try {

      const response = await getTest(id, new AxiosHeaders());
      setSelectedTest(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllQuestions() {
    if (questions.length === 0) {
      try {
        const response = await getQuestions();
     
      } catch (err) {
        console.log(err);
      }
    }
  }

  function findQuestionsByIds() {

    return questions.filter((obj) =>
      selectedTest?.questionsId?.includes(obj._id)
    );
  }

  function closeNewQuestionForm() {
    setShowNewQuestion(false);
  }

  return (
    <Layout>
      <div className="flex items-center justify-between border-b-2 border-my_black pb-3">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-between text-xl text-my_blue "
        >
          {" "}
          <AiOutlineArrowLeft /> Back
        </button>
        <h1 className="w-full text-center text-2xl text-my_blue">
          {selectedTest.testName}
        </h1>
        <button
          onClick={deleteTest}
          className="transition-all hover:-translate-y-1"
        >
          <AiFillDelete size={25} fill="#EA5455" />
        </button>
      </div>
      {showNewQuestion && (
        <AddNewQuestion closeNewQuestionForm={closeNewQuestionForm} />
      )}
      <div>
        <ul className="mt-8">
          {selectedQuestions &&
            selectedQuestions.map((item, index) => {
              return (
                <li
                  key={index}
                  className="cursor-pointer list-inside list-decimal text-my_blue"
                >
                  {item.question}{" "}
                </li>
              );
            })}
        </ul>
      </div>
    </Layout>
  );
};

export default Question;
