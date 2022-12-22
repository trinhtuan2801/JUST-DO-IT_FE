import { Box } from '@mui/material'
import { useContext, useEffect, useState } from "react"
import { Route, Routes } from 'react-router-dom'
import { BASE_API } from "./constants"
import HomePage from "./HomePage/HomePage"
import LoginPage from "./LoginPage/LoginPage"
import Navbar from "./Navbar/Navbar"
import { AppContext } from "./redux_fake/AppContext"
import { APP_REDUCER_TYPE } from "./redux_fake/AppReducer"
import "./styles.css"
import { axiosGet } from "./utils/axiosUtils"
import './styles/CustomScrollBar.css'
import './styles/Draggable.css'
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