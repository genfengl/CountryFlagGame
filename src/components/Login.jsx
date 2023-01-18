import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const initialState = {
        username: '',
        password: ''
    }

    const [loginFields, setLoginFields] = useState(initialState)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleLoginChange = (event) => {
        const { name, value } = event.target
        setLoginFields({
            ...loginFields,
            [name]: value
        })
    }

    return (
        // Flex container
        <div className='grid h-screen'>
            {/* Login container */}
            <div className='flex flex-col gap-3 justify-center items-center justify-self-center self-center border-2 rounded-xl p-6'>
                {/* Main title */}
                <div className='flex flex-col p-3 items-center gap-3'>
                    <div className='text-3xl font-bold'>
                        Guessing Flags
                    </div>
                    <div>
                        Know your flags and become a country flag trivia champion!
                    </div>

                </div>
                {/* Linebreak */}
                <div className='bg-white h-1 w-full'>

                </div>
                {/* Login Form */}
                <div className='flex flex-col gap-3 p-6 items-center'>
                    
                    <form className='flex flex-col gap-6 w-72'    >

                        <input type="text" name="username" value={loginFields.username} onChange={handleLoginChange} placeholder=" email address *"
                            className="p-2 rounded-lg" />
                        <input type="password" name="password" value={loginFields.password} onChange={handleLoginChange} placeholder=" password *"
                            className="p-2 rounded-lg" />
                        {error && <span className="text-xs p-0 text-red-500 mt-0">Incorrect email address or password.</span>}

                        {/* Login button */}
                        <label className='flex flex-col'>
                            <input type="submit" value="LOGIN" className='p-2 rounded-lg border-2'/>
                        </label>
                        <div>
                            New Player? Register
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login