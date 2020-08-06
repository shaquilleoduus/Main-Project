import React, {useState, useEffect} from 'react';
import './App.css';
import Nav from './Nav'
import About from './About'
import Register from './Register'
import Login from './login'
import Question from './Question'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';


import LeaderBoards from "./LeaderBoards.js";

function App(){
let [loginStatus, setLoginStatus] = useState(false)
let [userId, setUserId] = useState(false)


  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/leaderboards" component={LeaderBoards} />
       
        <Route path='/login'>
          <Login setLoginStatus={setLoginStatus} setUserId={setUserId}/>
        </Route>
        <Route path="/question">
          <Question loginStatus={loginStatus} userId={userId} />
        </Route>
      </div>
    </Router>
  );
};

export default App;
