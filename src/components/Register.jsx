
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase-config'

const Register = () => {
    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
    }

    const [registerFields, setRegisterFields] = useState(initialState)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

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
                highestScore: 0,
                totalCorrectAnswers: 0,
                totalAttemptedQuestions: 0,
                totalAccuracy: 0,
            })
            navigate('/game')
        } catch (error) {
            setError(true)
            console.log('unseccessful. Error Message:', error.message)
        }
    }

    return (
        // Flex container
        <div className='grid h-screen'>
            {/* Register container */}
            <div className='flex flex-col gap-3 justify-center items-center justify-self-center self-center border-2 rounded-xl p-6'>
                {/* Main title */}
                <div className='flex flex-col p-3 items-center gap-3'>
                    <div className='text-3xl font-bold'>
                        Create Account
                    </div>
                    <div>
                        Register
                    </div>
                </div>
                {/* Linebreak */}
                <div className='bg-white h-1 w-full'>

                </div>
                {/* Register Form */}
                <div className='flex flex-col gap-3 p-6 items-center'>
                    <form className='flex flex-col gap-6 w-72' onSubmit={handleRegisterSubmit} >
                        <input type="text" name="displayName" value={registerFields.displayName} onChange={handleRegisterChange} placeholder=" display name *"
                            className="p-2 rounded-lg" />
                        <input type="text" name="username" value={registerFields.username} onChange={handleRegisterChange} placeholder=" email address *"
                            className="p-2 rounded-lg" />
                        <input type="password" name="password" value={registerFields.password} onChange={handleRegisterChange} placeholder=" password *"
                            className="p-2 rounded-lg" />
                        <input type="password" name="confirmPassword" value={registerFields.confirmPassword} onChange={handleRegisterChange} placeholder=" confirm password *"
                            className='p-2 rounded-lg' />
                        {error && <span className="text-sm p-0 text-red-500 mt-0">Email already used or invalid password. <br/> Please try again.</span>}

                        {/* Register button */}
                        <label className='flex flex-col'>
                            <input type="submit" value="CREATE ACCOUNT" className='p-2 rounded-lg border-2' />
                        </label>
                        <div>
                            Played before? <Link to="/" className='underline'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register