import React, { useEffect, useState } from "react";
import { type User, getAllUsers } from "~/axios";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    void getAdmins();
  }, []);

  async function getAdmins() {
    try {
      const res = await getAllUsers();
      setUsers(res || []);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <div className="">
        <div className="my-10 flex items-center justify-end gap-2">
          <select className="h-10 w-40 border-[1px] border-my_black bg-white px-2">
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
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

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((row, index) => (
              <tr
                key={row._id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
              >
                <td className="whitespace-nowrap px-6 py-4">{row.firstName}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.lastName}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
