import React, { useState, useEffect } from "react";
import Layout from "~/components/Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AddNewQuestion from "~/components/dashboard/AddNewQuestion";
import { useRouter } from "next/router";
import { getTest } from "../../axios";
import { AiFillDelete } from "react-icons/ai";
import { globalState } from "../../Store";
import { AxiosHeaders } from "axios";
import axios from "axios";

const Question = () => {
  const router = useRouter();
  const { id } = router.query;
  const { questions, getQuestions } = globalState();
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [selectedTest, setSelectedTest] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    getAllQuestions();
    if (id) {
      getTestById();
    }
  }, [id]);

  useEffect(() => {
    console.log("selectedTest: " + selectedTest);
    const selected = findQuestionsByIds();
    console.log(selected);

    if (selected.length > 0) {
      setSelectedQuestions(selected);
    }
  }, [selectedTest]);

  async function getTestById() {
    try {
      console.log(id);
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
        // console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function findQuestionsByIds() {
    console.log(selectedTest);
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
        <h1 className="w-full text-center text-2xl text-my_blue">Test Name</h1>
        <button
          onClick={() => setShowNewQuestion(!showNewQuestion)}
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
