import React, { useContext } from 'react'
import { auth } from '../Firebase-config'
import { signOut } from 'firebase/auth'
import { MdLogout } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
    const { currentUser, currentDisplayName } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log('Logout error')
        })
    }

    return (
        <div className='flex justify-between gap-3 p-6 text-2xl'>
            {/* Brand */}
            <div>
                Country Flag Game
            </div>
            {/* User status and Buttons (only display when a user is logged in) */}
            {currentUser && <div className='flex gap-3 items-center'>
                <FaUserAlt /> {currentDisplayName}
                <button onClick={() => handleLogoutClick()}>
                    <MdLogout />
                </button>
            </div>}
            

        </div>
    )
}

export default Navbar