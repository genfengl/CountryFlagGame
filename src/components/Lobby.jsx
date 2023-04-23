import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { db, auth } from '../Firebase-config'

import { useNavigate } from 'react-router-dom'
import TopAnimationBar from './TopAnimationBar'
import BotAnimationBar from './BotAnimationBar'


const Lobby = ({ sixtyFlagCodes }) => {
    const { currentUser, currentDisplayName, currentProfileFlagCode } = useContext(AuthContext)
    const [currentUserStats, setCurrentUserStats] = useState({})
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log('Logout error')
        })
    }
    // console.log(currentUser)
    // fetch the current user's doc from the users collection in firestore
    useEffect(() => {
        const getUserStats = async () => {
            const docRef = doc(db, 'users', currentUser.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                // console.log(docSnap.data())
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
        <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
            {/* Top animation bar */}
            <div className='flex overflow-hidden'>
                <div className='flex animate-topInfiniteSlide '>
                    <TopAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>
            <div className="flex flex-col bg-mainBackground bg-cover justify-center
             ">
                {/* The lobby UI itself */}
                <div className='flex flex-col items-center justify-center p-6 gap-6 font-bold w-full max-w-[768px] 
                md:m-auto 
            '>
                    {/* Greetings with the current username displayed */}
                    <div className='w-full text-5xl flex flex-col '>
                        <div className='pb-1 bg-gradient-to-r from-[#5558da] to-[#5fd1f9] bg-clip-text text-transparent'>
                            Let's Play
                        </div>
                        <div className='flex items-center gap-1 text-lg'>
                            <img
                                src={`https://flagcdn.com/80x60/${currentProfileFlagCode}.png`}
                                srcSet={`https://flagcdn.com/160x120/${currentProfileFlagCode}.png 2x,
                                    https://flagcdn.com/240x180/${currentProfileFlagCode}.png 3x`}
                                width="20"
                                height="15"
                                alt={currentProfileFlagCode} />
                            {currentDisplayName}

                        </div>

                    </div>
                    {/* the buttons */}
                    <div className='grid grid-rows-3 gap-12 w-full
                md:grid-cols-2 md:grid-rows-2'>
                        {/* Play Now */}
                        <button onClick={() => navigate(`/game`)}
                            className="flex relative items-end p-4 border rounded-3xl text-3xl  text-mainBackground h-24 
                        bg-gradient-to-r from-[#5558da] to-[#5fd1f9] drop-shadow-xl transition disabled
                        before:content-[''] before:bg-[url('/game-console.png')] before:bg-contain before:w-20 before:aspect-square
                        before:absolute before:right-6 before:-translate-y-8
                        md:col-span-2 md:hover:scale-[102.5%] md:active:scale-100
                        ">
                            Play
                        </button>
                        <button onClick={() => navigate(`/leaderboard`)}
                            className="flex items-end p-4 border rounded-3xl text-3xl  text-mainBackground h-24 
                        bg-gradient-to-r from-[#f2709c] to-[#ff9472] drop-shadow-xl transition
                        before:content-[''] before:bg-[url('/trophy.png')] before:bg-contain before:w-20 before:aspect-square
                        before:absolute before:right-6 before:-translate-y-8
                        md:hover:scale-105 md:active:scale-100">
                            Leaderboard
                        </button>
                        <button onClick={handleLogoutClick}
                            className="flex items-end p-4 border rounded-3xl text-3xl  text-mainBackground h-24 
                        bg-gradient-to-r from-[#654ea3] to-[#eaafc8] drop-shadow-xl transition                        
                        before:content-[''] before:bg-[url('/run.png')] before:bg-contain before:w-20 before:aspect-square
                        before:absolute before:right-6 before:-translate-y-8
                        md:hover:scale-105 md:active:scale-100">
                            Logout
                        </button>
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

export default Lobby