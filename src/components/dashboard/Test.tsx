import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllTest, type TestType } from "../../axios";

const Test = () => {
  const [tests, setTests] = useState<TestType[]>([]);
  useEffect(() => {
    void getTests();
  }, []);

  async function getTests() {
    try {
      const response = await getAllTest();
      // console.log(response);
      setTests(response??[]);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <div className="my-10 flex items-center justify-end gap-4">
        {/* <Link
          href="/questions"
          className="border-[1px] border-my_green px-6 py-1 text-my_green"
        >
          Questions
        </Link> */}
        <Link
          href="/create-test"
          className="border-[1px] border-my_green bg-my_green px-6 py-1 text-white"
        >
          Create new test
        </Link>
      </div>
      <div className="">
        <div className="">
          <h2 className="mb-4 w-full text-center text-2xl">Tests</h2>
          <ul className="space-y-2">
            {tests &&
              tests.map((item, index) => {
                return (
                  <li
                    className="list-inside list-decimal text-my_blue"
                    key={index}
                  >
                    <Link
                      href={`/admin-test/[testid]?id=${item?._id}`}
                      as={`/admin-test/${item?._id}`}
                    >
                      {item?.testName}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Test;
