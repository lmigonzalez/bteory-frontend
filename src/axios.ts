import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {baseURL: "",}
const instance = axios.create(config);

type Question = { id: string };

export const getQuestion = async (quest:Question) => {
  const res = await instance.get(`/question/${quest.id}`);
  return res.data as Question;
};

export const postQuestion = async (data: Question, ctx: AxiosHeaderValue) => { 
  const res = await instance.post<Question>("/question", data, { headers: { ctx: ctx }})
  return res.status;
}