import { create } from "zustand"
import { type QuestionType,getAllQuestions, TestType, getTest } from "./axios";
import { AxiosHeaders } from "axios";

type state = {
  questions: QuestionType[];
  setQuestions: () => Promise<void>;
  test: TestType;
  setTest: (testId: string, ctx: AxiosHeaders) => Promise<void>;
  solution: Record<string, number>;
  setSolution: (questionId: string, answer: number) => Promise<void>;
};

export const globalState = create<state>()((set) => ({
  //all questionns
  questions: [],
  setQuestions: async () => {
    try {
      const res = await getAllQuestions();
      set({ questions: res });
    } catch (err) {
      console.log(err);
    }
  },
  // test
  test: {
    _id: "",
    questionsId: [],
    explanation: [],
    category: "",
    complexity: "",
  },
  setTest: async () => {
    try {
      const res = await getTest(testId, ctx);
      set({ test: res });
    } catch (err) {
      console.log(err);
    }
  },

  // test solutions

  solutions: {},
  setSolution: async (questionId, answer) => {
    set((state)=>{solution:state.solution[]})
  },
}));