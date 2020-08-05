import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function Register() {
  
  const [registerDetails, setRegisterDetails] = useState({
    userName: '',
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
      userName:  registerDetails.userName,
      userEmail: registerDetails.userEmail,
      userPassword: registerDetails.userPassword,
      confirmPassword: registerDetails.confirmPassword
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const resu = await axios.post("/register", body, config)
      console.log(resu);
      setMessage({
        message:resu.data
      })
  }

  return (
    <div>
      <h1>Welcome! Please register to join Hotline Quiz!</h1>
    
      <form>
        <input placeholder="Username"type="text" name="userName" onChange={setData}/>
        <input placeholder="Email" type="email" name="userEmail" onChange={setData}/>
        <input placeholder="Password" type="password" name="userPassword" onChange={setData}/>
        <input placeholder="Confirm Password" type="password" name="confirmPassword" onChange={setData}/>
        <button id="button2" type="submit" onClick={submitForm}>Sign up!</button>
        <h1>{message.message}</h1>
      </form>
    </div>
  );
}

export default Register;
