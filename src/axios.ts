import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from "axios";

// const config: AxiosRequestConfig = {
//   baseURL: "http://localhost:8100/api/",
// };
const config: AxiosRequestConfig = {
  baseURL: "https://bteory-backend-production.up.railway.app/api/",
};
const instance = axios.create(config);

export type Category = "practice" | "general" | "final";
export type Complexity = "easy" | "medium" | "hard";

export type QuestionType = {
  _id: string;
  question: string;
  questionImg: string;
  options: string[];
  answer: string;
  explanation: (
    | {
        explanation: string;
        type: "text";
      }
    | {
        content: string;
        image: string;
        type: "image";
      }
  )[];
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
  testName: string;
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

export const postQuestion = async (data: FormData, auth: AxiosHeaderValue) => {
  const res = await instance.post<QuestionType>("create-question", data, {
    headers: { Authorization: auth },
  });
  return res;
};

export const deleteQuestion = async (id: string) => {
  // const res = await instance.delete(,id)
};

export const postTest = async (data: FormData, auth: AxiosHeaderValue) => {
  const res = await instance.post("create-test", data, {
    headers: { Authorization: auth },
  });
  return res;
};

export const getTest = async (id: string, auth: AxiosHeaderValue) => {
  const res = await instance.get<TestType>(`get-test/${id}`, {
    headers: { Authorization: auth },
  });
  return res.data;
};

export const getAllTest = async () => {
  const res = await instance.get<TestType[]>("get-all-test");
  return res.data;
};

export const deleteTestById = async (id: string, auth: AxiosHeaderValue) => {
  const res = await instance.delete<TestType>(`delete/test/${id}`, {
    headers: { Authorization: auth },
  });
  return res.data;
};

export const postTestSolution = async (
  data: { testId: string; answers: string[] },
  auth: AxiosHeaderValue
) => {
  const res = await instance.post<TestResult>("/create-test-result", data, {
    headers: { Authorization: auth },
  });
  return res.data;
};
