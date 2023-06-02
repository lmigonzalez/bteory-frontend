import React, { useState, useEffect } from "react";
import Layout from "~/components/Layout";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { getAllQuestions } from "../axios";
=======
import { type Question, getAllQuestions } from "../axios";
>>>>>>> 2d855e30e0ebfa813e3ddc357ca109c530f959cb
import { AiOutlineArrowLeft } from "react-icons/ai";
import AddNewQuestion from "~/components/dashboard/AddNewQuestion";
import Link from "next/link";

const Questions = () => {
  const router = useRouter();
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [questions, setQuestions] = useState<Question[]>();

  useEffect(() => {
    void getQuestions();
  }, []);

  async function getQuestions() {
    const response = await getAllQuestions();
    setQuestions(response);
  }
  console.log(questions);

  function closeNewQuestionForm() {
    setShowNewQuestion(false);
  }

  return (
    <Layout>
      <div>
        <h1 className="text-center text-2xl">All Question</h1>
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
          <button className="bg-my_green px-4 py-1 text-white">all</button>
          <button className="bg-my_grey px-4 py-1 text-white">practice</button>
          <button className="bg-my_grey px-4 py-1 text-white">final</button>
          <button className="bg-my_grey px-4 py-1 text-white">easy</button>
          <button className="bg-my_grey px-4 py-1 text-white">normal</button>
          <button className="bg-my_grey px-4 py-1 text-white">hard</button>
        </div>
        <div className="">
          <ul className="mt-6 text-my_blue">
            {questions?.map((item, index) => {
              return (
                <li className="my-1 list-inside list-disc" key={index}>
                  <Link
                    href={`/admin-question/[questionid]?id=${item?.id}`}
                    as={`/admin-question/${item?.id}`}
                  >
                    {item?.question}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Questions;
