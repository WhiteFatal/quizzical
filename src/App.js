import React from "react"
import StartScreen from "./StartScreen.js"
import MainQuizz from "./MainQuizz.js"

export default function App (){
    const [gameState, gameStateSet] = React.useState(true)
    const [data, dataSet] = React.useState({})
    const [score, scoreSet] = React.useState({
        displayScore: false,
        correctAnswers: 0,
        qustionsNumber: 0,
        })
        
    // API links for different questions:        
        //https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple
        //https://opentdb.com/api.php?amount=5&difficulty=medium
        //https://opentdb.com/api.php?amount=5&type=multiple
    
    
    React.useEffect(function() {
        fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`)
            .then(res => res.json())
            .then(data => dataSet(data.results))
    }, [])
    
    function arrangeFinalData() {                
        let arrObj = data.map((fulldata, ind) => { 
            let answersData = [
                {
                   id: `Q${ind}B0`,
                   answers: fulldata.correct_answer,
                   selection: false,
                   correct: true
                },
                {
                   id: `Q${ind}B1`,
                   answers: fulldata.incorrect_answers[0],
                   selection: false,
                   correct: false
                },
                {
                   id: `Q${ind}B2`,
                   answers: fulldata.incorrect_answers[1],
                   selection: false,
                   correct: false
                },
                {
                   id: `Q${ind}B3`,
                   answers: fulldata.incorrect_answers[2],
                   selection: false,
                   correct: false
                }, 
            ]
            
            answersData = shuffleArray(answersData);
            
            delete fulldata.category;
            delete fulldata.type;
            delete fulldata.difficulty;
            delete fulldata.incorrect_answers
            delete fulldata.correct_answer
            return {
                ...fulldata,
                answersData
            }
           }   
        )
        dataSet(arrObj) 
    }
    
    function shuffleArray(array) {
        for (let i = 0; i < 10; i++) {
            array.sort(() => Math.random() - 0.5);
        }
        return array;
    }
    
    function selectButton(id) {
        let arrObj = data.map((fulldata, ind) => {
           for (let i = 0; i < fulldata.answersData.length; i++) {
                if (fulldata.answersData[i].id === id) {
                    fulldata.answersData[i].selection = !fulldata.answersData[i].selection
                } 
           }
           return  {...fulldata}          
        })
        dataSet(arrObj)
    }
    
    function startGame() {
        arrangeFinalData();
        gameStateSet(gameStart => !gameStart)   
    }
    
    function checkAnswers() {
        if (score.displayScore) {
            document.location.reload();
        }       
        //console.log(data[0].answersData);
        let countAnswers = data.filter(function (fulldata, ind) {
            //console.log(ind)
            for (let i = 0; i < fulldata.answersData.length; i++) {
                let filteArnswer = fulldata.answersData[i].correct && fulldata.answersData[i].selection
                if (filteArnswer) return true 
            }
            return false;
        })  
        // console.log('countAnswers:');
        // console.log(countAnswers);
        scoreSet({    
            displayScore: true,
            correctAnswers: countAnswers.length,
            qustionsNumber: data.length
        })
    }
    
    return (
        <div>
            {gameState ?
                <StartScreen gameState={() => startGame()} /> : 
                <MainQuizz 
                    data={data}
                    selectButton={selectButton}
                    checkAnswers={checkAnswers}
                    score={score}
                />
            }
        </div>
    )
}