import { Box, Button, Divider, Paper, TextField, Typography, useTheme } from "@mui/material"
import { axiosPost } from '../../utils/axiosUtils'
import { BASE_API } from '../../constants'
import { useSnackbar } from 'notistack'
import { APP_REDUCER_TYPE } from '../../redux_fake/AppReducer'
import { useContext } from "react"
import { AppContext } from "../../redux_fake/AppContext"
import { useNavigate } from "react-router-dom"
const LoginBox = () => {
  const [appState, dispatch] = useContext(AppContext)
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const username = elements['username'].value
    const password = elements['password'].value
    let response = await axiosPost(`${BASE_API}/auth/login`, {
      username, password
    })
    if (!response || !response.success) {
      enqueueSnackbar(response?.message || 'Sum ting wong', { variant: 'error' })
    } else {
      enqueueSnackbar('Nice, now do something', { variant: 'success' })
      localStorage.setItem('access_token', response.data.access_token)
      dispatch({ type: APP_REDUCER_TYPE.SET_SIGNED_IN, payload: true })
      navigate('/', { replace: true })
    }
  }

  return (
    <Paper
      style={{ padding: theme.spacing(2), display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      elevation={3}
    >
      <Typography variant='h6'>Login</Typography>
      <Divider flexItem orientation="horizontal" style={{ marginTop: theme.spacing(1.5), marginBottom: theme.spacing(1.5) }} />
      <form onSubmit={submit}>
        <Box marginTop={1.5} />
        <TextField
          name="username"
          variant="outlined"
          size="small"
          required
          label='username'
        />
        <Box marginTop={2.5} />
        <TextField
          name="password"
          variant="outlined"
          size="small"
          required
          label='password'
          type='password'
        />
        <Box marginTop={2.5} />
        <Button
          fullWidth
          variant='contained'
          type='submit'
          color="secondary"
        >Log in</Button>
      </form>

    </Paper>
  )
}

export default LoginBox