import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetch() {
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
       

    // useEffect(()=>{
    //     axios.get("/Leaderboards")
    //     .then(res =>{
    //         console.log(res)
    //         // setPosts(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // })
    
    return (
        <div>
            <ul>{
                user.map(u => <li >{u.name}:{u.score}</li>)
            }
            </ul>
        </div>
    )
}

export default DataFetch
