import React, { useContext } from 'react'
import { auth } from '../Firebase-config'
import { signOut } from 'firebase/auth'
import { MdLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log('Logout error')
        })
    }

    return (
        <div className='flex gap-3 text-2xl'>
            {/* Brand */}
            <div>
                Country Flag Game
            </div>
            {/* Buttons (only display when a user is logged in) */}
            {currentUser && <button onClick={() => handleLogoutClick()}>
                <MdLogout />
            </button>}
        </div>
    )
}

export default Navbar