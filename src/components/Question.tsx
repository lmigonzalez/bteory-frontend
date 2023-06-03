import Image from "next/image";
import React, { useState, type FC, useEffect } from "react";
import { type QuestionType } from "~/axios";

const Question: FC<{
  question: QuestionType;
  select: (questionId: string, selected: Set<number>) => void;
  selected: Set<number>;
}> = (props) => {
  const [selected, setSelected] = useState<Set<number>>(props.selected);
  const [question] = useState<QuestionType>(props.question);

  return (
    <div className="flex flex-col items-center justify-center ">
      <Image
        src={props.question.questionImg || ""}
        alt=""
        width={500}
        height={500}
        className="w-[300px]"
      />
      <p>{question.question}</p>
      <ul className="m-auto mt-8  w-[700px] max-w-full space-y-4  ">
        {question.options.map((item, index) => {
          return (
            <li key={index} className="flex items-center justify-between">
              <input
                type="checkbox"
                id={`${index}`}
                onChange={() =>
                  setSelected((set) => {
                    const a = set.delete(index) ? set : set.add(index);
                    return a;
                  })
                }
                className={` ${
                  selected.has(index) ? "bg-my_red" : "bg-transparent"
                } h-6 w-6  self-start rounded-full border-[1px] border-my_black`}
              ></input>
              <label htmlFor={`${index}`}>{item}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Question;
