import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { db, auth } from '../Firebase-config'

import { Navigate, useNavigate } from 'react-router-dom'

const Lobby = () => {
    const { currentUser, currentDisplayName } = useContext(AuthContext)
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
        <div>
            <div className='flex flex-col my-24 m-auto max-w-[1280px]'>
                {/* Greetings with the current username displayed */}
                <div className='text-5xl py-6'>
                    WELCOME BACK, {currentDisplayName}!
                </div>
                {/* the buttons */}
                <div className='grid grid-cols-3 grid-rows-2 gap-6'>
                    {/* Play Now */}
                    <button onClick={() => navigate(`/game/${currentUser.uid}`)}
                        className='col-span-2 row-span-2 p-6 border rounded-xl text-2xl aspect-square'>
                        Play Now
                    </button>
                    <button className='p-6 border rounded-xl text-2xl aspect-square'>
                        Leaderboard
                    </button>
                    <button onClick={handleLogoutClick}
                    className='p-6 border rounded-xl text-2xl aspect-square'>
                        Logout
                    </button>
                </div>

            </div>
        </div>



    )
}

export default Lobby