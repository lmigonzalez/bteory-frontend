import React, { useState } from "react";
import Layout from "~/components/Layout";

import UserTable from "~/components/dashboard/UserTable";
import Test from "~/components/dashboard/Test";
import Admins from "~/components/dashboard/Admins";
const dashboard = () => {
  const [currentTab, setCurrentTab] = useState("users");
  return (
    <Layout>
      <h1 className="mb-8 text-center text-5xl">Dashboard</h1>
      <div className="flex h-10 justify-between gap-1">
        <button
          onClick={() => setCurrentTab("users")}
          className={`${
            currentTab === "users" ? "bg-my_green" : "bg-my_black"
          } h-full w-full  text-white`}
        >
          Users
        </button>
        <button
          onClick={() => setCurrentTab("questions")}
          className={`${
            currentTab === "questions" ? "bg-my_green" : "bg-my_black"
          } h-full w-full  text-white`}
        >
          Questions
        </button>
        <button
          onClick={() => setCurrentTab("admins")}
          className={`${
            currentTab === "admins" ? "bg-my_green" : "bg-my_black"
          } h-full w-full  text-white`}
        >
          Admins
        </button>
      </div>
      {currentTab === "users" && <UserTable />}
      {currentTab === "questions" && <Test />}
      {currentTab === "admins" && <Admins />}
    </Layout>
  );
};

export default dashboard;
