import React from "react"


export default function StartScreen(props){
    
    return(
        <main className="start--page">
            <div className="blob--yellow"></div>
            <h1 className="quizz">Quizzical</h1>
            <p className="description">Entertaining Quiz game</p>
            <button className="button--start" onClick={props.gameState}> Start quiz </button>
            <div className="blob--cyan"></div>     
        </main>
    )
}

