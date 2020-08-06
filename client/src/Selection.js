import React from 'react';
import questionCategory from './components/questionCategory';
import axios from 'axios';
const request = require('request');


function Selection() {

    axios.get("/questioncategory", (req, res) => {
        res.render("questioncategory");
    });
   
    axios.get("/question", (req, res) => {
       const category = req.query.category;
       const difficult = req.query.difficult;
       
       const cityUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficult}&type=multiple` ;
   
        request ( { url: cityUrl, json: true}, (error, response) => {
            console.log(response)
   
           if(response.error) {
               res.render('index', {
                   city: "Sorry that City does not exist",
                   temp: "Sorry can't ready temperature of the City",
                          
            });
           }else {
               res.render('/');
           };
       });
    })
    
   

    return (
        <h1>Inside Selection</h1>
    )

        
    
}
export default Selection;