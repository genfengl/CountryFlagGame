import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

    return (
        // Flex container
        <div className='grid h-screen'>
            {/* Login container */}
            <div className='flex flex-col gap-3 justify-center items-center justify-self-center self-center border-2 rounded-xl p-6'>
                {/* Main title */}
                <div className='flex flex-col p-3 items-center gap-3'>
                    <div className='text-3xl font-bold'>
                        Create an account
                    </div>
                    <div>
                        Register
                    </div>
                </div>
                {/* Linebreak */}
                <div className='bg-white h-1 w-full'>

                </div>
                {/* Login Form */}
                <div className='flex flex-col gap-3 p-6 items-center'>
                    <form className='flex flex-col gap-6 w-72' >
                        <input type="text" name="displayName" value={registerFields.displayName} onChange={handleRegisterChange} placeholder=" display name *"
                            className="p-2 rounded-lg" />
                        <input type="text" name="username" value={registerFields.username} onChange={handleRegisterChange} placeholder=" email address *"
                            className="p-2 rounded-lg" />
                        <input type="password" name="password" value={registerFields.password} onChange={handleRegisterChange} placeholder=" password *"
                            className="p-2 rounded-lg" />
                        <input type="password" name="confirmPassword" value={registerFields.confirmPassword} onChange={handleRegisterChange} placeholder=" confirm password *"
                            className='p-2 rounded-lg' />
                        {error && <span className="text-xs p-0 text-red-500 mt-0">Incorrect email address or password.</span>}

                        {/* Login button */}
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