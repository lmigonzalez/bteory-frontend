import React, { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface Field {
  type: "text" | "file";
}

interface QuestionProps {
  closeNewQuestionForm: any;
}
const AddNewQuestion: React.FC<QuestionProps> = ({ closeNewQuestionForm }) => {
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [fields, setFields] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);

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

  const addTextField = () => {
    setFields([...fields, { type: "text" }]);
  };

  const addFileField = () => {
    setFields([...fields, { type: "file" }]);
  };

  const closeForm = () => {
    closeNewQuestionForm();
  };

  const submitQuestion = () => {
    console.log("submited");
    closeNewQuestionForm();
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="">
        {currentTab === 1 && (
          <div className="flex w-[700px] flex-col bg-white px-4 py-8">
            <p className="mb-4 text-center text-xl">
              Add new question and options
            </p>
            <input
              type="text"
              placeholder="Question"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            />
            {options.map((option, index) => (
              <input
                className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
            <div>
              <button onClick={handleAddOption}>new option</button>
            </div>
            <input
              type="text"
              placeholder="Correct answer"
              className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
            />
            <div className="mt-8 flex w-full justify-end">
              <button
                onClick={nextTab}
                className="bg-my_green px-6 py-1 text-white "
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentTab === 2 && (
          <div className="flex w-[700px] flex-col items-center justify-center bg-white px-4 py-8">
            <p>Add question image</p>
            <div className="mb-4">
              <input type="file" className="hidden" id="file-input" />
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

        {currentTab === 3 && (
          <div className="flex w-[700px] flex-col items-center justify-center bg-white px-4 py-8">
            <div id="fields" className="mb-4 w-full">
              {fields.map((field, index) => (
                <div key={index} className="mb-2 flex justify-start">
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder="Enter text"
                      className="my-2 h-10 w-full border-[1px] border-my_black bg-white px-2"
                    />
                  )}
                  {field.type === "file" && (
                    <>
                      <input
                        type="file"
                        className="hidden"
                        id={`file-input-${index}`}
                      />
                      <label
                        htmlFor={`file-input-${index}`}
                        className="my-6 flex h-20 w-40 cursor-pointer items-center justify-center rounded border border-gray-400 bg-gray-200 px-4 py-2 text-center"
                      >
                        Select a file
                      </label>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className=" flex w-full justify-start gap-3">
              <button
                onClick={addFileField}
                className=" flex items-center justify-center gap-2   px-6 py-1 text-my_blue"
              >
                Image <AiOutlinePlus />
              </button>
              <button
                onClick={addTextField}
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
