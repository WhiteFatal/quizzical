import React from "react"

export default function QuizzQuestions (props) {
    
    // console.log(props.rightAnswer);
    // console.log(buttonText);
                
    const answerButtons = props.answers.map((text, ind) => {
        
        let buttonColor = {}
        buttonColor ={backgroundColor: text.selection ? '#D6DBF5' : 'white'}
        if (props.score.displayScore && text.selection && text.correct) {
            buttonColor ={backgroundColor: '#94D7A2'}
        }
        if (props.score.displayScore && text.selection && text.correct === false) {
            buttonColor ={backgroundColor: '#F8BCBC'}
        }
        
        let newButtonId = text.id;       
        
        return (
            <button 
                style={buttonColor}
                key={`B${ind}`}
                className="quizz--buttons"
                id={newButtonId}
                onClick={() => props.selectAnswer(newButtonId)}
            >
            {text.answers.replace(/&#039;/g, "\'").replace(/&quot;/g, '\"').replace(/&ldquo;/g, "\“").replace(/&rsquo;/g, "\’").replace(/&rdquo;/g, "\”").replace(/&hellip;/g, "\…")}
            </button>
        )
    })           
            
    return (
        <div className="quizz--page">
            <p className="question--text">{props.question}</p>
            <div className="button-body">
                {answerButtons}
            </div>
            <hr />
        </div>
    )
}