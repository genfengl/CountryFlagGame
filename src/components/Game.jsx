import React, { useEffect } from 'react'
import { useState } from 'react'

const Game = () => {
    const [gameStart, setGameStart] = useState(false)
    const [timeLeft, setTimeLeft] = useState(3)
    const [flagCountryCodes, setFlagCountryCodes] = useState([])
    const [correctCountryCode, setCorrectCountryCode] = useState()
    const [correctAnswer, setCorrectAnswer] = useState()
    const [attemptedQuestion, setAttemptedQuestion] = useState()
    
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
        "BO": "Bolivia (Plurinational State of)",
        "BQ": "Bonaire, Sint Eustatius and Saba",
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
        "CD": "Congo (the Democratic Republic of the)",
        "CG": "Congo",
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
        "FK": "Falkland Islands [Malvinas]",
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
        "IR": "Iran (Islamic Republic of)",
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
        "KP": "Korea (the Democratic People's Republic of)",
        "KR": "Korea (the Republic of)",
        "KW": "Kuwait",
        "KG": "Kyrgyzstan",
        "LA": "Lao People's Democratic Republic",
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
        "FM": "Micronesia (Federated States of)",
        "MD": "Moldova (the Republic of)",
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
        "PS": "Palestine, State of",
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
        "MK": "Republic of North Macedonia",
        "RO": "Romania",
        "RU": "Russian Federation",
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
        "VE": "Venezuela (Bolivarian Republic of)",
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

    const handleStartButtonClick = () => {
        setGameStart(true)
        setAttemptedQuestion(0)
    }

    // a countdown timer for gamestart
    const gameStartTimer = setInterval(() => {
        if (gameStart === true && timeLeft > 0) {
            setTimeLeft(timeLeft - 1)
            clearInterval(gameStartTimer)
        }
    }, 1000)

    // useEffect for each question
    useEffect(() => {
        // generate four unique random numbers from 0-248, store them in flagRandomNumbers state
        const getFourRandomFlagCodes = () => {
            const fourRandomNumbers = []
            while (fourRandomNumbers.length < 4) {
                let candidateInt = Math.floor(Math.random() * countryCode.length)
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

        // const convertCodesToNames = (fourCodes) => {
        //     const fourCountryNames = []
        //     for (const code of fourCodes) {
        //         fourCountryNames.push(countryList[code])
        //     }
        //     return fourCountryNames
        // }

        // choose the correct answer, and convert the country code to country name
        // const getCorrectCountryName = (fourCodes) => {
        //     let correctChoice = Math.floor(Math.random() * 4)
        //     return countryList[fourCodes[correctChoice]]
        // }

        // assign answers to 4 answer states

        
        const playGame = () => {
            const fourNumbers = getFourRandomFlagCodes()
            const fourCodes = convertNumbersToFlagCodes(fourNumbers)
            const correctCode = getCorrectCode(fourCodes)

            setFlagCountryCodes(fourCodes)
            setCorrectCountryCode(correctCode)
            setCorrectAnswer(countryList[correctCode])
            
            
            
        }

        playGame()
        
    }, [attemptedQuestion])
    console.log(flagCountryCodes)
    console.log(correctCountryCode)

    return (
        <div className='flex justify-center items-center h-full'>
            <button onClick={handleStartButtonClick}
                className={`p-3 m-6 text-2xl font-bold border rounded-xl ${gameStart ? 'hidden' : ''}
            hover:bg-slate-700 hover:scale-105`}>
                Start
            </button>
            <div className={`text-5xl ${gameStart && timeLeft > 0 ? '' : 'hidden'} 
            animate-ping animation-delay-100`}>
                {timeLeft}
            </div>
            {/* The game itself */}
            <div>
                {/* Flag */}
                <div>
                    <img
                        src={`https://flagcdn.com/${correctCountryCode.toLowerCase()}.svg`}
                        width="360"
                        className={`${gameStart === true && timeLeft === 0 ? '' : 'hidden'}`}
                    />
                </div>
                {/* Answers */}
                <div className='grid'>
                    <button>
                        {countryList[flagCountryCodes[0]]}
                    </button>
                    <button>
                        {countryList[flagCountryCodes[1]]}
                    </button>
                    <button>
                        {countryList[flagCountryCodes[2]]}
                    </button>
                    <button>
                        {countryList[flagCountryCodes[3]]}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Game