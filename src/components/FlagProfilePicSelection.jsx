import React from 'react'

const FlagProfilePicSelection = ({ countryList, handleFlagSelectionClick }) => {
    const flagCodes = Object.keys(countryList)
    return (
        <div className='z-20 absolute w-full h-[336px] grid grid-cols-6 gap-2 p-3 rounded-2xl overflow-auto bg-white translate-y-56'>
            {flagCodes?.map((code) => {
                return (
                    <button onClick={handleFlagSelectionClick}
                        className='z-20 flex justify-center '>
                        <img
                            src={`https://flagcdn.com/40x30/${code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/80x60/${code.toLowerCase()}.png 2x,
                                    https://flagcdn.com/120x90/${code.toLowerCase()}.png 3x`}
                            width="40"
                            height="30"
                            alt={code.toLowerCase()} />
                    </button>
                )
            })
            }
        </div>
    )
}

export default FlagProfilePicSelection