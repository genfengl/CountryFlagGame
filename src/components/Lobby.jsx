import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { db, auth } from '../Firebase-config'

import { Navigate, useNavigate } from 'react-router-dom'
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
        <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
            {/* Top animation bar */}
            <div className='flex overflow-hidden'>
                <div className='flex animate-topInfiniteSlide '>
                    <TopAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>
            {/* The lobby UI itself */}
            <div className='flex flex-col items-center justify-center p-6 gap-6 font-bold bg-mainBackground
            '>
                {/* Greetings with the current username displayed */}
                <div className='w-full text-5xl flex flex-col bg-slate-200 backdrop-blur-xl bg-opacity-10'>
                    <div className='pb-1 bg-gradient-to-r from-[#5558da] to-[#5fd1f9] bg-clip-text text-transparent'>
                        Let's Play
                    </div>
                    <div className='flex items-center gap-1 text-lg'>
                        <img
                            src={`https://flagcdn.com/80x60/${currentProfileFlagCode}.png`}
                            srcset={`https://flagcdn.com/160x120/${currentProfileFlagCode}.png 2x,
                                    https://flagcdn.com/240x180/${currentProfileFlagCode}.png 3x`}
                            width="20"
                            height="15"
                            alt={currentProfileFlagCode} />
                        {currentDisplayName}

                    </div>
                    
                </div>
                {/* the buttons */}
                <div className='grid grid-rows-3 gap-12 w-full'>
                    {/* Play Now */}
                    <button onClick={() => navigate(`/game/${currentUser.uid}`)}
                        className="flex relative items-end p-4 border rounded-3xl text-3xl  text-mainBackground h-24 
                        bg-gradient-to-r from-[#5558da] to-[#5fd1f9] drop-shadow-xl

                        before:content-[''] before:bg-[url('/game-console.png')] before:bg-contain before:w-20 before:aspect-square
                        before:absolute before:right-6 before:-translate-y-8
                        ">
                        Play
                        
                        
                    </button>
                    <button onClick={() => navigate(`/leaderboard/${currentUser.uid}`)}
                        className="flex items-end p-4 border rounded-3xl text-3xl  text-mainBackground h-24 
                        bg-gradient-to-r from-[#f2709c] to-[#ff9472] drop-shadow-xl
                        before:content-[''] before:bg-[url('/trophy.png')] before:bg-contain before:w-20 before:aspect-square
                        before:absolute before:right-6 before:-translate-y-8">
                        Leaderboard
                        
                    </button>
                    <button onClick={handleLogoutClick}
                        className="flex items-end p-4 border rounded-3xl text-3xl  text-mainBackground h-24 
                        bg-gradient-to-r from-[#654ea3] to-[#eaafc8] drop-shadow-xl
                        before:content-[''] before:bg-[url('/run.png')] before:bg-contain before:w-20 before:aspect-square
                        before:absolute before:right-6 before:-translate-y-8">
                            
                        Logout
                    </button>
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