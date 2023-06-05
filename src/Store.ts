import { create } from "zustand";
import {
  type QuestionType,
  getAllQuestions,
  type TestType,
  getTest,
} from "./axios";
import { type AxiosHeaders } from "axios";

type state = {
  questions: QuestionType[];
  setQuestions: () => Promise<void>;
  test: TestType;
  setTest: (testId: string, ctx: AxiosHeaders) => Promise<void>;
  solutions: Set<string>;
  touchSolution: (questionId_i: string) => void;
  flags: Set<string>;
  touchFlag: (questionId: string) => void;
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
    explanation: [{ explanation: "", image: "", type: "" }],
    category: "",
    complexity: "",
  },
  setTest: async (testId: string, ctx: AxiosHeaders) => {
    try {
      const res = await getTest(testId, ctx);
      set({ test: res });
    } catch (err) {
      console.log(err);
    }
  },

  // test solutions

  solutions: new Set<string>(),

  touchSolution: (questionId_i) =>
    set((state) => ({
      solutions: state.solutions.delete(questionId_i)
        ? state.solutions
        : state.solutions.add(questionId_i),
    })),

  // flags

  flags: new Set<string>(),
  touchFlag: (questionId) =>
    set((state) => ({
      flags: state.flags.delete(questionId)
        ? state.flags
        : state.flags.add(questionId),
    })),
}));
