import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import BotAnimationBar from './BotAnimationBar'
import TopAnimationBar from './TopAnimationBar'
import { query, orderBy, limit, getDocs, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase-config'

const Leaderboard = ({ sixtyFlagCodes }) => {
    // Current user information from AuthContext
    const { currentUser, currentDisplayName, currentProfileFlagCode } = useContext(AuthContext)
    const [currentUserHighestScore, setCurrentUserHighestScore] = useState()
    const [currentUserTotalScore, setCurrentUserTotalScore] = useState()
    const [currentUserHighestScoreRanking, setCurrentUserHighestScoreRanking] = useState()
    const [currentUserTotalScoreRanking, setCurrentUserTotalScoreRanking] = useState()
    
    useEffect(() => {
        //  get the current user's highest score and total score
        const getCurrentUserDoc = async () => {
            const userDocRef = doc(db, "users", currentUser.uid)
            const docSnap = await getDoc(userDocRef)
            if (docSnap.exists()) {
                setCurrentUserHighestScore(docSnap.data().highestScore)
                setCurrentUserTotalScore(docSnap.data().totalCorrectAnswers)
            } else {
                console.log("cannot find this user's document")
                setCurrentUserHighestScore(0)
                setCurrentUserTotalScore(0)
            }
        }

        // get a list of all users ordered by highestScore to retrieve the ranking
        const getUserHighestScoreRanking = async () => {
            const usersOrderByHighestScoreDesc = []
            const usersRef = collection(db, "users")
            const q = query(usersRef, orderBy("highestScore", "desc"))
            const querySnapshot = await getDocs(q)
            // store all the user documents in a new array
            querySnapshot.forEach((doc) => {
                usersOrderByHighestScoreDesc.push(doc.data())
            })
            //  loop through the array and return the index that has the same uid as the current user
            for (let i = 0; i < usersOrderByHighestScoreDesc.length; i++) {
                if (usersOrderByHighestScoreDesc[i].uid === currentUser.uid) {
                    return setCurrentUserHighestScoreRanking(i + 1)
                }
            }
        }

        const getUserTotalScoreRanking = async () => {
            const usersOrderByTotalScoreDesc = []
            const usersRef = collection(db, "users")
            const q = query(usersRef, orderBy("totalCorrectAnswers", "desc"))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                usersOrderByTotalScoreDesc.push(doc.data())
            })
            for (let i = 0; i < usersOrderByTotalScoreDesc.length; i++) {
                if (usersOrderByTotalScoreDesc[i].uid === currentUser.uid) {
                    return setCurrentUserTotalScoreRanking(i + 1)
                }
            }
        }

        getCurrentUserDoc()
        getUserHighestScoreRanking()
        getUserTotalScoreRanking()

        return () => {

        }
    }, [])
    


    return (
        <div className='grid grid-rows-3 h-screen'>
            {/* Top animation bar */}
            <div className='flex overflow-hidden'>
                <div className='flex animate-topInfiniteSlide '>
                    <TopAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>
            {/* Container for the leaderboard */}
            <div>
                {/* the actual leaderboard itself */}
                <div className='flex flex-col justify-center  w-full'>
                    {/* Current user profile and scores */}
                    <div className='flex flex-col gap-6 p-6'>
                        {/* User profile */}
                        <div className='flex items-center gap-3'>
                            <img
                                src={`https://flagcdn.com/80x60/${currentProfileFlagCode}.png`}
                                srcset={`https://flagcdn.com/160x120/${currentProfileFlagCode}.png 2x,
                                    https://flagcdn.com/240x180/${currentProfileFlagCode}.png 3x`}
                                width="40"
                                height="30"
                                alt={currentProfileFlagCode}
                                className='' />
                            <div className='text-3xl font-bold'>
                                {currentDisplayName}
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <div>Highest score: {currentUserHighestScore} </div>
                                <div>Rank: {currentUserHighestScoreRanking}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Total score: {currentUserTotalScore}</div>
                                <div>Rank: {currentUserTotalScoreRanking}</div>
                            </div>
                            {/* <div>
                                Total accuracy:
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Bot animation bar */}
            <div className='flex items-end overflow-hidden'>
                <div className='flex animate-botInfiniteSlide '>
                    <BotAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>
        </div>
    )
}

export default Leaderboard