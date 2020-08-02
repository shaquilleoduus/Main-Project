import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

function Login() {

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
        console.log(resu);
        setMessage({
          message:resu.data
        })
        if(resu.data == "You are logged in"){
          window.open('/questions')
      }

    }
  


    return (
      <div>
        <h1>Please log in to start the quiz!</h1>
      
        <form>
          <input type="email" name="userEmail" onChange={setData}/>
          <input type="password" name="userPassword" onChange={setData}/>
          <button type="submit" onClick={submitForm}>login</button>
        <h1>{message.message}</h1>
        </form>
      </div>
    );
}

export default Login;