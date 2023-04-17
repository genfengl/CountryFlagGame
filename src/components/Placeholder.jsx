{/* Container for the leaderboard: md and above screen sizes */}
<div className='hidden grid-cols-2 p-12 pb-0 w-full h-full
md:grid 
'>
{/* Leaderboard for highest score */}
<div className='flex flex-col items-center gap-6 text-2xl font-bold w-full border-r-2 border-blue-600 pr-6
        '>

    <div className='flex flex-col justify-center gap-3 w-full'>
        {rankingHighestScore?.map((user, i) => {
            return (
                <>
                    <div key={user.uid} className={`flex justify-between p-6 rounded-2xl
                    ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                    ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                    ${i === 2 && 'bg-gradient-to-r from-orange-700 to-orange-200'} `}>
                        <div className='flex gap-6'>
                            <div className={``}>
                                {i + 1}
                            </div>
                            <img
                                src={`https://flagcdn.com/80x60/${user.profileFlagCode}.png`}
                                srcSet={`https://flagcdn.com/160x120/${user.profileFlagCode}.png 2x,
                https://flagcdn.com/240x180/${user.profileFlagCode}.png 3x`}
                                width="40"
                                height="30"
                                alt={user.profileFlagCode}
                                className='' />
                            <div>
                                {user.displayName}
                            </div>

                        </div>
                        <div>
                            {user.highestScore}
                        </div>
                    </div>
                </>
            )
        })}
    </div>
</div>
{/* Leaderboard for total score */}
<div className='flex flex-col items-center gap-6 text-2xl font-bold w-full pl-6 border-l-2 border-blue-600'>

    <div className='flex flex-col justify-center gap-3 w-full'>
        {rankingTotalScore?.map((user, i) => {
            return (
                <>
                    <div key={user.uid} className={`flex justify-between p-6 rounded-2xl
                    ${i === 0 && 'bg-gradient-to-r from-yellow-300 to-yellow-100 '}
                    ${i === 1 && 'bg-gradient-to-r from-slate-300 to-slate-100'}
                    ${i === 2 && 'bg-gradient-to-r from-orange-700 to-orange-200'} `}>
                        <div className='flex gap-6'>
                            <div>
                                {i + 1}
                            </div>
                            <img
                                src={`https://flagcdn.com/80x60/${user.profileFlagCode}.png`}
                                srcSet={`https://flagcdn.com/160x120/${user.profileFlagCode}.png 2x,
                https://flagcdn.com/240x180/${user.profileFlagCode}.png 3x`}
                                width="40"
                                height="30"
                                alt={user.profileFlagCode}
                                className='' />
                            <div>
                                {user.displayName}
                            </div>
                        </div>
                        <div>
                            {user.totalCorrectAnswers}
                        </div>
                    </div>
                </>
            )
        })}
    </div>
</div>
</div>