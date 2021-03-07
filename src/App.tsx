import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';


const App = (props: any) => {



  return (
    <div className="App">
      {
        (!props.ready && !props.showResult) ?
          <div>

            <Card variant="outlined" className="card">
              <CardContent>

                <Typography variant="h5" component="h2">
                  Quiz
                 </Typography>
                 <br />
                <Typography color="textSecondary">
                  Rules
                </Typography>
                <Typography variant="body2" component="p">
                  There will be 10 question. You have to finish the quiz within the 10 mins.
          <br />
                  <br />
                  {'"Click Start Button to Start Quiz"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={(e) => {
                  e.preventDefault();
                  props.startQuiz(true);
                }}>Start</Button>
              </CardActions>
            </Card>
          </div>
          :

          (props.showResult) ?
            <h1>Your Score is :{props.scores}</h1>

            : null

      }

      {props.children}

    </div>
  )
}

export default App;
