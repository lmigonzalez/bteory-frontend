import React, { useState } from "react";
import { admins } from "../../data/userData";
import AddNewAdmin from "./AddNewAdmin";
const Admins = () => {
  const [showNewAdmin, setShowNewAdmin] = useState(false);

  function closeNewQuestionForm() {
    setShowNewAdmin(false);
  }
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
                permission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                password
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {admins.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
              >
                <td className="whitespace-nowrap px-6 py-4">{row.firstName}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.lastName}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.email}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {row.permissions}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{row.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
