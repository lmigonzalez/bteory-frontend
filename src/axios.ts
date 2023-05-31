import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {baseURL: "http://pools-cosmetics.up.railway.app/api",}
const instance = axios.create(config);

type Question = { id: string };

export const getQuestion = async (quest:Question) => {
  const res = await instance.get(`/question/${quest.id}`);
  return res.data as Question;
};

export const postQuestion = async (ctx: AxiosHeaderValue, quest: Question) => { 
  const config: AxiosRequestConfig<Question> = { headers: { ctx: ctx }}
  const res = await instance.post<Question>("/question", quest, config)
  return res.status;
}