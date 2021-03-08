import React, {
    useEffect,
} from 'react'
import moment from 'moment';
import { Card, Grid, CardContent, Button, Typography } from '@material-ui/core';

interface IProps {
    interval:any,
    seconds:any;
    startQuiz: any;
    question: any;
    questionNumber: any;
    currentQuestion: any;
    storeAnswers: any;
    ready: boolean;
}

const QuestionCard = ({interval, seconds, startQuiz, question, questionNumber, currentQuestion, storeAnswers, ready }: IProps) => {


useEffect(() => {
    interval()
}, [interval])



return (
    <>
        {
            (ready) ?
                (
                    <Card variant="outlined" className="card">

                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>{moment.utc(seconds * 1000).format('HH:mm:ss')}</Typography>
                            {
                                question.map((v: any, i: number) =>
                                    (i === questionNumber && seconds > 0) ?
                                        (
                                            <div key={i}>

                                                <Typography color="textSecondary" gutterBottom>
                                                    {questionNumber + 1}. {v.quiz_question}
                                                </Typography>
                                                {
                                                    v.answers.map((v: any, j: number) =>
                                                    (<div key={j}>
                                                        <Button variant="contained" fullWidth color="primary" value={v[0]} onClick={(e) => { e.preventDefault(); storeAnswers(v[0]) }} >  {v[0]}</Button>
                                                        <br />  <br />
                                                        <Button variant="contained" fullWidth color="primary" value={v[1]} onClick={(e) => { e.preventDefault(); storeAnswers(v[1]) }} >  {v[1]}</Button>
                                                        <br />
                                                        <br />
                                                        <Button variant="contained" fullWidth color="primary" value={v[2]} onClick={(e) => { e.preventDefault(); storeAnswers(v[2]) }} >  {v[2]}</Button>
                                                        <br />  <br />
                                                        <Button variant="contained" fullWidth color="primary" value={v[3]} onClick={(e) => { e.preventDefault(); storeAnswers(v[3]) }} >  {v[3]}</Button>
                                                        <br />  <br />
                                                    </div>
                                                    ))
                                                }
                                                <br />
                                                <Grid container spacing={3}>
                                                    <Grid item xs={8}>
                                                        <Button onClick={(e) => { e.preventDefault(); currentQuestion(false); }}>Previous</Button>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Button onClick={(e) => { e.preventDefault(); currentQuestion(true); }}>Next</Button>
                                                    </Grid>
                                                </Grid>
                                            </div>

                                        ) : null
                                )
                            }
                            <Button variant="contained" fullWidth onClick={(e) => { e.preventDefault(); startQuiz(false); }}>Finish</Button>
                        </CardContent>
                    </Card>) :
                null

        }



    </>
)

}


export default QuestionCard
