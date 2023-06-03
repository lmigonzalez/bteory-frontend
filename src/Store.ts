import { create } from "zustand"
import { type QuestionType,getAllQuestions } from "./axios";

type state = {
  questions: QuestionType[],
  getQuestions:() => Promise<void>
}

export const globalState = create<state>()((set) => ({
  questions:[],
  getQuestions: async () => {
    try {      
      const res = await getAllQuestions()
      set({questions:res})
    } catch (err) {
      console.log(err)
    }    
  }
}));