import { auth } from '../Firebase-config'
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Login = ({ countryList }) => {

    const countryCodes = Object.keys(countryList)
    // console.log(countryCodes)
    const { currentUser } = useContext(AuthContext)

    const initialState = {
        username: '',
        password: ''
    }

    const [loginFields, setLoginFields] = useState(initialState)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    //  Controlled login input field
    const handleLoginChange = (event) => {
        const { name, value } = event.target
        setLoginFields({
            ...loginFields,
            [name]: value
        })
    }

    // Login function
    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        const email = event.target[0].value
        const password = event.target[1].value

        await setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
            })
            .catch((error) => {
                setError(true)
                console.log('error code: ' + error.code + ' error message: ' + error.message)
            })
        navigate('/lobby')

    }
    // console.log(currentUser.uid)

    // Generate array of flags for animation
    const animationFlags = () => {
        const flagCodes = []
        while (flagCodes.length < 30) {
            let candidateInt = Math.floor(Math.random() * countryCodes.length)
            // do not include CH: Switzerland or NP: Nepal because the flag size is different
            if (flagCodes.indexOf(countryCodes[candidateInt]) === -1 && countryCodes[candidateInt] !== ('CH' | 'NP' | 'VA')) {
                flagCodes.push(countryCodes[candidateInt])
            }
        }
        return flagCodes
    }

    // Generate the an array of flag img components
    const topFlagsComponents = () => {
        const topFlagCodes = animationFlags()
        const flags = []
        for (let i = 0; i < 2; i++) {
            topFlagCodes.forEach((flagCode) => {
                flags.push(
                    <img
                        src={`https://flagcdn.com/w80/${flagCode.toLowerCase()}.png`}
                        srcset={`https://flagcdn.com/w160/${flagCode.toLowerCase()}.png 2x`}
                        width="80"
                        alt={countryList[flagCode]} 
                        className='h-[60px] object-fit'/>
                )
            })
        }
        console.log(topFlagCodes)
        return flags
    }

    topFlagsComponents()

    return (
        // Flex container
        <div className='grid grid-rows-3 h-screen'>
            {/* Top animation bar */}
            <div className='flex overflow-hidden'>
                <div className='flex  animate-infiniteSlide '>
                    {topFlagsComponents()}
                </div>
            </div>

            {/* Login container */}
            <div className='flex flex-col gap-3 justify-center items-center justify-self-center self-center border-2 rounded-xl p-6'>
                {/* Main title */}
                <div className='flex flex-col p-3 items-center gap-3'>
                    <div className='text-3xl font-bold'>
                        Guessing Flags
                    </div>
                    <div>
                        Become a country flag trivia champion!
                    </div>

                </div>
                {/* Linebreak */}
                <div className='bg-white h-1 w-full'>

                </div>
                {/* Login Form */}
                <div className='flex flex-col gap-3 p-6 items-center'>

                    <form className='flex flex-col gap-6 w-72' onSubmit={handleLoginSubmit}    >

                        <input type="text" name="username" value={loginFields.username} onChange={handleLoginChange} placeholder=" email address *"
                            className="p-2 rounded-lg" />
                        <input type="password" name="password" value={loginFields.password} onChange={handleLoginChange} placeholder=" password *"
                            className="p-2 rounded-lg" />
                        {error && <span className="text-xs p-0 text-red-500 mt-0">Incorrect email address or password.</span>}

                        {/* Login button */}
                        <label className='flex flex-col'>
                            <input type="submit" value="LOGIN" className='p-2 rounded-lg border-2' />
                        </label>
                        <div>
                            New Player? <Link to="/register" className='underline'>Register</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login