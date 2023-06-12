import { useContext, useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Lobby from './components/Lobby'
import Game from './components/Game'
import Leaderboard from './components/Leaderboard'
import Credits from './components/Credits'
import NotFound from './components/NotFound'

function App() {
  const [countryList, setCountryList] = useState(
    {
      "AF": "Afghanistan",
      "AL": "Albania",
      "DZ": "Algeria",
      "AS": "American Samoa",
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
    }
  )
  const [sixtyFlagCodes, setSixtyFlagCodes] = useState()
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  const LoggedInRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }
    return children
  }

  useEffect(() => {
    // Generate array of flags for top animation bar
    const topAnimationFlags = () => {
      const countryCodes = Object.keys(countryList)
      const flagCodes = []
      while (flagCodes?.length < 60) {
        let candidateInt = Math.floor(Math.random() * countryCodes.length)
        if (flagCodes.indexOf(countryCodes[candidateInt]) === -1) {
          flagCodes.push(countryCodes[candidateInt])
        }
      }
      return setSixtyFlagCodes(flagCodes)
    }
    topAnimationFlags()
    // console.log(countryCodes)
    return () => {
    }
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ProtectedRoute>
            <NotFound />
          </ProtectedRoute>} />
          <Route path='/login' element={<LoggedInRoute>
            <Login countryList={countryList} sixtyFlagCodes={sixtyFlagCodes} />
          </LoggedInRoute>} />
          <Route path='/register' element={<LoggedInRoute>
            <Register sixtyFlagCodes={sixtyFlagCodes} countryList={countryList} />
          </LoggedInRoute>} />
          <Route path='/' element={<ProtectedRoute>
            <Lobby sixtyFlagCodes={sixtyFlagCodes} />
          </ProtectedRoute>} />
          <Route path='/leaderboard' element={<ProtectedRoute>
            <Leaderboard sixtyFlagCodes={sixtyFlagCodes} />
          </ProtectedRoute>} />
          <Route path='/game' element={<ProtectedRoute>
            <Game countryList={countryList} />
          </ProtectedRoute>} />
          <Route path='/credits' element={<ProtectedRoute>
            <Credits sixtyFlagCodes={sixtyFlagCodes} />
          </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
