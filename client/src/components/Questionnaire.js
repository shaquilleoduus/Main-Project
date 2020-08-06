import React from 'react';

const Questionnaire = ({
    showAnswers,
    handleAnswer,
    handleNextQuestion,
    data: {question, correct_answer, 
    answers},
}) => {
    
    console.log('this is ', correct_answer)

            return (
            <div>
                <div>
                    <h2>
                    {question}
                    </h2>
                </div>
                <div>
                    {answers.map((answer, idx) => {
                        const textColor = showAnswers
                            ? answer === correct_answer
                                ? 'text-green-500'
                                : 'text-red-500'
                            : 'text-purple-500';
                        return (
                            <button
                                key={idx}
                                className={textColor}
                                onClick={() => handleAnswer
                                (answer)}>
                                {answer} 
                            </button>
                    )})
            }          
        </div>
        {showAnswers && (
            <button onClick={handleNextQuestion}>
                Next Question
            </button>
        )}
        
    </div>
    
  );
};

export default Questionnaire;