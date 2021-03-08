import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './scss/index.scss'
import { getQuizApiResponse, Amount, Difficulty, Type, RefinedQuestion } from './api'
import QuestionCard from "./components/QuestionCard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const Main = () => {

    const [ready, setReady] = useState(false);

    const [questions, setQuestion] = useState<RefinedQuestion[]>()

    const [questionNumber, setQuestionNumber] = useState(0)

    const [scores, setScores] = useState(0)

    const [scoresWithAnswers, setScoresWithAnswers] = useState<any[]>([])

    let answerArray: any[] = [];

    const [showResult, setShowResult] = useState(false)



    useEffect(() => {
        async function fetchResponse() {
            setQuestion(await getQuizApiResponse(Amount.TEN, Difficulty.EASY, Type.MULTIPLE))
        }
        fetchResponse()
    }, [])

    const [seconds, setSeconds] = useState(0);

    const interval = () => {
        setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }
        }, 1000);
    }




    function resultMaintain() {
        if (questions) {
            questions.map((v: any, i: number) => {
                return (answerArray.push({ quest: i, answer: "" }))
            }
            )
            setScoresWithAnswers(answerArray)

        }
    }
    function quizResult() {
        if (questions) {
            let s = 0;
            questions.map((v: any, i: number) => {
                if (v.correct_answer === scoresWithAnswers[i].answers) {
                    s = s + 1
                    return (setScores(s))

                } else {
                    return null;
                }


            })
        }
    }
    function currentQuestion(isNext: boolean) {
        if (questions) {
            if (isNext) {
                setQuestionNumber((questionNumber >= 0 && questionNumber <= questions.length) ? questionNumber + 1 : questions.length)
            } else {
                setQuestionNumber((questionNumber > 0 && questionNumber <= questions.length) ? questionNumber - 1 : 0)
            }
        }
    }
    function storeAnswers(answer: string) {
        answerArray = [...scoresWithAnswers]
        answerArray[questionNumber].answers = answer
        setScoresWithAnswers(answerArray)

    }
    function startQuiz(opt: boolean) {
        if (opt) {
            resultMaintain();
            setReady(opt)
            setSeconds(600)
        }
        else {
            quizResult()
            setReady(opt)
            setShowResult(true)
            setSeconds(0)

        }
    }

    return (
        <>
            {     (questions) ?

                <Router>
                    <App startQuiz={startQuiz} question={questions} questionNumber={questionNumber} scores={scores} showResult={showResult} storeAnswers={storeAnswers} ready={ready} >
                        <Routes>
                            {
                                ready ?
                                    <Route path="/" element={<QuestionCard interval={interval} seconds={seconds} startQuiz={startQuiz} question={questions} questionNumber={questionNumber} currentQuestion={currentQuestion} storeAnswers={storeAnswers} ready={ready} />} />
                                    : null
                            }
                        </Routes>
                    </App>
                </Router>
                :
                <h1>Hey!! There welcome onboard for your quiz and good luck.</h1>
            }
        </>
    )
}


export default Main



if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}

