import React, {useState, useEffect} from 'react';

import axios from 'axios';
import {DataFetch} from './components'

function Leaderboard(){
    return(
        <div> <DataFetch/> </div>
    )
}

export default Leaderboard