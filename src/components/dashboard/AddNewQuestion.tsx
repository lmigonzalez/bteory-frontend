import React, { FC, useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineCloseSquare,
  AiOutlineMinus,
} from "react-icons/ai";

import axios, { AxiosHeaders } from "axios";
import { postQuestion } from "../../axios";
interface Field {
  type: string;
  value: string | File;
}

interface QuestionProps {
  closeNewQuestionForm: () => void;
}

const AddNewQuestion: React.FC<QuestionProps> = ({ closeNewQuestionForm }) => {
  const initialData = {
    question: "",
    questionImg: null,
    options: [],
    answer: "",
    explanation: [],
    category: "",
    complexity: "",
  };
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [newQuestion, setNewQuestion] = useState(initialData);
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [questionImage, setQuestionImage] = useState<File | undefined>();
  const [fields, setFields] = useState<Field[]>([]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const nextTab = () => {
    if (currentTab <= 2) {
      setCurrentTab(currentTab + 1);
    }
  };

  const prevTab = () => {
    if (currentTab > 1) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleAddField = (type: string) => {
    const newField = {
      type: type,
      value: "",
    };
    setFields([...fields, newField]);
  };

  const closeForm = () => {
    closeNewQuestionForm();
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleFieldChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = [...fields];
    const field = updatedFields[index];

    if (field) {
      if (e.currentTarget && e.currentTarget.name === "explanationImage") {
        field.value = e.currentTarget.files?.[0] as File;
      } else {
        field.value = e.target.value;
      }

      setFields(updatedFields);
    }
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFile = e.currentTarget?.files?.[0];
    setQuestionImage(updatedFile);
  };

  const submitQuestion = async () => {

    const formData = new FormData();

    formData.append("question", newQuestion.question);
    if (questionImage) formData.append("files", questionImage);
    options.forEach((option) => {
      formData.append("options[]", option);
    });
    formData.append("answer", newQuestion.answer);

    fields.forEach((item, index) => {
      if (item.type === "file") {
        formData.append(`files`, item.value);
      }
      if (item.type === "text") {
        formData.append(`explanation-${index}`, item.value);
      }
    });
    formData.append("category", newQuestion.category);
    formData.append("complexity", newQuestion.complexity);

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await postQuestion(formData, new AxiosHeaders(headers));

      console.log(response);
    } catch (err) {
      console.log(err);
    }

    closeNewQuestionForm();
    setNewQuestion(initialData);
    setQuestionImage({});
    setFields([]);
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex w-[700px] justify-center">
        <button
          onClick={closeForm}
          className=" transition-all hover:-translate-y-1"
        >
          <AiOutlineCloseSquare size={50} fill="#fff" />
        </button>
      </div>

      <div className="">
        {currentTab === 1 && (
          <div className="flex w-[700px] flex-col bg-white px-4 py-8">
            <p className="mb-4 text-center text-xl">
              Add new question and options
            </p>
            <input
              name="question"
              value={newQuestion.question}
              onChange={handleChange}
              type="text"
              placeholder="Question"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            />
            {options.map((option, index) => (
              <div
                key={index}
                className="relative my-2 w-full border-[1px] border-my_black bg-red-200"
              >
                {" "}
                <input
                  className="h-10  w-full bg-white px-2 pr-7"
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button
                  onClick={() => handleDeleteOption(index)}
                  className="absolute right-1 top-1/3"
                >
                  {" "}
                  <AiOutlineMinus fill="#EA5455" size={20} />
                </button>
              </div>
            ))}
            <div>
              <button
                className="my-2 flex items-center gap-1 text-my_blue"
                onClick={handleAddOption}
              >
                new option <AiOutlinePlus />{" "}
              </button>
            </div>
            <input
              name="answer"
              value={newQuestion.answer}
              onChange={handleChange}
              type="text"
              placeholder="Correct answer"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            />

            <select
              name="category"
              value={newQuestion.category}
              onChange={handleChange}
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            >
              <option value="">Select Category</option>
              <option value="practice">Practice</option>
              <option value="general">General</option>
              <option value="final">Final</option>
            </select>

            <select
              name="complexity"
              value={newQuestion.complexity}
              onChange={handleChange}
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            >
              <option value="">Select Complexity</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <div className="mt-8 flex w-full justify-end">
              <button
                onClick={nextTab}
                className="bg-my_green px-6 py-1 text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ----- 2 ----- */}

        {currentTab === 2 && (
          <div className="flex w-[700px] flex-col items-center justify-center bg-white px-4 py-8">
            <p className="mb-4 text-center text-xl">Add question image</p>
            <div className="mb-4">
              <input
                onChange={handleQuestionImageFile}
                name="questionImage"
                type="file"
                className="hidden"
                id="file-input"
                accept="image/*"
              />
              <label
                htmlFor="file-input"
                className="my-6 flex h-40 w-60 cursor-pointer items-center justify-center rounded border border-gray-400 bg-gray-200 px-4 py-2 text-center"
              >
                Select a file
              </label>
            </div>
            <div className="flex w-full justify-end gap-3">
              <button
                onClick={prevTab}
                className="border-[1px] border-my_green px-6 py-1 text-my_green"
              >
                Prev
              </button>
              <button
                onClick={nextTab}
                className="border-[1px] border-my_green bg-my_green px-6 py-1 text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ----- 3 ------  */}

        {currentTab === 3 && (
          <div className="flex w-[700px] flex-col items-center justify-center bg-white px-4 py-8">
            <p className="mb-4 text-center text-xl">Add question explanation</p>

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

            <div className="flex w-full justify-end gap-3">
              <button
                onClick={prevTab}
                className="border-[1px] border-my_green px-6 py-1 text-my_green"
              >
                Prev
              </button>
              <button
                onClick={submitQuestion}
                className="border-[1px] border-my_green bg-my_green px-6 py-1 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewQuestion;
