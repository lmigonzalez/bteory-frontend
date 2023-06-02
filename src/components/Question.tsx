import { AxiosHeaders } from "axios";
import { error } from "console";
import Image from "next/image";
import React, { type FC, useEffect, useState } from "react";
import { Question, getQuestion } from "~/axios";

const Question: FC<{
  id: string;
  select: (selected: number | undefined) => void;
}> = (props) => {
  const [question, setQuestion] = useState<Question>();
  const [selectedOption, selectOption] = useState<number>();

  useEffect(() => {
    props.select(selectedOption);
  });

  useEffect(() => {
    void getQuestion(props.id, new AxiosHeaders())
      .then((res) => {
        setQuestion(res);
      })
      .catch(error);
  });

  return (
    <div className="flex flex-col items-center justify-center ">
      <Image
        src={question?.questionImg || ""}
        alt=""
        width={500}
        height={500}
      />
      <p>{question?.question}</p>
      <ul className="m-auto mt-8  w-[700px] max-w-full space-y-4  ">
        {question?.options.map((item, index) => {
          return (
            <li key={index} className="flex items-center">
              <button
                onClick={() => selectOption(index)}
                className={` ${
                  selectedOption === index ? "bg-my_red" : "bg-transparent"
                } h-6 w-6  rounded-full border-[1px] border-my_black`}
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Question;
