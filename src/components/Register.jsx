import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase-config'
import TopAnimationBar from './TopAnimationBar'
import BotAnimationBar from './BotAnimationBar'
import FlagProfilePicSelection from './FlagProfilePicSelection'
import { MdOutlineAddCircleOutline } from 'react-icons/md'

const Register = ({ sixtyFlagCodes, countryList }) => {
    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
    }

    // States for register form
    const [registerFields, setRegisterFields] = useState(initialState)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    // States for displaying profile flag selection
    const [showFlagSelection, setShowFlagSelection] = useState(false)
    const [selectedFlagProfile, setSelectedFlagProfile] = useState('')

    const handleRegisterChange = (event) => {
        const { name, value } = event.target
        setRegisterFields({
            ...registerFields,
            [name]: value
        })
    }
    // the function for register submission
    const handleRegisterSubmit = async (event) => {
        event.preventDefault()
        // event.target is the form
        const displayName = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value
        const confirmPassword = event.target[3].value
        const profileFlagCode = selectedFlagProfile
        console.log(event.target)
        if (!profileFlagCode) {
            return setError(true)
        }
        if (password !== confirmPassword) {
            return setError(true)
        }
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res.user.uid)
            // user signed up (created user)

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: displayName,
                email: email,
                profileFlagCode: profileFlagCode,
                highestScore: 0,
                totalCorrectAnswers: 0,
                totalAttemptedQuestions: 0,
                totalAccuracy: 0,
            })
            navigate('/')
        } catch (error) {
            setError(true)
            console.log('unsuccessful. Error Message:', error.message)
        }
    }

    // onClick function for flag profile pic
    const handleAddProfileClick = () => {
        showFlagSelection ? setShowFlagSelection(false) : setShowFlagSelection(true)
    }

    const handleFlagSelectionClick = (e) => {
        setSelectedFlagProfile(e.target.alt)
        handleAddProfileClick()
        console.log("selected flag: " + selectedFlagProfile)
    }

    console.log(selectedFlagProfile)

    return (
        // Flex container
        <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
            {/* Top animation bar */}
            <div className='flex overflow-hidden'>
                <div className='flex animate-topInfiniteSlide '>
                    <TopAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>
            <div className="flex justify-center items-center
            bg-[url('/Login_Background.png')] bg-cover
            ">
                {/* Register container */}
                <div className="flex relative flex-col gap-3 justify-center items-center w-80
                border-2 border-mainText rounded-xl p-3
                before:flex before:absolute before:w-full before:h-full before:content-['']  before:rounded-xl before:bg-left-bottom
                before:bg-login-pattern before:bg-300% before:hover:bg-right-top before:hover:scale-105 before:transition-all before:duration-500
                ">
                    {/* Main title */}
                    <div className='flex flex-col pt-3 items-center gap-3 z-10'>
                        <div className='text-3xl font-bold'>
                            Create Account
                        </div>
                        
                    </div>
                    
                    {/* Profile picture */}
                    <div className='relative z-20 w-full flex flex-col items-center justify-center gap-1'>
                        <button onClick={handleAddProfileClick}
                            className='relative w-[40px] h-[30px] z-10 flex justify-center items-center'>
                            <MdOutlineAddCircleOutline className={`w-full h-full ${selectedFlagProfile && 'hidden'}`} />
                            {FlagProfilePicSelection && <img
                                src={`https://flagcdn.com/80x60/${selectedFlagProfile}.png`}
                                srcset={`https://flagcdn.com/160x120/${selectedFlagProfile}.png 2x,
                                    https://flagcdn.com/240x180/${selectedFlagProfile}.png 3x`}
                                width="40"
                                height="30"
                                alt={selectedFlagProfile}
                                className={`${!selectedFlagProfile && 'hidden'}`} />}
                        </button>
                        Choose your favorite flag!
                        {showFlagSelection && <FlagProfilePicSelection countryList={countryList} handleFlagSelectionClick={handleFlagSelectionClick} />}

                    </div>
                    {/* Linebreak */}
                    <div className='bg-mainText h-1 w-64 z-10'>

                    </div>
                    {/* Register Form */}
                    <div className='flex flex-col px-6 pt-3 items-center z-10 w-72 text-mainBackground'>
                        {/* the gap is 5 here (6 for login) to adjust for the greater height */}
                        <form className='flex flex-col gap-5 w-full' onSubmit={handleRegisterSubmit} >
                            <input type="text" name="displayName" value={registerFields.displayName} onChange={handleRegisterChange} placeholder=" display name *"
                                className="p-2 rounded-lg" />
                            <input type="text" name="username" value={registerFields.username} onChange={handleRegisterChange} placeholder=" email address *"
                                className="p-2 rounded-lg" />
                            <input type="password" name="password" value={registerFields.password} onChange={handleRegisterChange} placeholder=" password *"
                                className="p-2 rounded-lg" />
                            <input type="password" name="confirmPassword" value={registerFields.confirmPassword} onChange={handleRegisterChange} placeholder=" confirm password *"
                                className='p-2 rounded-lg' />
                            {error && <span className="text-sm p-0 text-red-500 mt-0">Email already used, invalid password or no flag selected. Please try again.</span>}

                            {/* Register button */}
                            <label className='flex flex-col'>
                                <input type="submit" value="CREATE ACCOUNT" className='p-2 rounded-lg bg-mainText text-mainBackground
                                hover:bg-slate-700 hover:scale-105 active:bg-slate-500 active:scale-100 transition-all' />
                            </label>
                            <div>
                                Played before? <Link to="/" className='underline'>Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Bot animation bar */}
            <div className='flex items-end overflow-hidden'>
                <div className='flex animate-botInfiniteSlide '>
                    <BotAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>
        </div>
    )
}

export default Register