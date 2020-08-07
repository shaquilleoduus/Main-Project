import React, {Component, useState, useEffect} from 'react';
import Question from '../Question';
import {Redirect} from "react-router-dom";


import axios from 'axios';

function QuestionCategory({loginStatus, userId}) {

    const [category, setCategory] = useState("");
    const [difficult, setDifficult] = useState("");
    const [showQuestion, setShowQuestion] = useState({
        optionsSelected: false,
        questions: false
    });
  

    const updateCategory = (e)=> {
        //console.log(e.target.value)
        setCategory(e.target.value)
    }

    const updateDifficult = (e)=> {
       // console.log(e.target.value)
        setDifficult(e.target.value)
    }

    const submitForm =(e) => {        
        e.preventDefault();
        console.log(category)
        console.log(difficult)
        console.log(loginStatus)
        console.log(userId)

    
        
       // console.log(window.location.href)
        // window.history.pushState({
        //     "category/difficult": `${category}/${difficult}`
        // },"question",buildUrl())
       
       setShowQuestion({
           optionsSelected: true,
           questions: true
       })
       
       
    }

    //const buildUrl = () => `/question/${category}/${difficult}`;

    // if() {
    //   return  <Redirect to="/question"/>
    // }

    if(showQuestion.optionsSelected && showQuestion.questions) {
        return (
            <Question 
            category={category} 
            difficult={difficult}
            loginStatus={loginStatus} 
            userId={userId}
            />
        )
    } else {

    
        return (   
            loginStatus
            ?
            <div>   
                <form>
                <select onChange={updateCategory} placeholder="Select Category">
                    <option value="">Select Question Category</option>
                    <option value="12">Music</option>
                    <option value="21">Sport</option>
                    <option value="24">Politics</option>
                </select>

                <select onChange={updateDifficult} placeholder="Select Difficulty">
                    <option value="">Select Question Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button type="submit" onClick={submitForm}>Submit Selection</button>
                </form> 
            
            </div>

            
        
        :
    <h1>You need to login before starting the quiz</h1>
        )
    }
        
    
    
}
export default QuestionCategory;