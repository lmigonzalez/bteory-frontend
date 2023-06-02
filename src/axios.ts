import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from "axios";
import { type } from "os";

// const config: AxiosRequestConfig = {
//   baseURL: "http://localhost:3100/api/",
// };
const config: AxiosRequestConfig = {
  baseURL: "https://bteory-backend-production.up.railway.app/api/",
};
const instance = axios.create(config);

export type QuestionType = {
  id: string;
  question: string;
  questionImg: string;
  options: unknown[];
  answer: string;
  explanation: unknown[];
  category: string;
  complexity: string;
};

export type Test = {
  id: string;
  questions: QuestionType[];  
}

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
export const getQuestion = async (id:string, ctx: AxiosHeaderValue) => {
  const res = await instance.get<QuestionType>("get-question/id",{
    headers: { ctx: ctx },
  });
  return res.data;
};

export const getTest = async (id:string, ctx: AxiosHeaderValue) => {
  const res = await instance.get<Test>("get-test/id",{
    headers: { ctx: ctx },
  });
  return res.data;
};



