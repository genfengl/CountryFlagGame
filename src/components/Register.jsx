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
    const [registrationError, setRegistrationError] = useState(null)
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
        setRegistrationError(null)
        // event.target is the form
        const displayName = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value
        const confirmPassword = event.target[3].value
        const profileFlagCode = selectedFlagProfile

        // check for registration errors that are not included in the firebase authentication
        if (!profileFlagCode) {
            return setRegistrationError('Please select a flag')
        } else if (password !== confirmPassword) {
            return setRegistrationError('Please enter the same passwords')
        } else if (!displayName) {
            return setRegistrationError('Please enter a display name')
        } else if (displayName.length > 12) {
            return setRegistrationError('Display name should have no more than 12 characters')
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
            const errorCode = error.code
            const errorMessage = error.message

            setError(error.code)
            console.log('unsuccessful. Error Message:', error.code, error.message)
        }
    }



    // onClick function for flag profile pic
    const handleAddProfileClick = () => {
        showFlagSelection ? setShowFlagSelection(false) : setShowFlagSelection(true)
    }

    const handleFlagSelectionClick = (e) => {
        setSelectedFlagProfile(e.target.alt)
        handleAddProfileClick()
        setNoFlagError(false)
        console.log("selected flag: " + selectedFlagProfile)
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
            <div className="flex justify-center items-center
            bg-[url('/Login_Background.png')] bg-cover
            ">
                {/* Register container */}
                <div className="flex relative flex-col gap-3 justify-center items-center w-80
                border-0 border-mainText rounded-xl py-6 px-6
                before:flex before:absolute before:w-full before:h-full before:content-['']  before:rounded-xl before:bg-left-bottom
                before:bg-login-pattern before:bg-300% before:hover:bg-right-top before:hover:scale-[103%] before:transition-all before:duration-500
                ">
                    {/* Main title */}
                    <div className='flex flex-col items-center gap-3 z-10'>
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
                                srcSet={`https://flagcdn.com/160x120/${selectedFlagProfile}.png 2x,
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
                    <div className='flex flex-col px-3 items-center z-10 w-full text-mainBackground'>
                        {/* the gap is 5 here (6 for login) to adjust for the greater height */}
                        <form className='flex flex-col gap-3 w-full' onSubmit={handleRegisterSubmit} >
                            <input type="text" name="displayName" value={registerFields.displayName} onChange={handleRegisterChange} placeholder=" display name *"
                                className="p-2 rounded-lg bg-mainText" />
                            <input type="text" name="username" value={registerFields.username} onChange={handleRegisterChange} placeholder=" email address *"
                                className="p-2 rounded-lg bg-mainText" />
                            <input type="password" name="password" value={registerFields.password} onChange={handleRegisterChange} placeholder=" password *"
                                className="p-2 rounded-lg bg-mainText" />
                            <input type="password" name="confirmPassword" value={registerFields.confirmPassword} onChange={handleRegisterChange} placeholder=" confirm password *"
                                className='p-2 rounded-lg bg-mainText' />
                            {registrationError && <span className=" text-mainText">{registrationError}</span>}

                            {error === 'auth/invalid-email' && <span className=" text-mainText">Invalid email</span>}
                            {error === 'auth/weak-password' && <span className=" text-mainText">Password should be at least 6 characters</span>}
                            {error === 'auth/email-already-in-use' && <span className=" text-mainText">Email already in use</span>}

                            {/* Register button */}
                            <label className='flex flex-col w-full'>
                                <input type="submit" value="CREATE ACCOUNT" className='p-2 rounded-lg bg-mainText text-mainBackground w-full
                                md:hover:bg-slate-700 md:hover:scale-105 active:bg-slate-500 active:scale-100 transition-all' />
                            </label>
                            <div className='text-mainText'>
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