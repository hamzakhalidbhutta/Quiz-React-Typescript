import axios from "axios";
import { shuffleArray } from "../utils";


export type Question = { 
    category: string; 
    correct_answer:string; 
    incorrect_answers:string[]; 
    question:string;
    type:string;
}

export enum Amount {  ONE = 0, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN,}
export enum Category { ONE = 0, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN, SIXTEEN}
export enum Difficulty { EASY = "easy", MEDIUM = "medium", HARD = "hard"}
export enum Type {
  MULTIPLE = "multiple",
  TRUE_FALSE = "boolean",
}

function constructUrl(
  amount: Amount,
  difficulty: Difficulty,
  type: Type
): string {
  //
  //   const QUIZ_API = `https://opentdb.com/api.php?amount=${amount}&category=10&difficulty=${difficulty}&type=${type}`;
  const QUIZ_API = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
  return QUIZ_API;
}
async function fetchResponse(url: string) {
  const {
    data: { results: questions },
  } = await axios.get(url);
  return questions;
}
function fetchApi(amount: number, difficulty: Difficulty, type: Type) {
  const QUIZ_URL = constructUrl(amount, difficulty, type);
  return fetchResponse(QUIZ_URL);
}

export const getQuizApiResponse = async (
  amount: number,
  difficulty: Difficulty,
  type: Type
)  => {
  const QUIZ_API_RESPONSE = await fetchApi(amount, difficulty, type);

  const quizQuestions = await QUIZ_API_RESPONSE.map(
    (v: any, i: number): any => ({
      quiz_question: v.question,
      correct_answer: v.correct_answer,
      answers: shuffleArray([...v.incorrect_answers,v.correct_answer]),
    })
  );

//   const quizQuestions = await {
//     question: QUIZ_API_RESPONSE.map((v: any, i: number): any => v.question),
//     correct_answer: QUIZ_API_RESPONSE.map(
//       (v: any, i: number): any => v.correct_answer
//     ),
//     incorrect_answer: QUIZ_API_RESPONSE.map(
//       (v: any, i: number): any => v.incorrect_answers
//     ),
//   };

  return quizQuestions;
};
