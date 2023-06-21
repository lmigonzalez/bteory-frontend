import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { type QuestionType, getAllQuestions } from "../../axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AddNewQuestion from "../../components/dashboard/AddNewQuestion";
const Questions = () => {
  const router = useRouter();
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>();

  useEffect(() => {
    void getQuestions();
  }, []);

  async function getQuestions() {
    const response = await getAllQuestions();
    setQuestions(response);
  }

  function closeNewQuestionForm() {
    setShowNewQuestion(false);
  }
  return (
    <>
      <div>
        <div className="my-10 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-between text-xl text-my_blue "
          >
            <AiOutlineArrowLeft /> Back
          </button>
          <p>Questions: 230</p>
          <button
            onClick={() => setShowNewQuestion(!showNewQuestion)}
            className="border-[1px] border-my_green bg-my_green px-6 py-1 text-white"
          >
            Create new question
          </button>
        </div>
      </div>

      {showNewQuestion && (
        <AddNewQuestion closeNewQuestionForm={closeNewQuestionForm} />
      )}
      <div className="">
        <div className=" flex  items-center gap-3 border-b-[2px] border-my_black pb-4">
          <select className="border-[2px] border-black bg-white px-6 py-1">
            <option value="all">All</option>
            <option value="practice">Practice</option>
            <option value="final">Final</option>
          </select>
        </div>
        <div className="">
          <ul className="mt-6 text-my_blue">
            {questions?.map((item, index) => {
              return (
                <li className="my-1 list-inside list-disc" key={index}>
                  <Link
                    href={`/admin-question/[questionid]?id=${item?._id}`}
                    as={`/admin-question/${item?._id}`}
                  >
                    {item?.question}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Questions;
