export const APP_REDUCER_TYPE = {
  SET_SIGNED_IN: 0,
}

const AppReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case APP_REDUCER_TYPE.SET_SIGNED_IN: {
      return {
        ...state,
        signed_in: payload
      }
    }
    default:
      return state
  }
}

export default AppReducer
