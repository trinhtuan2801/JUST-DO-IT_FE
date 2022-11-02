import { useReducer } from "react"
import { AppContext } from "./AppContext"
import AppReducer from "./AppReducer"

const AppProvider = ({ children, initState }) => {
  const [state, dispatch] = useReducer(AppReducer, initState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider