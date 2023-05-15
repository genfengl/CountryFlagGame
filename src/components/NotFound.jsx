import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="h-screen w-screen flex items-center justify-center p-6 m-auto
    bg-[url('/Login_Background.png')] bg-cover">
            <div className='flex flex-col items-center justify-center gap-6 p-6 rounded-2xl bg-slate-200  text-white
            bg-opacity-0'>
                <div className='text-center text-9xl font-bold   '>
                    404
                </div>
                <div className='text-3xl font-bold'>
                    Page Not Found
                </div>
                <button onClick={() => navigate('/')}
                    className='text-2xl font-bold bg-mainText p-6 rounded-2xl transition-all
                md:hover:scale-[103%]'>
                    Back to lobby
                </button>
            </div>
        </div>
    )
}

export default NotFound