import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function Register() {
  
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
    <div>
      <h1>Hello From Register</h1>
    
      <form>
        <input type="text" name="userName" onChange={setData}/>
        <input type="email" name="userEmail" onChange={setData}/>
        <input type="password" name="userPassword" onChange={setData}/>
        <button type="submit" onClick={submitForm}>Register</button>
      </form>
    </div>
  );
}

export default Register;
