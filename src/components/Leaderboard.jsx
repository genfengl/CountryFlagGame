import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { query, orderBy, getDocs, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase-config'
import { useNavigate } from 'react-router-dom'


const Leaderboard = () => {
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
        <div className='grid grid-rows-[auto_1fr_auto] h-screen bg-mainBackground overflow-hidden
        md:grid-cols-2'>
            {/* User profile container */}
            <div className="bg-gradient-to-br  from-[#5fd1f9] to-[#5558da]
            md:col-span-2">
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
                            srcSet={`https://flagcdn.com/160x120/${currentProfileFlagCode}.png 2x,
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

                {/* Md size and above */}
                <div className='hidden items-center justify-evenly px-12 py-6 text-mainBackground
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
                            srcSet={`https://flagcdn.com/160x120/${currentProfileFlagCode}.png 2x,
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

            {/* Container for mobile leaderboard */}
            <div className='grid grid-rows-[auto_1fr] w-full overflow-scroll
            md:hidden'>
                {/* Toggle button between highest score and total score */}
                <div className='flex justify-center w-full  font-bold p-6
                md:hidden'>
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

                {/* Container for the leaderboard: mobile screen size */}
                <div className='px-6 pb-0 overflow-scroll h-full w-full
                    md:hidden'>
                    {/* container for highest score leaderboard mobile screen */}
                    <div className={`flex flex-col gap-3
                                ${showHighestScore ? '' : 'hidden'}`}>
                        {rankingHighestScore?.map((user, i) => {
                            return (
                                <div key={user.displayName + 'mobile highest score'}
                                    className={`flex justify-between items-center p-3 rounded-xl
                                        ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                                        ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                                        ${i === 2 && 'bg-gradient-to-r from-orange-400 to-orange-200'}`}>
                                    <div className='grid grid-cols-[36px_auto_auto] gap-3 items-center'>
                                        {/* Rank */}
                                        <div className='font-bold flex justify-center'>
                                            {i + 1}
                                        </div>
                                        {/* Profile flag */}
                                        <img
                                            src={`https://flagcdn.com/80x60/${user.profileFlagCode}.png`}
                                            srcSet={`https://flagcdn.com/160x120/${user.profileFlagCode}.png 2x,
                                                            https://flagcdn.com/240x180/${user.profileFlagCode}.png 3x`}
                                            width="40"
                                            height="30"
                                            alt={user.profileFlagCode}
                                            className='' />
                                        {/* displayName of each user */}
                                        <div className='px-2'>
                                            {user.displayName}
                                        </div>
                                    </div>
                                    {/* the highest score of this user */}
                                    <div className='font-bold'>
                                        {user.highestScore}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* the leaderboard for total score */}
                    <div className={`flex flex-col gap-3 overflow-scroll
                                ${showHighestScore ? 'hidden' : ''}`}>
                        {rankingTotalScore?.map((user, i) => {
                            return (
                                <div key={user.displayName + 'mobile total score'}
                                    className={`flex justify-between items-center p-3 rounded-xl
                                        ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                                        ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                                        ${i === 2 && 'bg-gradient-to-r from-orange-400 to-orange-200'}`}>
                                    <div className='grid grid-cols-[36px_auto_auto] items-center gap-3'>
                                        {/* Rank */}
                                        <div className='font-bold flex justify-center'>
                                            {i + 1}
                                        </div>
                                        {/* Profile flag */}
                                        <img
                                            src={`https://flagcdn.com/80x60/${user.profileFlagCode}.png`}
                                            srcSet={`https://flagcdn.com/160x120/${user.profileFlagCode}.png 2x,
                                                            https://flagcdn.com/240x180/${user.profileFlagCode}.png 3x`}
                                            width="40"
                                            height="30"
                                            alt={user.profileFlagCode}
                                            className='' />
                                        {/* displayName of each user */}
                                        <div className='px-2'>
                                            {user.displayName}
                                        </div>
                                    </div>
                                    {/* the highest score of this user */}
                                    <div className='font-bold'>
                                        {user.totalCorrectAnswers}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Container for both highest score and total score for md or above screen size */}
            {/* Overflow-hidden for parent */}
            <div className='hidden grid-rows-[auto_1fr] gap-6 text-2xl font-bold w-full border-r-2 border-blue-600 p-6 overflow-hidden
                md:grid'>
                <div className='w-full p-6 rounded-xl text-mainBackground text-center align-middle
                    bg-gradient-to-br to-[#5558da] from-[#5fd1f9] '>
                    Highest Score
                </div>
                {/* Container for md or above screen size: highest score */}
                {/* overflow-auto for child */}
                <div className='flex flex-col gap-3 w-full overflow-auto'>
                    {rankingHighestScore?.map((user, i) => {
                        return (
                            <>
                                <div key={user.uid + 'desktop highest score'} className={`flex justify-between px-4 py-6 rounded-2xl 
                                    ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                                    ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                                    ${i === 2 && 'bg-gradient-to-r from-orange-500 to-orange-200'} `}>
                                    <div className='grid grid-cols-[36px_auto_1fr] items-center gap-6'>
                                        <div className='flex justify-center'>
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
                                        <div className='font-normal'>
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
            {/* Container for md or higher size: total score */}
            <div className='hidden grid-rows-[auto_1fr] gap-6 text-2xl font-bold w-full p-6 border-l-2 border-blue-600 overflow-hidden
            md:grid'>
                <div className='w-full p-6 rounded-xl text-mainBackground text-center align-middle
                    bg-gradient-to-br from-[#5558da] to-[#5fd1f9] '>
                    Total Score
                </div>
                <div className='flex flex-col gap-3 w-full overflow-auto'>
                    {rankingTotalScore?.map((user, i) => {
                        return (
                            <>
                                <div key={user.uid + 'desktop total score'} className={`flex justify-between px-4 py-6 rounded-2xl
                                        ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                                        ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                                        ${i === 2 && 'bg-gradient-to-r from-orange-500 to-orange-200'} `}>
                                    <div className='grid grid-cols-[36px_auto_1fr] items-center gap-6'>
                                        <div className='flex justify-center'>
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
                                        <div className='font-normal'>
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

            {/* Back to lobby button */}
            <div className='flex items-center gap-3 p-6
                md:p-6 md:gap-12 md:col-span-2'>
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



        </div >
    )
}

export default Leaderboard