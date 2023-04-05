import React, { useEffect } from 'react'
import { useState } from 'react'

const Game = () => {
    // states for the starting procedures
    const [gameStart, setGameStart] = useState(false)
    const [gameFinish, setGameFinish] = useState(true)
    const [startCountdown, setStartCountdown] = useState(3)
    const [startCountdownFinish, setStartCountdownFinish] = useState(false)
    const [gameCountdown, setGameCountdown] = useState(60)

    // states for the actual game itself
    const [flagCountryCodes, setFlagCountryCodes] = useState([])
    const [correctCountryCode, setCorrectCountryCode] = useState()
    const [correctAnswer, setCorrectAnswer] = useState()

    const [score, setScore] = useState(0)
    const [attemptedQuestion, setAttemptedQuestion] = useState(0)

    // states for background color effect of answers
    const [answerIncorrect, setAnswerIncorrect] = useState([
        0, 0, 0, 0
    ])
    const [answerCorrect, setAnswerCorrect] = useState([
        0, 0, 0, 0
    ])
    // Country Flag list with code for api requests
    // 249 key-value pairs in the object
    const countryList = {
        "AF": "Afghanistan",
        "AL": "Albania",
        "DZ": "Algeria",
        "AS": "American Samoa",
        "AD": "Andorra",
        "AO": "Angola",
        "AI": "Anguilla",
        "AQ": "Antarctica",
        "AG": "Antigua and Barbuda",
        "AR": "Argentina",
        "AM": "Armenia",
        "AW": "Aruba",
        "AU": "Australia",
        "AT": "Austria",
        "AZ": "Azerbaijan",
        "BS": "Bahamas",
        "BH": "Bahrain",
        "BD": "Bangladesh",
        "BB": "Barbados",
        "BY": "Belarus",
        "BE": "Belgium",
        "BZ": "Belize",
        "BJ": "Benin",
        "BM": "Bermuda",
        "BT": "Bhutan",
        "BO": "Bolivia",
        "BQ": "Bonaire",
        "BA": "Bosnia and Herzegovina",
        "BW": "Botswana",
        "BV": "Bouvet Island",
        "BR": "Brazil",
        "IO": "British Indian Ocean Territory",
        "BN": "Brunei Darussalam",
        "BG": "Bulgaria",
        "BF": "Burkina Faso",
        "BI": "Burundi",
        "CV": "Cabo Verde",
        "KH": "Cambodia",
        "CM": "Cameroon",
        "CA": "Canada",
        "KY": "Cayman Islands",
        "CF": "Central African Republic",
        "TD": "Chad",
        "CL": "Chile",
        "CN": "China",
        "CX": "Christmas Island",
        "CC": "Cocos (Keeling) Islands",
        "CO": "Colombia",
        "KM": "Comoros",
        "CD": "Democratic Republic of the Congo",
        "CG": "Republic of the Congo",
        "CK": "Cook Islands",
        "CR": "Costa Rica",
        "HR": "Croatia",
        "CU": "Cuba",
        "CW": "Curaçao",
        "CY": "Cyprus",
        "CZ": "Czechia",
        "CI": "Côte d'Ivoire",
        "DK": "Denmark",
        "DJ": "Djibouti",
        "DM": "Dominica",
        "DO": "Dominican Republic",
        "EC": "Ecuador",
        "EG": "Egypt",
        "SV": "El Salvador",
        "GQ": "Equatorial Guinea",
        "ER": "Eritrea",
        "EE": "Estonia",
        "SZ": "Eswatini",
        "ET": "Ethiopia",
        "FK": "Falkland Islands",
        "FO": "Faroe Islands",
        "FJ": "Fiji",
        "FI": "Finland",
        "FR": "France",
        "GF": "French Guiana",
        "PF": "French Polynesia",
        "TF": "French Southern Territories",
        "GA": "Gabon",
        "GM": "Gambia",
        "GE": "Georgia",
        "DE": "Germany",
        "GH": "Ghana",
        "GI": "Gibraltar",
        "GR": "Greece",
        "GL": "Greenland",
        "GD": "Grenada",
        "GP": "Guadeloupe",
        "GU": "Guam",
        "GT": "Guatemala",
        "GG": "Guernsey",
        "GN": "Guinea",
        "GW": "Guinea-Bissau",
        "GY": "Guyana",
        "HT": "Haiti",
        "HM": "Heard Island and McDonald Islands",
        "VA": "Holy See",
        "HN": "Honduras",
        "HK": "Hong Kong",
        "HU": "Hungary",
        "IS": "Iceland",
        "IN": "India",
        "ID": "Indonesia",
        "IR": "Iran",
        "IQ": "Iraq",
        "IE": "Ireland",
        "IM": "Isle of Man",
        "IL": "Israel",
        "IT": "Italy",
        "JM": "Jamaica",
        "JP": "Japan",
        "JE": "Jersey",
        "JO": "Jordan",
        "KZ": "Kazakhstan",
        "KE": "Kenya",
        "KI": "Kiribati",
        "KP": "North Korea",
        "KR": "South Korea",
        "KW": "Kuwait",
        "KG": "Kyrgyzstan",
        "LA": "Laos",
        "LV": "Latvia",
        "LB": "Lebanon",
        "LS": "Lesotho",
        "LR": "Liberia",
        "LY": "Libya",
        "LI": "Liechtenstein",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "MO": "Macao",
        "MG": "Madagascar",
        "MW": "Malawi",
        "MY": "Malaysia",
        "MV": "Maldives",
        "ML": "Mali",
        "MT": "Malta",
        "MH": "Marshall Islands",
        "MQ": "Martinique",
        "MR": "Mauritania",
        "MU": "Mauritius",
        "YT": "Mayotte",
        "MX": "Mexico",
        "FM": "Micronesia",
        "MD": "Moldova",
        "MC": "Monaco",
        "MN": "Mongolia",
        "ME": "Montenegro",
        "MS": "Montserrat",
        "MA": "Morocco",
        "MZ": "Mozambique",
        "MM": "Myanmar",
        "NA": "Namibia",
        "NR": "Nauru",
        "NP": "Nepal",
        "NL": "Netherlands",
        "NC": "New Caledonia",
        "NZ": "New Zealand",
        "NI": "Nicaragua",
        "NE": "Niger",
        "NG": "Nigeria",
        "NU": "Niue",
        "NF": "Norfolk Island",
        "MP": "Northern Mariana Islands",
        "NO": "Norway",
        "OM": "Oman",
        "PK": "Pakistan",
        "PW": "Palau",
        "PS": "Palestine",
        "PA": "Panama",
        "PG": "Papua New Guinea",
        "PY": "Paraguay",
        "PE": "Peru",
        "PH": "Philippines",
        "PN": "Pitcairn",
        "PL": "Poland",
        "PT": "Portugal",
        "PR": "Puerto Rico",
        "QA": "Qatar",
        "MK": "North Macedonia",
        "RO": "Romania",
        "RU": "Russia",
        "RW": "Rwanda",
        "RE": "Réunion",
        "BL": "Saint Barthélemy",
        "SH": "Saint Helena, Ascension and Tristan da Cunha",
        "KN": "Saint Kitts and Nevis",
        "LC": "Saint Lucia",
        "MF": "Saint Martin (French part)",
        "PM": "Saint Pierre and Miquelon",
        "VC": "Saint Vincent and the Grenadines",
        "WS": "Samoa",
        "SM": "San Marino",
        "ST": "Sao Tome and Principe",
        "SA": "Saudi Arabia",
        "SN": "Senegal",
        "RS": "Serbia",
        "SC": "Seychelles",
        "SL": "Sierra Leone",
        "SG": "Singapore",
        "SX": "Sint Maarten (Dutch part)",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SB": "Solomon Islands",
        "SO": "Somalia",
        "ZA": "South Africa",
        "GS": "South Georgia and the South Sandwich Islands",
        "SS": "South Sudan",
        "ES": "Spain",
        "LK": "Sri Lanka",
        "SD": "Sudan",
        "SR": "Suriname",
        "SJ": "Svalbard and Jan Mayen",
        "SE": "Sweden",
        "CH": "Switzerland",
        "SY": "Syrian Arab Republic",
        "TW": "Taiwan",
        "TJ": "Tajikistan",
        "TZ": "Tanzania, United Republic of",
        "TH": "Thailand",
        "TL": "Timor-Leste",
        "TG": "Togo",
        "TK": "Tokelau",
        "TO": "Tonga",
        "TT": "Trinidad and Tobago",
        "TN": "Tunisia",
        "TR": "Turkey",
        "TM": "Turkmenistan",
        "TC": "Turks and Caicos Islands",
        "TV": "Tuvalu",
        "UG": "Uganda",
        "UA": "Ukraine",
        "AE": "United Arab Emirates",
        "GB": "United Kingdom of Great Britain and Northern Ireland",
        "UM": "United States Minor Outlying Islands",
        "US": "United States of America",
        "UY": "Uruguay",
        "UZ": "Uzbekistan",
        "VU": "Vanuatu",
        "VE": "Venezuela",
        "VN": "Viet Nam",
        "VG": "Virgin Islands (British)",
        "VI": "Virgin Islands (U.S.)",
        "WF": "Wallis and Futuna",
        "EH": "Western Sahara",
        "YE": "Yemen",
        "ZM": "Zambia",
        "ZW": "Zimbabwe",
        "AX": "Åland Islands"
    };
    const countryCode = Object.keys(countryList)

    // start button click
    const handleStartButtonClick = () => {
        setGameStart(true)
        setGameFinish(false)
        setStartCountdown(3)
        setGameCountdown(60)
        setAttemptedQuestion(0)
        setScore(0)
    }

    // a countdown timer for gamestart
    const gameStartTimer = setInterval(() => {
        if (gameStart === true && startCountdown > 0) {
            setStartCountdown(startCountdown - 1)
            clearInterval(gameStartTimer)
        }
        if (gameStart === true && startCountdown === 0) {
            setStartCountdownFinish(true)
        }
    }, 1000)

    // a countdown timer for the game itself: 60 seconds
    const gameTimer = setInterval(() => {
        if (gameStart === true && startCountdown === 0) {
            setGameCountdown(gameCountdown - 1)
            clearInterval(gameTimer)
        }
        if (gameStart === true && gameCountdown === 0) {
            setGameStart(false)
            setGameFinish(true)
        }
    }, 1000)

    // increment attemptedQuestion when a answer button is clicked and check against correct answer
    const handleAnswerClick = (e) => {
        if (e.target.innerText === countryList[correctCountryCode]) {
            const nextArray = answerCorrect.map((answer, i) => {
                if (i === Number(e.target.dataset.id)) {
                    return answer + 1
                } else {
                    return answer
                }
            })
            setAnswerCorrect(nextArray)
            setScore(score + 1)
            const answerDelay = setInterval(() => {
                const nextArray = answerCorrect.map((answer) => {
                    return 0
                })
                setAnswerCorrect(nextArray)
                setAttemptedQuestion(attemptedQuestion + 1)
                clearInterval(answerDelay)
            }, 300)

        } else {
            const nextArray = answerIncorrect.map((answer, i) => {
                if (i === Number(e.target.dataset.id)) {
                    return answer + 1
                } else {
                    return answer
                }
            })
            setAnswerIncorrect(nextArray)
            const answerDelay = setInterval(() => {
                const nextArray = answerIncorrect.map((answer) => {
                    return 0
                })
                setAnswerIncorrect(nextArray)
                setAttemptedQuestion(attemptedQuestion + 1)
                clearInterval(answerDelay)
            }, 300)
        }
    }

    // useEffect for each question
    useEffect(() => {
        // generate four unique random numbers from 0-248, store them in flagRandomNumbers state
        const getFourRandomFlagCodes = () => {
            const fourRandomNumbers = []
            while (fourRandomNumbers.length < 4) {
                let candidateInt = Math.floor(Math.random() * countryCode.length)
                // indexOf returns -1 if candidateINt is not already in fourRandomNumbers array
                if (fourRandomNumbers.indexOf(candidateInt) === -1) {
                    fourRandomNumbers.push(candidateInt)
                }
            }
            return fourRandomNumbers
        }

        // convert the numbers in flagRandomNumbers to countryCodes, and store them in the flagCountryCodes state
        const convertNumbersToFlagCodes = (fourRandomNumbers) => {
            const fourCountryCodes = []
            for (const number of fourRandomNumbers) {
                //? maybe find something to replace countryCode
                fourCountryCodes.push(countryCode[number])
            }
            return fourCountryCodes
        }

        // choose a correct code in the four country codes
        const getCorrectCode = (fourCodes) => {
            let correctChoice = Math.floor(Math.random() * 4)
            return fourCodes[correctChoice]
        }

        const createQuestion = () => {
            const fourNumbers = getFourRandomFlagCodes()
            const fourCodes = convertNumbersToFlagCodes(fourNumbers)
            const correctCode = getCorrectCode(fourCodes)

            setFlagCountryCodes(fourCodes)
            setCorrectCountryCode(correctCode)
            setCorrectAnswer(countryList[correctCode])
        }

        createQuestion()
        console.log(gameCountdown)
        console.log(attemptedQuestion)
        console.log(score)
    }, [attemptedQuestion])

    return (
        <div className='flex flex-col my-6 gap-3 justify-center items-center h-full'>
            {/* START button */}
            <button onClick={handleStartButtonClick}
                className={`p-3 m-6 text-2xl font-bold border rounded-xl ${gameStart ? 'hidden' : ''}
            hover:bg-slate-700 hover:scale-105`}>
                START
            </button>
            {/* Gamestart countdown timer */}
            <div className={`text-5xl h-[360px] flex items-center ${gameStart && startCountdown > 0 ? '' : 'hidden'} 
            animate-ping animation-delay-100`}>
                {startCountdown}
            </div>
            {/* Game countdown timer */}
            <div className={`text-5xl flex items-center ${gameStart && startCountdown === 0 ? '' : 'hidden'}`}>
                {gameCountdown}
            </div>
            {/* Score */}
            <div className={`text-5xl ${gameStart && startCountdown === 0 ? '' : 'hidden'}`}>
                {score}
            </div>
            {/* End of game report */}
            <div className={`text-5xl ${gameFinish ? '' : 'hidden'}`}>
                YOUR SCORE: {score}
            </div>
            {/* The game itself */}
            <div className={`${gameStart === true && startCountdown === 0 ? '' : 'hidden'} flex flex-col items-center gap-3`}>
                {/* Flag */}
                <div className='w-[360px] h-[360px] flex items-center'>
                    <img
                        // the code in src needs to be lowercase
                        src={`https://flagcdn.com/${correctCountryCode?.toLowerCase()}.svg`}
                        width="360"

                    />
                </div>
                {/* Answers */}
                <div className='grid grid-rows-2 grid-cols-2 gap-3 w-[640px]'>
                    <button onClick={handleAnswerClick}
                        className={`h-[120px] p-3 text-xl font-bold border-1 border border-white rounded-2xl 
                        ${answerCorrect[0] === 1 ? 'bg-green-500' : ''} ${answerIncorrect[0] === 1 ? 'bg-red-500' : ''} `}
                        data-id='0'>
                        {countryList[flagCountryCodes[0]]}
                    </button>
                    <button onClick={handleAnswerClick}
                        className={`p-3 text-xl font-bold border-1 border border-white rounded-2xl
                        ${answerCorrect[1] === 1 ? 'bg-green-500' : ''} ${answerIncorrect[1] === 1 ? 'bg-red-500' : ''} `}
                        data-id='1'>
                        {countryList[flagCountryCodes[1]]}
                    </button>
                    <button onClick={handleAnswerClick}
                        className={`p-3 text-xl font-bold border-1 border border-white rounded-2xl
                        ${answerCorrect[2] === 1 ? 'bg-green-500' : ''} ${answerIncorrect[2] === 1 ? 'bg-red-500' : ''} `}
                        data-id='2'>
                        {countryList[flagCountryCodes[2]]}
                    </button>
                    <button onClick={handleAnswerClick}
                        className={`p-3 text-xl font-bold border-1 border border-white rounded-2xl
                        ${answerCorrect[3] === 1 ? 'bg-green-500' : ''} ${answerIncorrect[3] === 1 ? 'bg-red-500' : ''} `}
                        data-id='3'>
                        {countryList[flagCountryCodes[3]]}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Game