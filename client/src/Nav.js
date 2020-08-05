import React from 'react';
import './nav.css';
import axios from 'axios';



function Nav() {

  return (
    
    <div class="topnav">

  <a href="/">Home</a>
  <a href="/register">Register</a>

  <div class="topnav-centered">
    <a href="/leaderboards" class="active">LeaderBoards</a>
  </div>

  <div class="topnav-right">
    <a href="/question">Quiz</a>
    <a href="/login">Login</a>
  </div>

</div>
  );
}


 


export default Nav;
