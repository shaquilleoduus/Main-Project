import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Login from './login';

function App() {
  const [userDetails, setUserDetails] = useState({
    category: '',
    question: '',
    answer: '',
    difficulty: ''
  });

  useEffect( () => {
    getAPI();
    console.log("Page Loaded");
  }, [])

  const getAPI = async() => {
    const res = await axios.get('https://opentdb.com/api.php?amount=5&category=3&difficulty=hard&type=multiple')
    console.log(res.data);  //res.data.value

    setUserDetails({
      category: res.data.results.category,
      question: res.data.results.question,
      answer: res.data.results.incorrect_answers,
      difficulty: res.data.results.difficulty
    });
  }

  const [registerDetails, setRegisterDetails] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });

  const setData = (e) => {
      setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = async(e) => {
    e.preventDefault();
    console.log("inside submission");

    const body = JSON.stringify({
      userName:  registerDetails.userName,
      userEmail: registerDetails.userEmail,
      userPassword: registerDetails.userPassword
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const resu = await axios.post("/register", body, config)
      console.log(resu);
  }

  return (
    <div className="App">
      <h1>Hello From React</h1>
      <h4>Category: {userDetails.category}</h4>
      <h4>Question: {userDetails.question}</h4>
      <h4>Answer: {userDetails.answer}</h4>
      <h4>Difficulty: {userDetails.difficulty}</h4>

      <form>
        <input type="text" name="userName" onChange={setData}/>
        <input type="email" name="userEmail" onChange={setData}/>
        <input type="password" name="userPassword" onChange={setData}/>
        <button type="submit" onClick={submitForm}>Register</button>
      </form>
    </div>
  );
}

export default App;
