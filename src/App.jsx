import "./styles.css"
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./RouteWrapper/ProtectedRoute"
import { useState } from "react"
import HomePage from "./HomePage/HomePage"
import LoginPage from "./LoginPage/LoginPage"
import { useContext } from "react"
import { AppContext } from "./redux_fake/AppContext"
import { useEffect } from "react"
import { axiosGet } from "./utils/axiosUtils"
import { BASE_API } from "./constants"
import { APP_REDUCER_TYPE } from "./redux_fake/AppReducer"
import Navbar from "./Navbar/Navbar"

const App = () => {
  const [appState, dispatch] = useContext(AppContext)
  const [checkToken, setCheckToken] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      const response = await axiosGet(`${BASE_API}/auth/user`, null, true)
      setCheckToken(true)
      if (response && response.success) {
        dispatch({ type: APP_REDUCER_TYPE.SET_SIGNED_IN, payload: true })
      }
    }
    checkToken()
  }, [])

  return (
    <>
      {checkToken &&
        <Box
          width='100vw'
          height='fit-content'
          minHeight='100vh'
          bgcolor='#92D091'
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Box>
      }
    </>
  )
}

export default App