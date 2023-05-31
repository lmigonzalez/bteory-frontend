import React, { useState } from "react";
import Layout from "~/components/Layout";
import Image from "next/image";
const Test = () => {
  const options = ["option 1", "option 2", "option 3", "option 4"];
  const [selectedOption, setSelectedOption] = useState(-1);

  function selectOption(index: number) {
    if (selectedOption === index) {
      setSelectedOption(-1);
      return;
    }
    setSelectedOption(index);
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center ">
        <Image src="/sample-img.png" alt="" width={500} height={500} />
        <ul className="m-auto mt-8  w-[700px] max-w-full space-y-4  ">
          {options.map((item, index) => {
            return (
              <li key={index} className="flex items-center">
                <button
                  onClick={() => selectOption(index)}
                  className={` ${
                    selectedOption === index ? "bg-my_red" : "bg-transparent"
                  } h-6 w-6  rounded-full border-[1px] border-my_black`}
                ></button>
                <div className="w-full px-4 py-2"> {item} </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto h-8">
          <div className="flex items-center justify-center gap-6">
            <button className="bg-my_black px-4 py-1 text-white">prev</button>
            <p>1 - 75</p>
            <button className="bg-my_black px-4 py-1 text-white">next</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Test;
