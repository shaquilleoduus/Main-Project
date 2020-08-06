import React from 'react';

import axios from 'axios';


function Timer() {
    const [counter, setCounter] = React.useState(60);
  
    // Third Attempts
    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
    
    
    if(counter>0) {return (
      <div className="Timer">
        <h1 className="timer">Quiz time remaining: {counter}</h1>
      </div>
      
      )}else{return(
        window.confirm("Time is Up! Please try again!")
        // <h1>Time is up! please try again!</h1>
      )}
  }

  export default Timer;