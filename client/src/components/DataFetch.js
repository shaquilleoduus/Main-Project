import React, {useState, useEffect} from 'react'
import axios from 'axios'


function DataFetch() {
    // const user =  User.find().sort({ score: -1}) 
    const[user,setPosts] = useState([])
    console.log("Working")
     axios.get("/Leaderboards")
        .then(res =>{
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
       
        // let users = await User.find().sort({ score: -1})
    
    return (
        
        <div>
            <h1>High Scores</h1>
            <ol>{
                user.map(u => <li >UserName: {u.name} - Highscore: {u.score}</li>)
            }
            </ol>
        </div>
    )
}

export default DataFetch
