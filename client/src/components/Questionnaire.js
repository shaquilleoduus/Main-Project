import React from 'react';

const Button = ({ answer }) => (
    <button>{answer}</button>
);

const Questionnaire = ({
    handleAnswer, 
    data: {question, correct_answer, 
    incorrect_answers},
}) => {
    const shuffledAnswer = [correct_answer, ...
    incorrect_answers].sort(
        () => Math.random() - 0.5
    );

    return (
    <div>
        <div>
            <h2>
              {question}
            </h2>
        </div>
        <div>
            <Button 
                onClick={() => 
                handleAnswer
                (shuffledAnswer[0])} 
                answer ={shuffledAnswer[0]} 
            />
            <Button 
                onClick={() => handleAnswer
                (shuffledAnswer[1])} 
                answer ={shuffledAnswer[1]} 
            />
            <Button 
                onClick={() => handleAnswer
                (shuffledAnswer[2])} 
                answer ={shuffledAnswer[2]} 
            />
            <Button 
                onClick={() => handleAnswer
                (shuffledAnswer[3])} 
                answer ={shuffledAnswer[3]} 
            />
        </div>
    </div>
    
)};

export default Questionnaire;

