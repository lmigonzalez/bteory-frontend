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
  solutions: Record<string, number>;
  setSolution: (questionId: string, answer: number) => void;
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
  setTest: async (testId, ctx) => {
    try {
      const res = await getTest(testId, ctx);
      set({ test: res });
    } catch (err) {
      console.log(err);
    }
  },

  // test solutions

  solutions: {},
  setSolution: (questionId, answer) => {
    set((state) => ({
      solutions: { ...state.solutions, [questionId]: answer },
    }));
  },
}));
