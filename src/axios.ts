import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "https://bteory-backend-production.up.railway.app/api/",
};
const instance = axios.create(config);

type Question = {
  id: string;
  question: string;
  questionImg: object;
  options: unknown[];
  answer: string;
  explanation: unknown[];
  category: string;
  complexity: string;
};

export const getAllQuestions = async () => {
  const res = await instance.get<Question[]>("get-all-questions");
  return res.data;
};

export const postQuestion = async (data: FormData, ctx: AxiosHeaderValue) => {
  const res = await instance.post<Question>("create-question", data, {
    headers: { ctx: ctx },
  });
  return res;
};
