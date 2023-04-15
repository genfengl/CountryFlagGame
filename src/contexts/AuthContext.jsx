import { auth, db } from '../Firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [currentDisplayName, setCurrentDisplayName] = useState('')
    const [currentProfileFlagCode, setCurrentProfileFlagCode] = useState('')
    const [currentHighestScore, setCurrentHighestScore] = useState('')
    const [currentTotalScore, setCurrentTotalScore] = useState('')
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user)
                // get the displayName of the logged in user
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    
                    // console.log(docSnap.data().displayName)
                    setCurrentDisplayName(docSnap.data().displayName)
                    setCurrentProfileFlagCode(docSnap.data().profileFlagCode)
                    setCurrentHighestScore(docSnap.data().highestScore)
                    setCurrentTotalScore(docSnap.data().totalCorrectAnswers)
                } else {
                    console.log("No such document!")
                }
            } else {
                setCurrentUser(null)
            }
        })
    }, [])
    return (
        <AuthContext.Provider 
        value={{ currentUser, setCurrentUser, currentDisplayName, currentProfileFlagCode, currentHighestScore, currentTotalScore }}>
            {children}
        </AuthContext.Provider>
    )
}