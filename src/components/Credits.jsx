import React, { useContext } from 'react'
import { FaGithub, FaLinkedin, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import BotAnimationBar from './BotAnimationBar'
import TopAnimationBar from './TopAnimationBar'



const Credits = ({ sixtyFlagCodes }) => {
    const { currentUser, currentDisplayName, currentProfileFlagCode } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className='grid grid-rows-[auto_1fr_auto] h-screen bg-mainBackground'>

            {/* Top animation bar */}
            <div className='flex overflow-hidden'>
                <div className='flex animate-topInfiniteSlide '>
                    <TopAnimationBar sixtyFlagCodes={sixtyFlagCodes} />
                </div>
            </div>

            <div className='flex flex-col justify-center p-6 gap-6 w-full max-w-[768px]
            md:m-auto'>
                <div className='text-5xl font-bold text-transparent bg-clip-text
                bg-gradient-to-br  to-[#5fd1f9] from-[#5558da]'>
                    Credits
                </div>
                <div className='flex flex-col justify-center gap-1'>


                    <div className='text-2xl'>Developer: </div>

                    <div className='flex justify-between items-center text-2xl'>
                        <a href="https://geraldliu-dev.netlify.app/" className='font-bold'> Gerald Liu</a>
                        <div className='flex gap-6 text-3xl items-center'>

                            <a href='https://www.github.com/genfengl'
                                className='hover:text-blue-700 transition'>
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/geraldlgf"
                                className='hover:text-sky-700 transition'>
                                <FaLinkedin />
                            </a>
                            <a href="https://geraldliu-dev.netlify.app"
                                className='hover:text-emerald-700 transition'>
                                <FaUser />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-2xl'>
                        Icons used:
                    </div>
                    <div className='flex flex-col'>
                        <a href="https://www.flaticon.com/free-icons/run" title="run icons">Run icons created by Freepik - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/trophy" title="trophy icons">Trophy icons created by Freepik - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/sony" title="sony icons">Sony icons created by Freepik - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/boost" title="boost icons">Boost icons created by Freepik - Flaticon</a>
                        <a href="https://www.flaticon.com/free-icons/curve-arrow" title="curve arrow icons">Curve arrow icons created by Creative Stall Premium - Flaticon</a>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <div className='text-2xl '>
                        Flags Used:
                    </div>
                    <div>
                        <a href="https://flagpedia.net/download/api">Flagpedia.net API</a>
                    </div>

                </div>

                {/* Back to lobby button */}
                <div className='flex items-center gap-3
             md:gap-12'>
                    <button onClick={() => navigate('/')}
                        className='rounded-2xl w-[50%] p-3 text-mainBackground font-bold transition
                bg-gradient-to-br  from-[#5fd1f9] to-[#5558da]
                md:p-6 md:text-2xl md:hover:scale-[102%] md:active:scale-100'>
                        Back To Lobby
                    </button>
                    <button onClick={() => navigate(`/leaderboard`)}
                        className='rounded-2xl w-[50%] p-3 text-mainBackground font-bold transition
                bg-gradient-to-br  to-[#5fd1f9] from-[#5558da]
                md:p-6 md:text-2xl md:hover:scale-[102%] md:active:scale-100'>
                        Leaderboard
                    </button>
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

export default Credits