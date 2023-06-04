import React from "react";
import Image from "next/image";

interface Props {
  explanation: [{ explanation: string; image: string; type: string }];
  close: () => void;
}

const TestExplanation: React.FC<Props> = ({ explanation, close }) => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <ul className="flex flex-col items-center justify-center gap-4">
        {explanation.map((item, index) => {
          return (
            <li key={index}>
              {item.type === "text" ? (
                <p className="text-xl text-white">{item.explanation}</p>
              ) : (
                <Image
                  src={item.image}
                  alt="explanation image"
                  width={300}
                  height={300}
                />
              )}
            </li>
          );
        })}
      </ul>

      <div className="">
        <button className="px-6 py-1 bg-my_green mt-8 text-white" onClick={() => close()}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default TestExplanation;
