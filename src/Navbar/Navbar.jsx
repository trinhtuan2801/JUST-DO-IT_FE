import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useContext } from "react"
import { AppContext } from "../redux_fake/AppContext"
import { Logout } from '@mui/icons-material'
import { Link, useNavigate } from "react-router-dom"
const Navbar = () => {
  const [appState, dispatch] = useContext(AppContext)
  const { signed_in } = appState
  const logout = () => {
    localStorage.setItem('access_token', '')
    window.location.reload()
  }
  const navigate = useNavigate()
  return (
    <AppBar component='nav' color='transparent'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography component='div' variant='h6' onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >Just do it</Typography>

        {signed_in &&
          <IconButton color="inherit" onClick={logout}>
            <Logout />
          </IconButton>
        }

      </Toolbar>
    </AppBar>
  )
}

export default Navbar

