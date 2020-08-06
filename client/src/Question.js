import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {Questionnaire} from './components';

function Question({
  category, difficult
}) {
  const [questions, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect( () => {
    getAPI();
    console.log("Page Loaded");
  }, [])

  const getAPI = async() => {

    const Url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficult}&type=multiple`
    
    const res = await axios.get(Url)
    console.log(Url)
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
    if(!showAnswers) {
    

      if(answer === questions[currentIndex].
        correct_answer) {
          setScore(score + 1);
      }
    }

    setShowAnswers(true);
  };
    // if(newIndex >= questions.length) {
    //     setGameEnded(true);
    // }
  const handleNextQuestion = () => {
    setShowAnswers(false);

    setCurrentIndex(currentIndex + 1);
  };
  

  return questions.length > 0 ? (
    <div>
      {currentIndex >= questions.length ? (
        <h1>
          Your Score was {score}.
        </h1>
      
      ) : (
        <Questionnaire 
            data={questions[currentIndex]}
            showAnswers={showAnswers}
            handleNextQuestion={handleNextQuestion}
            handleAnswer= {handleAnswer} />
      )}  
    </div>
  ): (
      <h1>Keep Calm Your Questions are Loading</h1>
  );
    
}

export default Question;