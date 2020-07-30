import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {Questionnaire} from './components';

function Question() {
  const [questions, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect( () => {
    getAPI();
    console.log("Page Loaded");
  }, [])

  const getAPI = async() => {
    const res = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple')
    console.log(res.data);  //res.data.value

    setQuestion(res.data.results);
    
  }

  const handleAnswer = (answer) => {
      const newIndex = currentIndex +1
    setCurrentIndex(newIndex);

    if(answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
    }

    if(newIndex >= questions.length) {
        setGameEnded(true);
    }
  };

  return gameEnded ? (
  <h1>Your Score was {score}</h1>
      
   ) : (
    questions.length > 0 ? (
    <div className='question_container'>
        <Questionnaire 
            data={questions[currentIndex]} 
            handleAnswer= {handleAnswer} />   
    </div>
  ): (
      <h1>Your Question Loading</h1>
  ));
    
}

export default Question;