import React, { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";

interface QuestionProps {
  closeNewQuestionForm: any;
}
const AddNewAdmin: React.FC<QuestionProps> = ({ closeNewQuestionForm }) => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    level: "",
  };

  const [adminData, setAdminData] = useState(initialData);

  function onChange(e: any) {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  }

  function submitAdmin(e: any) {
    e.preventDefault();
    console.log(adminData);
    setAdminData(initialData);
    closeNewQuestionForm();
  }

  const closeForm = () => {
    closeNewQuestionForm();
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
      <form
        onSubmit={submitAdmin}
        className="flex w-[700px] flex-col bg-white px-4 py-8"
      >
        <p className="text-center text-xl">Add new admin</p>
        <input
          placeholder="First Name"
          type="text"
          name="firstName"
          value={adminData.firstName}
          onChange={onChange}
          className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
        />
        <input
          placeholder="Last Name"
          type="text"
          name="lastName"
          value={adminData.lastName}
          onChange={onChange}
          className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
        />
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={adminData.email}
          onChange={onChange}
          className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
        />
        <select
          name="level"
          value={adminData.level}
          onChange={onChange}
          className="my-2 h-10 border-[1px] border-my_black bg-white px-2"
        >
          <option value="">Admin Level</option>
          <option value="questions">Questions</option>
          <option value="users">Users</option>
          <option value="both">Both</option>
          <option value="top">Top</option>
        </select>

        <div className="flex justify-end">
          <button type="submit" className="bg-my_green px-6 py-1 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewAdmin;
