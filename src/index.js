import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider, useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import { Clear } from '@mui/icons-material'
import AppProvider from "./redux_fake/AppProvider";
import { initAppState } from "./redux_fake/AppContext";

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      action={id => {
        const { closeSnackbar } = useSnackbar()
        return (
          <IconButton size='small' onClick={() => closeSnackbar(id)}>
            <Clear />
          </IconButton>
        )
      }}
    >
      <AppProvider initState={initAppState}>
        <App />
      </AppProvider>
    </SnackbarProvider>
  </BrowserRouter>
  , document.getElementById('root'))