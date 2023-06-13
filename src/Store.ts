import { create } from "zustand";
import {
  type QuestionType,
  getAllQuestions,
  type TestType,
  getTest,
  postTestSolution,
  type TestResult,
  deleteQuestion,
} from "./axios";
import { type AxiosHeaderValue, AxiosHeaders } from "axios";

type state = {
  questions: QuestionType[];
  setQuestions: () => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  test: TestType;
  setTest: (testId: string, auth: AxiosHeaderValue) => Promise<void>;
  solutions: Set<string>;
  touchSolution: (questionId_i: string) => void;
  flags: Set<string>;
  touchFlag: (questionId: string) => void;
  evaluation: TestResult;
  sendSolution: (data: {
    testId: string;
    solutions: Set<string>;
  }) => Promise<void>;
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
  deleteQuestion: async (id) => {
    try {
      const res = await deleteQuestion(id);
    } catch (error) {}
  },

  // test
  test: {
    _id: "",
    questionsId: [],
    explanation: [{ type: "text", explanation:"No Explanation"}],
    category: "practice",
    complexity: "easy",
    testName: "",
  },
  setTest: async (testId: string, ctx: AxiosHeaderValue) => {
    try {
      const res = await getTest(testId, ctx);
      set({ test: res });
    } catch (err) {
      console.log(err);
    }
  },

  // test solutions

  solutions: new Set<string>(),

  touchSolution: (questionId_i) => {
    console.log(questionId_i);
    set((state) => {
      if (state.solutions.has(questionId_i)) {
        state.solutions.forEach((item) => {
          if (item.split("-")[0] === questionId_i.split("-")[0])
            state.solutions.delete(item);
        });
        return { solutions: state.solutions };
      } else {
        state.solutions.forEach((item) => {
          if (item.split("-")[0] === questionId_i.split("-")[0])
            state.solutions.delete(item);
        });
        console.log(state.solutions);
        return {
          solutions: state.solutions.add(questionId_i),
        };
      }
    });
  },

  // flags

  flags: new Set<string>(),
  touchFlag: (questionId) =>
    set((state) => ({
      flags: state.flags.delete(questionId)
        ? state.flags
        : state.flags.add(questionId),
    })),

  evaluation: [],

  sendSolution: async (data) => {
    const settedData: string[] = [];
    data.solutions.forEach((item) => settedData.push(item));
    const createData = { testId: data.testId, answers: settedData };
    try {
      const res = await postTestSolution(createData, new AxiosHeaders());
      set({ evaluation: res });
    } catch (err) {
      console.log(err);
    }
  },
}));
