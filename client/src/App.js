import React, {useState, useEffect} from 'react';
import './App.css';
import Nav from './Nav'
import About from './About'
import Register from './Register'
import Login from './Login'
import Question from './Question'
import questionCategory from './components/questionCategory';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Selection from './Selection';
import axios from 'axios';

function App(){

  
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/question" component={Question} />
        <Route path="/questioncategory" component={questionCategory} />
        <Route path="/selection" component={Selection} />
      </div>
    </Router>
  );
};

export default App;
