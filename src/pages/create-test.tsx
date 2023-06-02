import React, { useState } from "react";
import Layout from "~/components/Layout";
import { AiOutlineMinus, AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { drivingQuestion } from "../data/userData";
const CreateTest = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(1);
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
        <h1 className="text-2xl text-my_blue">Question selected: 35</h1>

        <button
          disabled={currentTab === 3 ? false : true}
          className={`${
            currentTab === 3 ? "bg-my_green" : "bg-my_grey"
          }  px-6 py-1 text-white`}
        >
          Save
        </button>
      </div>

      <div className="">
        {" "}
        <div className="mt-4 flex h-10 justify-between  gap-1">
          <button
            onClick={() => setCurrentTab(1)}
            className={`${
              currentTab === 1 ? "bg-my_green" : "bg-my_black"
            } h-full w-full  text-white`}
          >
            Test data
          </button>
          <button
            onClick={() => setCurrentTab(2)}
            className={`${
              currentTab === 2 ? "bg-my_green" : "bg-my_black"
            } h-full w-full  text-white`}
          >
            Test questions
          </button>
          <button
            onClick={() => setCurrentTab(3)}
            className={`${
              currentTab === 3 ? "bg-my_green" : "bg-my_black"
            } h-full w-full  text-white`}
          >
            Review questions
          </button>
        </div>
      </div>

      {currentTab === 1 && (
        <div className="mt-8 flex justify-center">
          {" "}
          <div className="flex w-[700px] flex-col border-[1px] border-my_black bg-white px-4 py-8">
            <input
              type="text"
              name="testName"
              placeholder="Test name"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            />

            <select
              name="category"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            >
              <option value="">Select Category</option>
              <option value="practice">Practice</option>
              <option value="general">General</option>
              <option value="final">Final</option>
            </select>

            <select
              name="complexity"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            >
              <option value="">Select Complexity</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setCurrentTab(2)}
                className="bg-my_green px-6 py-1 text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {currentTab === 2 && (
        <div className="">
          <div className="mt-6 flex items-center justify-end">
            <input
              type="text"
              placeholder="Search a question"
              className="w-96 rounded-none border-[1px] border-my_black bg-white px-2 py-1"
            />
          </div>
          <div className="">
            <ul className="mt-8 space-y-2">
              {drivingQuestion.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-start gap-2 text-my_blue"
                  >
                    <input
                      id="select-question-checkbox"
                      type="checkbox"
                      className="form-checkbox h-5 w-5 rounded-md bg-white text-blue-500 dark:bg-white"
                    />

                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {currentTab === 3 && (
        <div className="">
          <div className="mt-6 flex items-center justify-between text-lg">
            <p>Test Name:</p>
            <p>Category:</p>
            <p>Complexity:</p>
          </div>
          <div className="">
            <ul className="mt-8 space-y-2">
              {drivingQuestion.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-start gap-2 text-my_blue"
                  >
                    <div className="flex h-5 w-5 items-center justify-center border-[1px] border-my_red">
                      {" "}
                      <AiOutlineMinus fill="#EA5455" />
                    </div>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateTest;
