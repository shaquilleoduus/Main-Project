import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

function Login({setLoginStatus, history, setUserId}) {

    const [registerDetails, setRegisterDetails] = useState({
      userEmail: '',
      userPassword: ''
    });

    const [message, setMessage] = useState ({
      message: ''
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
        userEmail: registerDetails.userEmail,
        userPassword: registerDetails.userPassword
      });
  
   
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      
      const resu = await axios.post("/login", body, config)
        setMessage({
          message:resu.data
        })
        if(resu.data[0] == "You are logged in"){
          setLoginStatus(true)
          setUserId(resu.data[1])
          history.push('/questionCategory')
      }

    }
  


    return (
      <div>
        <h1>Please log in to start the quiz!</h1>
      
        <form>
          <input type="email" name="userEmail" onChange={setData} placeholder="Email"/>
          <input type="password" name="userPassword" onChange={setData} placeholder="Password"/>
          <button type="submit" onClick={submitForm}>login</button>
        <h1>{message.message}</h1>
        </form>
      </div>
    );
}

export default withRouter(Login);