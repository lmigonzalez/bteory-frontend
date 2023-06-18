import React, { useState, useEffect } from "react";
import AddNewAdmin from "./AddNewAdmin";
import {
  getAllAdmins,
  updateAdmin,
  deleteAdmin as deleteAdminAPI,
  type User,
} from "../../axios";

const Admins = () => {
  const [showNewAdmin, setShowNewAdmin] = useState(false);
  const [showSelectedRow, setShowSelectedRow] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [admins, setAdmins] = useState<User[]>([]);

  useEffect(() => {
    void getAdmins();
  }, [showNewAdmin]);

  async function getAdmins() {
    try {
      const res = await getAllAdmins();
      setAdmins(res || []);
    } catch (err) {
      console.log(err);
    }
  }

  function closeNewQuestionForm() {
    setShowNewAdmin(false);
  }

  function selectRow(index: number) {
    setSelectedLevel("");
    setShowSelectedRow(!showSelectedRow);
    setSelectedRowIndex(index);
  }

  async function updateLevel(_id: string, level: string) {
    try {
      await updateAdmin(_id, level);
      void getAdmins();
    } catch (errors) {
      console.log(errors);
    }
  }

  async function deleteAdmin(_id: string) {
    try {
      await deleteAdminAPI(_id);
      void getAdmins();
      console.log("deleted");
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(admins);
  return (
    <div>
      <div className="my-10 flex items-center justify-end gap-4">
        <button
          onClick={() => setShowNewAdmin(!showNewAdmin)}
          className=" bg-my_green px-6 py-1 text-white"
        >
          New Admin
        </button>
      </div>
      {showNewAdmin && (
        <AddNewAdmin closeNewQuestionForm={closeNewQuestionForm} />
      )}
      <div className="">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-my_black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {admins &&
              admins.map((row, index) => (
                <>
                  <tr
                    key={index}
                    onClick={() => selectRow(index)}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-200"
                    } cursor-pointer hover:bg-gray-400`}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.firstName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.lastName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{row.email}</td>
                    <td className="whitespace-nowrap px-6 py-4">{row.level}</td>
                  </tr>

                  {showSelectedRow && selectedRowIndex === index && (
                    <tr className="">
                      <td colSpan={4} className="w-full p-4 ">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => void deleteAdmin(row._id)}
                            className="bg-my_red px-6 py-1 text-white"
                          >
                            Delete Admin
                          </button>
                          <div className="flex items-center justify-center gap-4">
                            <input
                              type="radio"
                              name={`lv-${row.userId}`}
                              className="radio-error radio bg-white"
                              value="questions"
                              checked={row.level === "questions"}
                              onChange={() => {
                                void updateLevel(row._id, "questions");
                              }}
                            />
                            <label>questions</label>

                            <input
                              type="radio"
                              name={`lv-${row.userId}`}
                              className="radio-error radio"
                              value="users"
                              checked={row.level === "users"}
                              onChange={() => {
                                void updateLevel(row._id, "users");
                              }}
                            />
                            <label>users</label>

                            <input
                              type="radio"
                              name={`lv-${row.userId}`}
                              className="radio-error radio"
                              value="both"
                              checked={row.level === "both"}
                              onChange={() => {
                                void updateLevel(row._id, "both");
                              }}
                            />
                            <label>both</label>
                            {/* 
                            <button
                              className="bg-my_green px-6 py-1 text-white"
                              onClick={() => updateLevel(row.userId)}
                            >
                              Update
                            </button> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
