import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "~/components/Layout";

import { getAllTest } from "../axios";
const Home: NextPage = () => {
  const [currentTab, setCurrentTab] = useState("practice");
  const [tests, setTests] = useState([]);

  useEffect(() => {
    getTests();
  }, []);

  async function getTests() {
    try {
      const response = await getAllTest();
      console.log(response);
      setTests(response);
    } catch (err) {
      console.log(err);
    }
  }

  function switchTab(tab: string) {
    setCurrentTab(tab);
  }

  return (
    <>
      <Layout>
        <div className="my-div space-y-8 text-center">
          <h1 className="text-4xl">Welcome</h1>
          <p className="text-lg">
            Your subscription will be expiring on 2023-07-20{" "}
          </p>

          <div className="">
            <div className="h-10 bg-my_red">
              <button
                onClick={() => switchTab("practice")}
                className={`${
                  currentTab === "practice" ? "bg-my_green" : "bg-my_black"
                } h-full w-1/2 text-white`}
              >
                Practice Test
              </button>
              <button
                onClick={() => switchTab("final")}
                className={`${
                  currentTab === "final" ? "bg-my_green" : "bg-my_black"
                } h-full w-1/2 text-white`}
              >
                Final Test
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-4 text-xl text-my_blue">
              {currentTab === "practice" &&
                tests &&
                tests.map((item, index) => {
                  if (
                    item.category === "practice" ||
                    item.category === "general"
                  ) {
                    return (
                      <Link
                        className="m-auto w-fit"
                        key={index}
                        href={`test/${item?._id}`}
                      >
                        {item?.testName}
                      </Link>
                    );
                  } else {
                    return null; // Exclude item from rendering
                  }
                })}

              {currentTab === "final" &&
                tests &&
                tests.map((item, index) => {
                  if (
                    item.category === "final" ||
                    item.category === "general"
                  ) {
                    return (
                      <Link
                        className="m-auto w-fit"
                        key={index}
                        href={`test/${item?._id}`}
                      >
                        {item?.testName}
                      </Link>
                    );
                  } else {
                    return null; // Exclude item from rendering
                  }
                })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
