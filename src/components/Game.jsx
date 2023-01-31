import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { db } from '../Firebase-config'

const Game = () => {
    const { currentUser, currentDisplayName } = useContext(AuthContext)
    const [currentUserStats, setCurrentUserStats] = useState({})
    // console.log(currentUser)
    // fetch the current user's doc from the users collection in firestore
    useEffect(() => {
        const getUserStats = async () => {
            const docRef = doc(db, 'users', currentUser.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log(docSnap.data())
                setCurrentUserStats(docSnap.data())
            } else {
                console.log("No such document!")
            }
        }
        getUserStats()
        return () => {

        }
    }, [currentUser])
    // console.log(currentUserStats)




    return (
        <div className='flex'>
            {/* Player Stats */}
            <div className='flex flex-col gap-3 p-6 border rounded-xl'>
                {/* Title */}
                <div className='text-2xl'>
                    Player Statistics
                </div>
                {/* Stats */}
                <div className='flex flex-col gap-3'>
                    <div>
                        Highest Score: {currentUserStats.highestScore}
                    </div>
                    <div>
                        Total Correct Answers: {currentUserStats.totalCorrectAnswers}
                    </div>
                    <div>
                        Total Attempted Questions: {currentUserStats.totalAttemptedQuestions}
                    </div>
                    <div>
                        Total Accuracy: {currentUserStats.totalAccuracy}
                    </div>
                </div>
            </div>
            {/* Hall of Fame */}
            <div className='flex flex-col gap-3 p-6 border rounded-xl'>
                <div className='text-2xl'>
                    Hall of Fame
                </div>
            </div>

        </div>

    )
}

export default Game