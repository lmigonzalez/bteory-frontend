import React, { useState, useEffect } from "react";
import { getAllQuestions, postTest, QuestionType } from "../axios";
import { AxiosHeaders } from "axios";
import Layout from "~/components/Layout";
import {
  AiOutlineMinus,
  AiOutlineArrowLeft,
  AiOutlinePlus,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

type Field = { type: string; value: FormDataEntryValue };

const CreateTest = () => {
  const router = useRouter();
  const { user } = useUser();
  const initialData = {
    testName: "",
    category: "",
    complexity: "",
  };
  const [currentTab, setCurrentTab] = useState(1);
  const [test, setTest] = useState(initialData);
  const [fields, setFields] = useState<Field[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionType[]>(
    []
  );

  useEffect(() => {
    void getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const response = await getAllQuestions();
      setQuestions(response);
    } catch (err) {
      console.log(err);
    }
  }

  const handleTestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTest({
      ...test,
      [e.target.name]: e.target.value,
    });
  };

  const handleFieldChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = [...fields];
    const field = updatedFields[index];

    if (field) {
      if (
        e.currentTarget &&
        e.currentTarget.files?.[0] &&
        e.currentTarget.name === "explanationImage"
      ) {
        field.value = e.currentTarget.files?.[0];
      } else {
        field.value = e.target.value;
      }

      setFields(updatedFields);
    }
  };
  const handleAddField = (type: string) => {
    const newField = {
      type: type,
      value: "",
    };
    setFields([...fields, newField]);
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleCheckboxChange =
    (item: QuestionType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelectedQuestions((prevSelectedQuestions) => [
          ...prevSelectedQuestions,
          item,
        ]);
      } else {
        setSelectedQuestions((prevSelectedQuestions) =>
          prevSelectedQuestions.filter((selectedItem) => selectedItem !== item)
        );
      }
    };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions.splice(index, 1);
    setSelectedQuestions(updatedQuestions);
  };

  const submitTest = async () => {
    const formData = new FormData();
    const selectedQuestionsId = selectedQuestions.map((item) => item?._id);

    formData.append("name", test.testName);
    formData.append("category", test.category);
    formData.append("complexity", test.complexity);

    fields.forEach((item, index) => {
      if (item.type === "file") {
        formData.append(`files`, item.value);
      }
      if (item.type === "text") {
        formData.append(`explanation-${index}`, item.value);
      }
    });

    selectedQuestionsId.forEach((item) => {
      formData.append("questions[]", item);
    });

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      await postTest(formData, user?.id ?? '');
      // const [currentTab, setCurrentTab] = useState(1);
      // const [test, setTest] = useState(initialData);
      // const [fields, setFields] = useState<Field[]>([]);
      // const [questions, setQuestions] = useState([]);
      // const [selectedQuestions, setSelectedQuestions] = useState([]);

      setCurrentTab(1);
      setTest(initialData);
      setFields([]);
      setSelectedQuestions([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout name="Create Test">
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
          onClick={()=> void submitTest()}
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
              value={test.testName}
              onChange={handleTestChange}
              name="testName"
              placeholder="Test name"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            />

            <select
              value={test.category}
              onChange={handleTestChange}
              name="category"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            >
              <option value="">Select Category</option>
              <option value="practice">Practice</option>
              <option value="general">General</option>
              <option value="final">Final</option>
            </select>

            <select
              value={test.complexity}
              onChange={handleTestChange}
              name="complexity"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            >
              <option value="">Select Complexity</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <div className="flex w-full flex-col border-opacity-50">
              <div className="divider">Test explanation</div>
            </div>
            <div className="mb-4 w-full">
              {fields.map((field, index) => (
                <div key={index} className="mb-2 flex justify-start">
                  {field.type === "text" && (
                    <div
                      key={index}
                      className="relative my-2 w-full border-[1px] border-my_black bg-white"
                    >
                      <input
                        className="h-10  w-full bg-white px-2 pr-7"
                        type="text"
                        placeholder={`Enter Text`}
                        name="explanationText"
                        value={field.value as string}
                        onChange={(e) => handleFieldChange(index, e)}
                      />
                      <button
                        onClick={() => handleDeleteField(index)}
                        className="absolute right-1 top-1/3"
                      >
                        <AiOutlineMinus fill="#EA5455" size={20} />
                      </button>
                    </div>
                  )}
                  {field.type === "file" && (
                    <div className="flex gap-1">
                      <input
                        name="explanationImage"
                        className="hidden"
                        id={`file-input-${index}`}
                        type="file"
                        accept="image/*"
                        // value={field.value}
                        onChange={(e) => handleFieldChange(index, e)}
                      />
                      <label
                        htmlFor={`file-input-${index}`}
                        className="my-6 flex h-20 w-40 cursor-pointer items-center justify-center rounded border border-gray-400 bg-gray-200 px-4 py-2 text-center"
                      >
                        Select a file
                      </label>
                      <button onClick={() => handleDeleteField(index)}>
                        <AiOutlineMinus fill="#EA5455" size={20} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className=" flex w-full justify-start gap-3">
              <button
                onClick={() => handleAddField("file")}
                className=" flex items-center justify-center gap-2   px-6 py-1 text-my_blue"
              >
                Image <AiOutlinePlus />
              </button>
              <button
                onClick={() => handleAddField("text")}
                className=" flex items-center justify-center gap-2 px-6 py-1 text-my_blue"
              >
                Text <AiOutlinePlus />
              </button>
            </div>

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
              {questions.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start gap-2 text-my_blue"
                >
                  <input
                    id="select-question-checkbox"
                    type="checkbox"
                    className="form-checkbox h-5 w-5 rounded-md bg-white text-blue-500 dark:bg-white"
                    onChange={handleCheckboxChange(item)}
                    checked={selectedQuestions.some(
                      (q) => q?._id === item?._id
                    )}
                  />
                  {item?.question}
                </li>
              ))}
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
              {selectedQuestions.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-start gap-2 text-my_blue"
                  >
                    <button
                      onClick={() => deleteQuestion(index)}
                      className="flex h-5 w-5 items-center justify-center border-[1px] border-my_red"
                    >
                      {" "}
                      <AiOutlineMinus fill="#EA5455" />
                    </button>
                    {item?.question}
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
