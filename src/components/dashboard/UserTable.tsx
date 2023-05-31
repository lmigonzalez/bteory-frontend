import React from "react";
import { data } from "../../data/userData";
const UserTable = () => {
  return (
    <div>
      <div className="">
        <div className="my-10 flex items-center justify-end">
          <select className="h-10 w-40 border-[1px] border-my_black bg-white px-2">
            <option>Who shot first?</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <input
            type="text"
            placeholder="Type here"
            className="k h-10 w-96 rounded-none border-[1px] border-my_black bg-white px-2"
          />
        </div>
      </div>

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
                Due Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
              >
                <td className="whitespace-nowrap px-6 py-4">{row.firstName}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.lastName}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.email}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
