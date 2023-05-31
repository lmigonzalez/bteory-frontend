import React, { useState } from "react";
import Layout from "~/components/Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AddNewQuestion from "~/components/dashboard/AddNewQuestion";
const Question = () => {
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const data = [
    "What is the value of π (pi) to two decimal places?",
    "Solve the equation: 3x + 7 = 22.",
    "Simplify the expression: (4 + 5) × 3 - 2.",
    "What is the square root of 81?",
    "Convert the fraction 3/5 into a decimal.",
    "A store is offering a 20% discount on a $50 item. What is the discounted price?",
    "Solve the equation: 2(x - 4) = 10.",
    "Calculate the area of a rectangle with length 8 cm and width 5 cm.",
    "What is the value of 5! (5 factorial)?",
    "A box contains 24 red balls and 36 blue balls. What is the probability of randomly selecting a red ball from the box?",
  ];

  function closeNewQuestionForm() {
    setShowNewQuestion(false);
  }

  return (
    <Layout>
      <div className="flex items-center justify-between border-b-2 border-my_black pb-3">
        <button className="flex items-center justify-between text-xl text-my_blue ">
          {" "}
          <AiOutlineArrowLeft /> Back
        </button>
        <h1 className="text-2xl text-my_blue">Question Name</h1>
        <button
          onClick={() => setShowNewQuestion(!showNewQuestion)}
          className="bg-my_green px-6 py-1 text-white"
        >
          Add
        </button>
      </div>
      {showNewQuestion && (
        <AddNewQuestion closeNewQuestionForm={closeNewQuestionForm} />
      )}
      <div>
        <ul className="mt-8">
          {data.map((item, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer list-inside list-disc text-my_blue"
              >
                {" "}
                {item}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Question;
