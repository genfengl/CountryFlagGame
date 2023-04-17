import React from 'react'


// Generate the an array of flag img components for top animation bar
const TopAnimationBar = ({sixtyFlagCodes}) => {
    
    const flags = []
    // the component needs to have a copy of the 30 flags
    for (let i = 0; i < 2; i++) {
        sixtyFlagCodes?.forEach((flagCode, index) => {
            if (sixtyFlagCodes.indexOf(flagCode) < 30) {
                flags.push(
                    <div key={`${flagCode}_${index}_${i}`}
                    className='h-[60px] w-[80px]'>
                        <img
                            src={`https://flagcdn.com/w80/${flagCode.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w160/${flagCode.toLowerCase()}.png 2x`}
                            width="80"
                            alt={flagCode}
                            className='w-full h-full' />
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

export default TopAnimationBar