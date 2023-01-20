import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Game = () => {
    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)
  return (
    <div>Game
        <div>
            
        </div>
    </div>
    
  )
}

export default Game