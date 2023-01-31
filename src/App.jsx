import { useContext } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Lobby from './components/Lobby'
import Navbar from './components/Navbar'
import Game from './components/Game'


function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />
    }
    return children
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/lobby' element={<ProtectedRoute>
            <Lobby />
          </ProtectedRoute>} />
          <Route path='/game/:uid' element={<ProtectedRoute>
            <Game />
          </ProtectedRoute>} />




        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
