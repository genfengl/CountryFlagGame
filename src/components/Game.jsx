import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Game = () => {
    const {currentUser, currentDisplayName} = useContext(AuthContext)
    
    console.log(currentUser)
  return (
    <div>Game
        <div>
            Logged in as: {currentDisplayName}
        </div>
    </div>
    
  )
}

export default Game