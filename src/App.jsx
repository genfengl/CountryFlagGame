import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />}/>

          


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
