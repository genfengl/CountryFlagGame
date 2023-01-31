import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Game = () => {
    const {currentUser, currentDisplayName} = useContext(AuthContext)
    // console.log(currentUser)
  return (
    <div>
        <div>Player Statistics</div>
        
    </div>
    
  )
}

export default Game