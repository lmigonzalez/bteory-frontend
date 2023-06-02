import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "~/components/Layout";
const Home: NextPage = () => {
  const [currentTab, setCurrentTab] = useState("practice");


  function switchTab(tab: string) {
    setCurrentTab(tab);
  }



  const practiceTest = [
    "practice test 1",
    "practice test 2",
    "practice test 3",
    "practice test 4",
    "practice test 5",
    "practice test 6",
  ];

  const finalTest = [
    "final test 1",
    "final test 2",
    "final test 3",
    "final test 4",
    "final test 5",
    "final test 6",
  ];

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
                practiceTest.map((item, index) => {
                  return (
                    <Link className="m-auto w-fit" key={index} href={"/test"}>
                      {item}
                    </Link>
                  );
                })}
              {currentTab === "final" &&
                finalTest.map((item, index) => {
                  return (
                    <Link className="m-auto w-fit" key={index} href={"/test"}>
                      {item}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
