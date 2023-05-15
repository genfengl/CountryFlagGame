import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase-config'

const Game = ({ countryList }) => {
    // user information from AuthContext
    const { currentUser, currentDisplayName, currentProfileFlagCode } = useContext(AuthContext)
    // useNavigate
    const navigate = useNavigate()
    // states for the starting procedures
    const [gameStart, setGameStart] = useState(false)
    const [gameFinish, setGameFinish] = useState(true)
    const [firstGame, setFirstGame] = useState(true)
    const [startCountdown, setStartCountdown] = useState(3)
    const [gameCountdown, setGameCountdown] = useState(60)

    // states for the actual game itself
    const [flagCountryCodes, setFlagCountryCodes] = useState([])
    const [correctCountryCode, setCorrectCountryCode] = useState()
    const [disableAnswer, setDisableAnswer] = useState(false)

    // states for scorekeeping
    const [score, setScore] = useState(0)
    const [attemptedQuestion, setAttemptedQuestion] = useState(0)
    const [scoreSaved, setScoreSaved] = useState(false)

    // states for background color effect of answers
    const [answerIncorrect, setAnswerIncorrect] = useState([
        0, 0, 0, 0
    ])
    const [answerCorrect, setAnswerCorrect] = useState([
        0, 0, 0, 0
    ])

    const countryCode = Object.keys(countryList)

    // start button click
    const handleStartButtonClick = () => {
        setStartCountdown(3)
        setGameCountdown(60)
        setAttemptedQuestion(0)
        setScore(0)
        setGameStart(true)
        setGameFinish(false)
        setFirstGame(false)
        setScoreSaved(false)
    }

    // Go Back button click
    const handleGoBackButtonClick = () => {
        navigate('/')
    }

    // a countdown timer for gamestart
    const gameStartTimer = setInterval(() => {
        if (gameStart === true && startCountdown > 0) {
            setStartCountdown(startCountdown - 1)
            clearInterval(gameStartTimer)
        }
    }, 1000)

    // a countdown timer for the game itself: 60 seconds
    const gameTimer = setInterval(() => {
        if (gameStart === true && startCountdown === 0) {
            setGameCountdown(gameCountdown - 1)
            clearInterval(gameTimer)
        }
        if (gameStart === true && gameCountdown === 0) {
            setGameStart(false)
            setGameFinish(true)
        }
    }, 1000)

    // increment attemptedQuestion when an answer button is clicked and check it against the correct answer
    const handleAnswerClick = (e) => {
        setDisableAnswer(true)
        if (e.target.innerText === countryList[correctCountryCode]) {
            const nextArray = answerCorrect.map((answer, i) => {
                if (i === Number(e.target.dataset.id)) {
                    return answer + 1
                } else {
                    return answer
                }
            })
            setAnswerCorrect(nextArray)
            setScore(score + 1)
            const answerDelay = setInterval(() => {
                const nextArray = answerCorrect.map((answer) => {
                    return 0
                })
                setAnswerCorrect(nextArray)
                setAttemptedQuestion(attemptedQuestion + 1)
                setDisableAnswer(false)
                clearInterval(answerDelay)
            }, 500)
        } else {
            const nextArray = answerIncorrect.map((answer, i) => {
                if (i === Number(e.target.dataset.id)) {
                    return answer + 1
                } else {
                    return answer
                }
            })
            setAnswerIncorrect(nextArray)
            const answerDelay = setInterval(() => {
                const nextArray = answerIncorrect.map((answer) => {
                    return 0
                })
                setAnswerIncorrect(nextArray)
                setAttemptedQuestion(attemptedQuestion + 1)
                setDisableAnswer(false)
                clearInterval(answerDelay)
            }, 500)
        }
    }

    // useEffect for each question
    useEffect(() => {
        // generate four unique random numbers from 0-248, store them in flagRandomNumbers state
        const getFourRandomFlagCodes = () => {
            const fourRandomNumbers = []
            while (fourRandomNumbers.length < 4) {
                let candidateInt = Math.floor(Math.random() * countryCode.length)
                // indexOf returns -1 if candidateINt is not already in fourRandomNumbers array
                if (fourRandomNumbers.indexOf(candidateInt) === -1) {
                    fourRandomNumbers.push(candidateInt)
                }
            }
            return fourRandomNumbers
        }

        // convert the numbers in flagRandomNumbers to countryCodes, and store them in the flagCountryCodes state
        const convertNumbersToFlagCodes = (fourRandomNumbers) => {
            const fourCountryCodes = []
            for (const number of fourRandomNumbers) {
                //? maybe find something to replace countryCode
                fourCountryCodes.push(countryCode[number])
            }
            return fourCountryCodes
        }

        // choose a correct code in the four country codes
        const getCorrectCode = (fourCodes) => {
            let correctChoice = Math.floor(Math.random() * 4)
            return fourCodes[correctChoice]
        }

        // creates the 4 answers and determine the correct answer for each question
        const createQuestion = () => {
            const fourNumbers = getFourRandomFlagCodes()
            const fourCodes = convertNumbersToFlagCodes(fourNumbers)
            const correctCode = getCorrectCode(fourCodes)

            setFlagCountryCodes(fourCodes)
            setCorrectCountryCode(correctCode)
        }

        createQuestion()
    }, [attemptedQuestion])


    // UseEffect hook for updating the highest score for the current user
    useEffect(() => {
        const saveScore = async () => {
            // the hook should remount when gameFinish state changes, 
            // only want to save the score when game is finished (gameCountdown <= 0)
            if (gameCountdown <= 0 && scoreSaved === false) {
                if (currentUser !== null) {
                    let userRef = doc(db, "users", currentUser.uid)
                    const userDocSnap = await getDoc(userRef)
                    if (userDocSnap.exists()) {
                        // update both the highestScore and totalScore if score is higher than highestScore
                        if (score > userDocSnap.data().highestScore) {
                            await updateDoc(userRef, {
                                highestScore: score,
                                totalCorrectAnswers: increment(score)
                            })
                            setScoreSaved(true)
                        } else {
                            await updateDoc(userRef, {
                                totalCorrectAnswers: increment(score)
                            })
                            setScoreSaved(true)
                        }
                    }
                }
            }
        }
        saveScore()
        return () => {
        }
    }, [gameFinish])
    // console.log(currentUser.uid)

    return (
        <div className='h-screen w-full flex justify-center items-center
        bg-gradient-to-b from-sky-500 to-indigo-500'>
            <div className='flex flex-col gap-12 justify-center items-center p-6 text-mainBackground w-full max-w-[768px]
            md:m-auto md:p-12
        '>
                {/* Gamestart preparation */}
                <div className={`flex flex-col gap-12 font-bold text-mainBackground w-full
            ${gameStart | firstGame === false ? 'hidden' : ''}
            md:m-auto  `}>
                    <div className='text-center text-5xl pb-6'>
                        READY?
                    </div>
                    {/* START button */}
                    <button onClick={handleStartButtonClick}
                        className={`flex relative items-end p-4 rounded-3xl text-3xl  text-mainBackground h-24 
                    bg-gradient-to-r to-[#b6f492] from-[#338b93] drop-shadow-xl transition
                    before:content-[''] before:bg-[url('/startup.png')] before:bg-contain before:w-20 before:aspect-square
                    before:absolute before:right-6 before:-translate-y-8
                    md:hover:scale-105 md:active:scale-100                      
                    `}
                    >
                        Start
                    </button>
                    <button onClick={handleGoBackButtonClick}
                        className="flex relative items-end p-4 rounded-3xl text-3xl  text-mainBackground h-24 
                    bg-gradient-to-r from-[#f2709c] to-yellow-400 drop-shadow-xl transition
                    before:content-[''] before:bg-[url('/curve-arrow.png')] before:bg-contain before:w-20 before:aspect-square
                    before:absolute before:right-6 before:-translate-y-8
                    md:hover:scale-105 md:active:scale-100  
                    ">
                        Cancel
                    </button>
                </div>


                {/* Gamestart countdown timer */}
                <div className={`text-5xl text-mainBackground h-[360px] font-bold flex items-center ${gameStart && startCountdown > 0 ? '' : 'hidden'} 
                animate-ping animation-delay-100`}>
                    {startCountdown}
                </div>
                {/* Game countdown timer */}
                <div className={`text-5xl font-bold flex items-center ${gameStart && startCountdown === 0 ? '' : 'hidden'}`}>
                    {gameCountdown}
                </div>
                {/* Score */}
                {/* <div className={`text-5xl ${gameStart && startCountdown === 0 ? '' : 'hidden'}`}>
                    {score}
                </div> */}

                {/* End of game report */}
                <div className={`${gameFinish && firstGame === false ? '' : 'hidden'}
                font-bold gap-16 flex flex-col w-full text-mainBackground `}>
                    {/* Container for the texts */}
                    <div className='flex flex-col gap-6 text-center'>
                        <div className='text-5xl'>GOOD JOB!</div>
                        <div className='flex flex-col gap-2 items-center text-xl'>
                            <img
                                src={`https://flagcdn.com/80x60/${currentProfileFlagCode}.png`}
                                srcSet={`https://flagcdn.com/160x120/${currentProfileFlagCode}.png 2x,
                                    https://flagcdn.com/240x180/${currentProfileFlagCode}.png 3x`}
                                width="40"
                                height="30"
                                alt={currentProfileFlagCode} />
                            <div>{currentDisplayName}</div>
                        </div>
                        <div className='text-3xl'>Score: {score}</div>
                    </div>
                    {/* Buttons container */}
                    <div className='flex flex-col gap-12'>
                        {/* Play Again button */}
                        <button onClick={handleStartButtonClick}
                            className={`flex relative items-end p-4 rounded-3xl text-3xl  text-mainBackground h-24 
                    bg-gradient-to-r to-[#b6f492] from-[#338b93] drop-shadow-xl transition
                    before:content-[''] before:bg-[url('/startup.png')] before:bg-contain before:w-20 before:aspect-square
                    before:absolute before:right-6 before:-translate-y-8     
                    md:hover:scale-105 md:active:scale-100
                    ${scoreSaved ? '' : 'disabled'}`}
                        >
                            Play Again
                        </button>
                        <button onClick={handleGoBackButtonClick}
                            className={`flex relative items-end p-4 rounded-3xl text-3xl  text-mainBackground h-24 
                    bg-gradient-to-r from-[#f2709c] to-yellow-400 drop-shadow-xl transition
                    before:content-[''] before:bg-[url('/curve-arrow.png')] before:bg-contain before:w-20 before:aspect-square
                    before:absolute before:right-6 before:-translate-y-8
                    md:hover:scale-105 md:active:scale-100
                    ${scoreSaved ? '' : 'disabled'}`}
                        >
                            Leave
                        </button>
                    </div>
                </div>
                {/* The game itself */}
                <div className={`${gameStart === true && startCountdown === 0 ? '' : 'hidden'} flex flex-col w-full items-center gap-12`}>
                    {/* Flag */}
                    <div className='w-full h-36 flex justify-center'>
                        <img
                            // the code in src needs to be lowercase
                            src={`https://flagcdn.com/${correctCountryCode?.toLowerCase()}.svg`}
                            width="240"
                        />
                    </div>

                    {/* Answers */}
                    <div className='grid grid-rows-4 w-full gap-3
                    md:grid-cols-2 md:grid-rows-2 md:text-lg'>
                        {/* All answer buttons are disabled onclick and wait for the next question to show up before its clickable again */}
                        <button onClick={handleAnswerClick} disabled={disableAnswer ? "true" : ""}
                            className={`flex h-12 justify-center items-center  font-bold rounded-2xl  drop-shadow-xl                                                     
                        ${answerCorrect[0] === 1 ? 'bg-gradient-to-b from-[#0eae57] to-[#0c7475] text-mainBackground' : ''} 
                        ${answerIncorrect[0] === 1 ? 'bg-gradient-to-b from-[#ee4758] to-[#d64c7f]  text-mainBackground' : ''} 
                        ${answerCorrect[0] | answerIncorrect[0] ? 'text-mainBackground' : 'bg-mainBackground text-blue-600'}     
                        md:h-24                   
                        `}
                            data-id='0'>
                            {countryList[flagCountryCodes[0]]}
                        </button>
                        <button onClick={handleAnswerClick} disabled={disableAnswer ? "true" : ""}
                            className={`flex h-12 justify-center items-center font-bold  rounded-2xl drop-shadow-xl 
                        ${answerCorrect[1] === 1 ? 'bg-gradient-to-b from-[#0eae57] to-[#0c7475] text-mainBackground' : ''} 
                        ${answerIncorrect[1] === 1 ? 'bg-gradient-to-b from-[#ee4758] to-[#d64c7f] text-mainBackground' : ''} 
                        ${answerCorrect[1] | answerIncorrect[1] ? 'text-mainBackground' : 'bg-mainBackground text-blue-600'}
                        md:h-24
                        `}
                            data-id='1'>
                            {countryList[flagCountryCodes[1]]}
                        </button>
                        <button onClick={handleAnswerClick} disabled={disableAnswer ? "true" : ""}
                            className={`flex h-12 justify-center items-center font-bold  rounded-2xl drop-shadow-xl 
                        ${answerCorrect[2] === 1 ? 'bg-gradient-to-b from-[#0eae57] to-[#0c7475] text-mainBackground' : ''} 
                        ${answerIncorrect[2] === 1 ? 'bg-gradient-to-b from-[#ee4758] to-[#d64c7f] text-mainBackground' : ''} 
                        ${answerCorrect[2] | answerIncorrect[2] ? 'text-mainBackground' : 'bg-mainBackground text-blue-600'}
                        md:h-24
                        `}
                            data-id='2'>
                            {countryList[flagCountryCodes[2]]}
                        </button>
                        <button onClick={handleAnswerClick} disabled={disableAnswer ? "true" : ""}
                            className={`flex h-12 justify-center items-center font-bold  rounded-2xl drop-shadow-xl 
                        ${answerCorrect[3] === 1 ? 'bg-gradient-to-b from-[#0eae57] to-[#0c7475] text-mainBackground' : ''} 
                        ${answerIncorrect[3] === 1 ? 'bg-gradient-to-b from-[#ee4758] to-[#d64c7f] text-mainBackground' : ''} 
                        ${answerCorrect[3] | answerIncorrect[3] ? 'text-mainBackground' : 'bg-mainBackground text-blue-600'}
                        md:h-24
                        `}
                            data-id='3'>
                            {countryList[flagCountryCodes[3]]}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game