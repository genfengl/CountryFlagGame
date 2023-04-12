import { auth } from '../Firebase-config'
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import TopAnimationBar from './TopAnimationBar'
import BotAnimationBar from './BotAnimationBar'

const Login = ({ countryList, sixtyFlagCodes }) => {
    const { currentUser, currentDisplayName } = useContext(AuthContext)
    const initialState = {
        username: '',
        password: ''
    }

    const [loginFields, setLoginFields] = useState(initialState)
    const [error, setError] = useState(false)
    
    const navigate = useNavigate()

    // const [sixtyFlagCodes, setSixtyFlagCodes] = useState([])

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
        navigate('/')
    }

    return (
        // Flex container
        <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
            {/* Top animation bar */}
            <div className='flex overflow-hidden'>
                <div className='flex animate-topInfiniteSlide '>
                    <TopAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>

            {/* Login container */}
            <div className="flex justify-center items-center
            bg-[url('/Login_Background.png')] bg-cover
            ">
                {/* login component with ::before pseudo element for bg gradient with transition on hover */}
                <div className="flex relative flex-col gap-3 justify-center items-center w-80
                border-2 border-mainText rounded-xl p-3
                before:flex before:absolute before:w-full before:h-full before:content-['']  before:rounded-xl before:bg-left-bottom
                before:bg-login-pattern before:bg-300% before:hover:bg-right-top before:hover:scale-105 before:transition-all before:duration-500
                ">
                    {/* Main title */}
                    <div className='flex flex-col p-3 items-center gap-3 z-10 '>
                        <div className='text-3xl font-bold'>
                            Guessing Flags
                        </div>
                        <div>
                            Become a flag trivia champion!
                        </div>

                    </div>
                    {/* Linebreak */}
                    <div className='bg-[#242424] h-1 w-64 z-10'>

                    </div>
                    {/* Login Form */}
                    <div className="flex flex-col gap-3 p-6 items-center z-10 w-72
                    ">
                        <form className='flex flex-col gap-6 w-full' onSubmit={handleLoginSubmit}    >
                            <input type="text" name="username" value={loginFields.username} onChange={handleLoginChange} placeholder=" email address *"
                                className="p-2 rounded-lg" />
                            <input type="password" name="password" value={loginFields.password} onChange={handleLoginChange} placeholder=" password *"
                                className="p-2 rounded-lg" />
                            {error && <span className="text-xs p-0 text-red-500 mt-0">Incorrect email address or password.</span>}
                            {/* Login button */}
                            <label className='flex flex-col'>
                                <input type="submit" value="LOGIN" className='p-2 rounded-lg border-0 border-mainText bg-mainText text-mainBackground
                                hover:bg-slate-700 hover:scale-105 active:bg-slate-500 active:scale-100 transition-all' />
                            </label>
                            {/* Link to the register page for new account */}
                            <div>
                                New Player? <Link to="/register" className='underline'>Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Bot animation bar */}
            <div className='flex items-end overflow-hidden'>
                <div className='flex  animate-botInfiniteSlide '>
                    <BotAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>

        </div>
    )
}

export default Login