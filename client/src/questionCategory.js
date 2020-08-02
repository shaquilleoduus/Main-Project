import React, {useState, useEffect} from 'react';
import './App.css';
import ReactDom from "react-dom";
import Select from 'react-select';
import axios from 'axios';

function QuestionCategory() {

    const [category, setCategory] = useState([]);
    const [difficult, setDifficult] = useState({});
  
    const anyCategory = [
        {value: '12', label: 'Music'},
        {value: '21', label: 'Sport'},
        {value: '24', label: 'Politics'},
    ];
    const anyDifficult = [
        {value: 'easy', label: 'Easy'},
        {value: 'medium', label: 'Medium'},
        {value: 'hard', label: 'Hard'},
    ];

    function customTheme(theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'orange',
                primary: 'green',
            },
        };
    }

    return (   
        <div>    
        <Select 
        theme={customTheme}
        options={anyCategory}
        onChange={setCategory}
        className="mb-3"
        placeholder="Select Category"
        />
        <Select 
            theme={customTheme}
            options={anyDifficult}
            onChange={setDifficult}
            className="mb-3"
            placeholder="Select Difficulty"
            isSearchable
        />
        
        </div>
    )    
        
    
    
}
export default QuestionCategory;