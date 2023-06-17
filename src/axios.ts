import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:8100/api/",
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
  try {
    const res = await instance.post("create-test", data, {
      headers: { Authorization: auth },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getTest = async (id: string, auth: AxiosHeaderValue) => {
  try {
    const res = await instance.get<TestType>(`get-test/${id}`, {
      headers: { Authorization: auth },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllTest = async () => {
  try {
    const res = await instance.get<TestType[]>("get-all-test");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTestById = async (id: string, auth: AxiosHeaderValue) => {
  try {
    const res = await instance.delete<TestType>(`delete/test/${id}`, {
      headers: { Authorization: auth },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const postTestSolution = async (
  data: { testId: string; answers: string[] },
  auth: AxiosHeaderValue
) => {
  try {
    const res = await instance.post<TestResult>("/create-test-result", data, {
      headers: { Authorization: auth },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

// Admins

export const getAllAdmins = async () => {
  try {
    const res = await instance.get("get-admins");

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const createAdmin = async (newAdmin: {}) => {
  try {
    await instance.post("create-admin", newAdmin);
    console.log("Admin created");
  } catch (e) {
    console.log(e);
  }
};

export const updateAdmin = async (_id: string, level: string) => {
  try {
    await instance.patch(`patch-admin/${_id}`, { level });
  } catch (e) {
    console.log(e);
  }
};

export const deleteAdmin = async (_id: string) => {
  try {
    await instance.delete(`delete-admin/${_id}`);
    return "deleted";
  } catch (e) {
    console.log(e);
  }
};
