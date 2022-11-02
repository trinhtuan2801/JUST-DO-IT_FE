import { useEffect } from "react"
import { BASE_API } from "../../constants"
import { axiosGet } from "../../utils/axiosUtils"

const TodoList = () => {

  const getTodos = async () => {
    const response = await axiosGet(`${BASE_API}/todo`, null, true)
    console.log(response)
  }

  useEffect(()=>{
    getTodos()
  }, [])

  return (
    <>
    </>
  )
}

export default TodoList