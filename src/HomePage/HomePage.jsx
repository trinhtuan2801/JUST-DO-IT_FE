import { Box, Button, MenuItem, TextField, Typography, useTheme } from "@mui/material"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../redux_fake/AppContext"
import TodoList from "./TodoList/TodoList"
import '../HomePage/TodoList/TrashAnim.css'

const HomePage = () => {
  const [appState, dispatch] = useContext(AppContext)
  const { signed_in } = appState
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box
      width='100%'
      height='100vh'
      minHeight='fit-content'
      paddingTop='64px'
    >
      <Box
        width='100%'
        height='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        position='relative'
      >
 
        <Background />

        <Box position='absolute' top={0} left={0} width='100%' height='100%'>
          {signed_in ?
            <TodoList />
            :
            <LoginButton />
          }
        </Box>

      </Box>
    </Box>
  )
}

export default HomePage

const Background = () => {
  return (
    <Box
      style={{
        background: "url('https://cdn.vox-cdn.com/thumbor/1VcDuU0iRSOCke44DoSG-CofflM=/0x0:1500x1125/1400x1050/filters:focal(0x0:1500x1125):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/46469860/justdoitshia.0.0.png')",
        height: 'calc(100vh - 64px)',
        width: '1400px',
        maxWidth: '100%',
        boxShadow: 'rgb(159 216 158) 0px 20px 30px inset',
        backgroundPosition: '50% 100%',
        // position: 'absolute',
      }}
    />
  )
}

const LoginButton = () => {
  const navigate = useNavigate()
  return (
    <Box
      height='100%'
      width='100%'
      display='flex'
      justifyContent='center'
      position='relative'
    >
      <Button
        variant='contained'
        onClick={() => navigate('/login')}
        sx={{
          position: 'relative',
          height: 'fit-content',
          position: 'absolute',
          bottom: '150px',
          transform: 'rotate(-30deg)',
          transition: 'all 0.2s',
          transformOrigin: '0% 50%',
          ':hover': {
            transform: 'rotate(-30deg) scaleX(1.8)'
          }
        }}
      >
        Login
      </Button>
    </Box>
  )
}