import React from 'react'

const BotAnimationBar = ({ sixtyFlagCodes }) => {
    // Generate the array of flag img components for bot animation bar
    const flags = []
    for (let i = 0; i < 2; i++) {
        sixtyFlagCodes?.forEach((flagCode) => {
            if (sixtyFlagCodes.indexOf(flagCode) >= 30) {
                flags.push(
                    <div className='w-[80px] h-[60px]'>
                        <img
                            src={`https://flagcdn.com/w80/${flagCode.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w160/${flagCode.toLowerCase()}.png 2x`}
                            width="80"
                            alt={flagCode}
                            className='w-full h-full'
                        />
                    </div>
                )
            }
        })
    }

    return (
        <>
            {flags}
        </>
    )
}

export default BotAnimationBar