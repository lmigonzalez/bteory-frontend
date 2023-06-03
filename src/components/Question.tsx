import Image from "next/image";
import React, { type FC } from "react";
import { type QuestionType } from "~/axios";

const Question: FC<{
  question: QuestionType;
  select: (selected: number) => void;
  selected: Set<number>;
}> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Image
        src={props.question.questionImg || ""}
        alt=""
        width={500}
        height={500}
        className="w-[300px]"
      />
      <p>{props.question?.question}</p>
      <ul className="m-auto mt-8  w-[700px] max-w-full space-y-4  ">
        {props.question?.options.map((item, index) => {
          return (
            <li key={index} className="flex items-center">
              <button
                onClick={() => props.select(index)}
                className={` ${
                  props.selected.has(index) ? "bg-my_red" : "bg-transparent"
                } h-6 w-6  rounded-full border-[1px] border-my_black`}
              ></button>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Question;
