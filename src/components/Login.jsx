import { auth } from '../Firebase-config'
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
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

    const [sixtyFlagCodes, setSixtyFlagCodes] = useState([])

    //  Controlled login input field
    const handleLoginChange = (event) => {
        const { name, value } = event.target
        setLoginFields({
            ...loginFields,
            [name]: value
        })
    }
    // using useEffect hook here so that the sixtyFlagCodes only renders once
    useEffect(() => {
        // Generate array of flags for top animation bar
        const topAnimationFlags = () => {
            const flagCodes = []
            while (flagCodes.length < 60) {
                let candidateInt = Math.floor(Math.random() * countryCodes.length)
                // do not include CH: Switzerland or NP: Nepal because the flag size is different
                if (flagCodes.indexOf(countryCodes[candidateInt]) === -1) {
                    flagCodes.push(countryCodes[candidateInt])
                }
            }
            return setSixtyFlagCodes(flagCodes)
        }
        topAnimationFlags()

        return () => {
            
        }
    }, [])

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
    // Generate the an array of flag img components for top animation bar
    const topFlagsComponents = () => {
        const topFlagCodes = sixtyFlagCodes
        const flags = []
        for (let i = 0; i < 2; i++) {
            topFlagCodes.forEach((flagCode) => {
                if (topFlagCodes.indexOf(flagCode) < 30) {
                    flags.push(
                        <div className='h-[60px] w-[80px]'>
                            <img
                                src={`https://flagcdn.com/w80/${flagCode.toLowerCase()}.png`}
                                srcset={`https://flagcdn.com/w160/${flagCode.toLowerCase()}.png 2x`}
                                width="80"
                                alt={countryList[flagCode]}
                                className='w-full h-full' />
                        </div>
                    )
                }
            })
        }
        return flags
    }

    // Generate the array of flag img components for bot animation bar
    const botFlagsComponents = () => {
        const botFlagCodes = sixtyFlagCodes
        const flags = []
        for (let i = 0; i < 2; i++) {
            botFlagCodes.forEach((flagCode) => {
                if (botFlagCodes.indexOf(flagCode) >= 30) {
                    flags.push(
                        <div className='w-[80px] h-[60px]'>
                            <img
                                src={`https://flagcdn.com/w80/${flagCode.toLowerCase()}.png`}
                                srcset={`https://flagcdn.com/w160/${flagCode.toLowerCase()}.png 2x`}
                                width="80"
                                alt={countryList[flagCode]}
                                className='w-full h-full'
                            />
                        </div>
                    )
                }
            })
        }
        return flags
    }


    return (
        // Flex container
        <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
            {/* Top animation bar */}
            <div className='flex overflow-hidden'>
                <div className='flex animate-topInfiniteSlide '>
                    {topFlagsComponents()}
                </div>
            </div>

            {/* Login container */}
            <div className="flex justify-center 
            bg-[url('/Login_Background.png')] bg-cover
            ">
                {/* login component with ::before pseudo element for bg gradient with transition on hover */}
                <div className="flex relative flex-col gap-3 justify-center items-center justify-self-center self-center 
                border-2 border-mainText rounded-xl p-6
                before:flex before:absolute before:w-full before:h-full before:content-['']  before:rounded-xl before:bg-left-bottom
                before:bg-login-pattern before:bg-300% before:hover:bg-right-top before:hover:scale-105 before:transition-all before:duration-500
                ">
                    {/* Main title */}
                    <div className='flex flex-col p-3 items-center gap-3 z-10 '>
                        <div className='text-3xl font-bold'>
                            Guessing Flags
                        </div>
                        <div>
                            Become a country flag trivia champion!
                        </div>

                    </div>
                    {/* Linebreak */}
                    <div className='bg-[#242424] h-1 w-72 z-10'>

                    </div>
                    {/* Login Form */}
                    <div className="flex flex-col gap-3 p-6 items-center z-10
                    ">
                        <form className='flex flex-col gap-6 w-72' onSubmit={handleLoginSubmit}    >
                            <input type="text" name="username" value={loginFields.username} onChange={handleLoginChange} placeholder=" email address *"
                                className="p-2 rounded-lg" />
                            <input type="password" name="password" value={loginFields.password} onChange={handleLoginChange} placeholder=" password *"
                                className="p-2 rounded-lg" />
                            {error && <span className="text-xs p-0 text-red-500 mt-0">Incorrect email address or password.</span>} 
                            {/* Login button */}
                            <label className='flex flex-col'>
                                <input type="submit" value="LOGIN" className='p-2 rounded-lg border-0 border-mainText bg-mainText text-mainBackground
                                hover:bg-slate-700 hover:scale-105 focus:bg-slate-500 focus:scale-100 transition-all' />
                            </label>
                            {/* Link to the register page for new account */}
                            <div>
                                New Player? <Link to="/register" className='underline'>Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Top animation bar */}
            <div className='flex items-end overflow-hidden'>
                <div className='flex  animate-botInfiniteSlide '>
                    {botFlagsComponents()}
                </div>
            </div>

        </div>
    )
}

export default Login