import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { getQuizApiResponse, Amount, Difficulty, Type, Question } from './api'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const Main = () => {
    useEffect(() => {
        async function fetchResponse() {
            const mcqs : Question = await getQuizApiResponse(Amount.TEN,Difficulty.EASY,Type.MULTIPLE)
            console.log(mcqs)
        }
        fetchResponse()
    }, [])
    return (<App />)
}

export default Main



if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}