import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {baseURL: "",}
const instance = axios.create(config);

type Question = {
  id:string;
  question: string;  
  questionImg: object;
  options: unknown[];
  answer: string;
  explanation: unknown[];
  category: string;
  complexity: string;
};

export const getQuestion = async (id:string) => {
  const res = await instance.get(`/question/${id}`);
  return res.data as Question;
};

export const postQuestion = async (data: FormData, ctx: AxiosHeaderValue) => { 
  const res = await instance.post<Question>("/question", data, { headers: { ctx: ctx }})
  return res.status;
}