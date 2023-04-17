import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import BotAnimationBar from './BotAnimationBar'
import TopAnimationBar from './TopAnimationBar'
import { query, orderBy, limit, getDocs, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase-config'
import { useNavigate } from 'react-router-dom'


const Leaderboard = ({ sixtyFlagCodes }) => {
    // Current user information from AuthContext
    const { currentUser, currentDisplayName, currentProfileFlagCode } = useContext(AuthContext)
    // toggle between highest score and total score leaderboard
    const [showHighestScore, setShowHighestScore] = useState(true)
    const [currentUserHighestScore, setCurrentUserHighestScore] = useState()
    const [currentUserTotalScore, setCurrentUserTotalScore] = useState()
    const [currentUserHighestScoreRanking, setCurrentUserHighestScoreRanking] = useState()
    const [currentUserTotalScoreRanking, setCurrentUserTotalScoreRanking] = useState()
    const [rankingHighestScore, setRankingHighestScore] = useState()
    const [rankingTotalScore, setRankingTotalScore] = useState()

    const navigate = useNavigate()

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
            setRankingHighestScore(usersOrderByHighestScoreDesc)
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
            setRankingTotalScore(usersOrderByTotalScoreDesc)

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

    const handleHighestScoreClick = () => {
        setShowHighestScore(true)
    }

    const handleTotalScoreClick = () => {
        setShowHighestScore(false)
    }
    // console.log(rankingHighestScore)

    return (
        <div className='grid grid-rows-[auto_1fr_auto] h-screen bg-mainBackground'>
            {/* User profile container */}
            <div className="bg-gradient-to-br  from-[#5fd1f9] to-[#5558da]">
                {/* User profile */}
                <div className="flex items-center justify-between p-6 text-mainBackground
                            md:hidden">
                    {/* Ranking */}
                    <div className={`flex flex-col items-center w-16`}>
                        <div className='text-3xl font-bold'>
                            {showHighestScore ? currentUserHighestScoreRanking : currentUserTotalScoreRanking}
                        </div>
                        <div className='font-bold'>
                            RANK
                        </div>
                    </div>
                    {/* Profile */}
                    <div className='flex flex-col items-center gap-3'>
                        <img
                            src={`https://flagcdn.com/80x60/${currentProfileFlagCode}.png`}
                            srcset={`https://flagcdn.com/160x120/${currentProfileFlagCode}.png 2x,
                                    https://flagcdn.com/240x180/${currentProfileFlagCode}.png 3x`}
                            width="60"
                            height="45"
                            alt={currentProfileFlagCode}
                            className='' />
                        <div className='text-2xl font-bold'>
                            {currentDisplayName}
                        </div>
                    </div>
                    {/* Score */}
                    <div className='flex flex-col items-center w-16'>
                        <div className='text-3xl font-bold'>
                            {showHighestScore ? currentUserHighestScore : currentUserTotalScore}
                        </div>
                        <div className='font-bold'>
                            PTS
                        </div>
                    </div>
                </div>

                <div className='hidden items-center justify-between px-12 py-6 text-mainBackground
                md:flex'>
                    <div className='flex flex-col items-center w-40'>
                        <div className='text-2xl font-bold'>
                            Highest Score
                        </div>
                        <div className='flex gap-3'>
                            {/* Ranking */}
                            <div className={`flex flex-col items-center w-16`}>
                                <div className='text-3xl font-bold'>
                                    {currentUserHighestScoreRanking}
                                </div>
                                <div className='font-bold'>
                                    RANK
                                </div>
                            </div>
                            {/* Score */}
                            <div className='flex flex-col items-center w-16'>
                                <div className='text-3xl font-bold'>
                                    {currentUserHighestScore}
                                </div>
                                <div className='font-bold'>
                                    PTS
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Profile */}
                    <div className='flex flex-col items-center gap-3'>
                        <img
                            src={`https://flagcdn.com/80x60/${currentProfileFlagCode}.png`}
                            srcset={`https://flagcdn.com/160x120/${currentProfileFlagCode}.png 2x,
                                    https://flagcdn.com/240x180/${currentProfileFlagCode}.png 3x`}
                            width="60"
                            height="45"
                            alt={currentProfileFlagCode}
                            className='' />
                        <div className='text-2xl font-bold'>
                            {currentDisplayName}
                        </div>
                    </div>
                    
                    <div className='flex flex-col items-center w-40'>
                        <div className='text-2xl font-bold'>
                            Total Score
                        </div>
                        <div className='flex gap-3'>
                            {/* Ranking */}
                            <div className={`flex flex-col items-center w-16`}>
                                <div className='text-3xl font-bold'>
                                    {currentUserTotalScoreRanking}
                                </div>
                                <div className='font-bold'>
                                    RANK
                                </div>
                            </div>
                            {/* Score */}
                            <div className='flex flex-col items-center w-16'>
                                <div className='text-3xl font-bold'>
                                    {currentUserTotalScore}
                                </div>
                                <div className='font-bold'>
                                    PTS
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* the actual leaderboard itself */}
            <div className='flex flex-col w-full h-full
            md:m-auto'>
                {/* Container for the leaderboard: mobile screen size */}
                <div className='flex flex-col gap-6 p-6 pb-0 h-full
                        md:hidden'>
                    {/* Toggle button between highest score and total score */}
                    <div className='flex justify-center w-full  font-bold'>
                        <button onClick={handleHighestScoreClick}
                            className={`p-3  rounded-l-xl w-[50%]
                                    transition
                                    ${showHighestScore ? 'bg-gradient-to-br to-[#5558da] from-[#5fd1f9] text-mainBackground' : 'bg-slate-200'}`}>
                            Highest Score
                        </button>
                        <button onClick={handleTotalScoreClick}
                            className={`p-3  rounded-r-xl w-[50%]
                                    transition
                                    ${showHighestScore ? 'bg-slate-200' : 'bg-gradient-to-br to-[#5558da] from-[#5fd1f9] text-mainBackground'}`}>
                            Total Score
                        </button>
                    </div>
                    {/* The leaderboard ranking all users (maybe just display the top 10) - mobile screen size */}
                    <div className=''>
                        <div className={`flex flex-col gap-3 overflow-auto
                                ${showHighestScore ? '' : 'hidden'}`}>
                            {rankingHighestScore?.map((user, i) => {
                                return (
                                    <>
                                        <div className={`flex justify-between items-center p-3 rounded-xl
                                        ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                                        ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                                        ${i === 2 && 'bg-gradient-to-r from-orange-700 to-orange-200'}`}>
                                            <div className='flex items-center gap-3'>
                                                {/* Rank */}
                                                <div className='font-bold'>
                                                    {i + 1}
                                                </div>
                                                {/* Profile flag */}
                                                <img
                                                    src={`https://flagcdn.com/80x60/${user.profileFlagCode}.png`}
                                                    srcset={`https://flagcdn.com/160x120/${user.profileFlagCode}.png 2x,
                                                            https://flagcdn.com/240x180/${user.profileFlagCode}.png 3x`}
                                                    width="40"
                                                    height="30"
                                                    alt={user.profileFlagCode}
                                                    className='' />
                                                {/* displayName of each user */}
                                                <div>
                                                    {user.displayName}
                                                </div>
                                            </div>
                                            {/* the highest score of this user */}
                                            <div className='font-bold'>
                                                {user.highestScore}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div className={`flex flex-col gap-3 overflow-auto
                                ${showHighestScore ? 'hidden' : ''}`}>
                            {rankingTotalScore?.map((user, i) => {
                                return (
                                    <>
                                        <div className={`flex justify-between items-center p-3 rounded-xl
                                        ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                                        ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                                        ${i === 2 && 'bg-gradient-to-r from-orange-700 to-orange-200'}`}>
                                            <div className='flex items-center gap-3'>
                                                {/* Rank */}
                                                <div className='font-bold'>
                                                    {i + 1}
                                                </div>
                                                {/* Profile flag */}
                                                <img
                                                    src={`https://flagcdn.com/80x60/${user.profileFlagCode}.png`}
                                                    srcset={`https://flagcdn.com/160x120/${user.profileFlagCode}.png 2x,
                                                            https://flagcdn.com/240x180/${user.profileFlagCode}.png 3x`}
                                                    width="40"
                                                    height="30"
                                                    alt={user.profileFlagCode}
                                                    className='' />
                                                {/* displayName of each user */}
                                                <div>
                                                    {user.displayName}
                                                </div>
                                            </div>
                                            {/* the highest score of this user */}
                                            <div className='font-bold'>
                                                {user.totalCorrectAnswers}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* Container for the leaderboard: md and above screen sizes */}
                <div className='hidden grid-cols-2 p-12 pb-0 w-full h-full
                    md:grid 
                    '>
                    {/* Leaderboard for highest score */}
                    <div className='flex flex-col items-center gap-6 text-2xl font-bold w-full border-r-2 border-blue-600 pr-6
                            '>
                        <div className='flex justify-center text-mainBackground p-6 w-full rounded-2xl
                                bg-gradient-to-br  from-[#5fd1f9] to-[#5558da]'>
                            Highest Score
                        </div>
                        <div className='flex flex-col justify-center gap-3 w-full'>
                            {rankingHighestScore?.map((user, i) => {
                                return (
                                    <>
                                        <div key={user.uid} className={`flex justify-between p-6 rounded-2xl
                                        ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                                        ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                                        ${i === 2 && 'bg-gradient-to-r from-orange-700 to-orange-200'} `}>
                                            <div className='flex gap-6'>
                                                <div className={``}>
                                                    {i + 1}
                                                </div>
                                                <img
                                                    src={`https://flagcdn.com/80x60/${user.profileFlagCode}.png`}
                                                    srcSet={`https://flagcdn.com/160x120/${user.profileFlagCode}.png 2x,
                                    https://flagcdn.com/240x180/${user.profileFlagCode}.png 3x`}
                                                    width="40"
                                                    height="30"
                                                    alt={user.profileFlagCode}
                                                    className='' />
                                                <div>
                                                    {user.displayName}
                                                </div>

                                            </div>
                                            <div>
                                                {user.highestScore}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    {/* Leaderboard for total score */}
                    <div className='flex flex-col items-center gap-6 text-2xl font-bold w-full pl-6 border-l-2 border-blue-600'>
                        <div className='flex justify-center text-mainBackground p-6 w-full rounded-2xl
                                bg-gradient-to-br  to-[#5fd1f9] from-[#5558da]'>
                            Total Score
                        </div>
                        <div className='flex flex-col justify-center gap-3 w-full'>
                            {rankingTotalScore?.map((user, i) => {
                                return (
                                    <>
                                        <div key={user.uid} className={`flex justify-between p-6 rounded-2xl
                                        ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                                        ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                                        ${i === 2 && 'bg-gradient-to-r from-orange-700 to-orange-200'} `}>
                                            <div className='flex gap-6'>
                                                <div>
                                                    {i + 1}
                                                </div>
                                                <img
                                                    src={`https://flagcdn.com/80x60/${user.profileFlagCode}.png`}
                                                    srcSet={`https://flagcdn.com/160x120/${user.profileFlagCode}.png 2x,
                                    https://flagcdn.com/240x180/${user.profileFlagCode}.png 3x`}
                                                    width="40"
                                                    height="30"
                                                    alt={user.profileFlagCode}
                                                    className='' />
                                                <div>
                                                    {user.displayName}
                                                </div>
                                            </div>
                                            <div>
                                                {user.totalCorrectAnswers}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to lobby button */}
            <div className='flex items-center gap-3 p-6
            md:p-12 md:gap-12'>
                <button onClick={() => navigate('/')}
                    className='rounded-2xl w-[50%] p-3 text-mainBackground font-bold transition
                bg-gradient-to-br  from-[#5fd1f9] to-[#5558da]
                md:p-6 md:text-2xl md:hover:scale-[102%] md:active:scale-100'>
                    Back To Lobby
                </button>
                <button onClick={() => navigate('/credits')}
                    className='rounded-2xl w-[50%] p-3 text-mainBackground font-bold transition
                bg-gradient-to-br  to-[#5fd1f9] from-[#5558da]
                md:p-6 md:text-2xl md:hover:scale-[102%] md:active:scale-100'>
                    Credits
                </button>
            </div>
        </div>
    )
}

export default Leaderboard