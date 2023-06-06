import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:3100/api/",
};
// const config: AxiosRequestConfig = {
//   baseURL: "https://bteory-backend-production.up.railway.app/api/",
// };
const instance = axios.create(config);

export type Category = "practice" | "general" | "final";
export type Complexity = "easy" | "medium" | "hard";

export type QuestionType = {
  _id: string;
  question: string;
  questionImg: string;
  options: string[];
  answer: string;
  explanation: [
    {
      explanation: string;
      image: string;
      type: string;
    }
  ];
  category: Category;
  complexity: Complexity;
};

export type TestResult = {
  questionId: string;
  questionAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}[];

export type TestType = {
  _id: string;
  questionsId: string[];
  explanation: [
    {
      explanation: string;
      image: string;
      type: string;
    }
  ];
  category: Category;
  complexity: Complexity;
};

export const getAllQuestions = async () => {
  const res = await instance.get<QuestionType[]>("get-all-questions");
  return res.data;
};

export const postQuestion = async (data: FormData, ctx: AxiosHeaderValue) => {
  const res = await instance.post<QuestionType>("create-question", data, {
    headers: { ctx: ctx },
  });
  return res;
};

export const postTest = async (data: FormData, ctx: AxiosHeaderValue) => {
  const res = await instance.post("create-test", data, {
    headers: { ctx: ctx },
  });
  return res;
};

export const getTest = async (id: string, ctx: AxiosHeaderValue) => {
  const res = await instance.get<TestType>(`get-test/${id}`, {
    headers: { ctx: ctx },
  });
  return res.data;
};

export const getAllTest = async () => {
  const res = await instance.get<TestType>("get-all-test");
  return res.data;
};

export const deleteTestById = async (id: string, ctx: AxiosHeaderValue) => {
  const res = await instance.delete<TestType>(`delete/test/${id}`, {
    headers: { ctx: ctx },
  });
  return res.data;
};

export const postTestSolution = async (
  data: { testId: string; answers: string[] },
  ctx: AxiosHeaderValue
) => {
  const res = await instance.post<TestResult>("/create-test-result", data, {
    headers: { ctx: ctx },
  });
  return res.data;
};
