import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {Questionnaire} from './components';

function Question({loginStatus, userId, category, difficult}) {
  const [questions, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  

  useEffect( () => {
    getAPI();
    console.log("Page Loaded");
  }, [loginStatus])

  const getAPI = async() => {
    const res = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficult}&type=multiple`)
    console.log(res.data);  //res.data.value

    const questions = res.data.results.map((question) =>
    ({
      ...question, answers: [question.correct_answer,
      ...question.incorrect_answers
    ].sort(() => Math.random() - 0.5),
    }));
    setQuestion(questions);
  }

  const handleAnswer = (answer) => {
    let newScore = score + 1
    if(!showAnswers) {
      if(answer === questions[currentIndex].
        correct_answer) {
          
          setScore(newScore);
      
      }
    }
    setShowAnswers(true);
    
  };
    // if(newIndex >= questions.length) {
    //     setGameEnded(true);
    // }
  const handleNextQuestion = () => {
    if (currentIndex+1 >= questions.length){
      fetch('/update/'+userId +"/"+score, {method:'POST'})
          .then(res=>res.text())
          .then(text=>alert(text))
    }
    setShowAnswers(false);
    setCurrentIndex(currentIndex + 1);
  };
  return(
    loginStatus
  ?
      questions.length > 0 
    ? 
      <div>
        {
          currentIndex >= questions.length 
        ? 
          <h1>
            Your Score is {score}.
          </h1>
        :  
          <Questionnaire 
            data={questions[currentIndex]}
            showAnswers={showAnswers}
            handleNextQuestion={handleNextQuestion}
            handleAnswer= {handleAnswer} 
          />
        }  
      </div>
      
    : 
      <h1>Your Question Loading</h1>
  :
    <h1>You need to login before starting the quiz</h1>
  )
}
export default Question;