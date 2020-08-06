import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import DataFetch from './DataFetch'

function Leaderboard(){
    return(
        <div> <DataFetch/> </div>
    )
}

export default Leaderboard