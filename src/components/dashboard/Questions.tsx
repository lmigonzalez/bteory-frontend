import React from "react";
import Link from "next/link";
const Questions = () => {
  const data = [
    "Mathematics",
    "History",
    "Science (Physics, Chemistry, Biology)",
    "English Language and Literature",
    "Geography",
    "Physical Education",
    "Foreign Language (Spanish, French, German)",
    "Computer Science",
    "Art",
    "Music",
  ];
  return (
    <div>
      <div className="my-10 flex items-center justify-end gap-4">
        {/* <button className="border-[1px] border-my_green px-6 py-1 text-my_green">
          Custom Test
        </button> */}
        <Link
          href="/create-test"
          className="border-[1px] border-my_green bg-my_green px-6 py-1 text-white"
        >
          Create new test
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="">
          <h2 className="mb-4 text-2xl">Practice Tests</h2>
          <ul>
            {data.map((item, index) => {
              return (
                <li className="list-inside list-disc text-my_blue" key={index}>
                  <Link
                    href={`/admin-question/[questionid]?id=${item}`}
                    as={`/admin-question/${item}`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="">
          <h2 className="mb-4 text-2xl">Final Tests</h2>
          <ul>
            {data.map((item, index) => {
              return (
                <li className="list-inside list-disc text-my_blue" key={index}>
                  <Link
                    href={`/admin-question/[questionid]?id=${item}`}
                    as={`/admin-question/${item}`}
                  >
                    {item}
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

export default Questions;
