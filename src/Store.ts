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
  setSolution: (questionId: string) => void;
  removeSolution: (questionId: string) => boolean;
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
  setTest: async (testId, ctx) => {
    try {
      const res = await getTest(testId, ctx);
      set({ test: res });
    } catch (err) {
      console.log(err);
    }
  },

  // test solutions

  solutions: new Set<string>(),
  setSolution: (questionId) => {
    set((state) => ({
      solutions: state.solutions.add(questionId),
    }));
  },
  removeSolution: (questionid) => {
    let wasRemoved = false;
    set((state) => {
      wasRemoved = state.solutions.delete(questionid);
      return { solutions: state.solutions };
    });
    return wasRemoved;
  },
}));
