import { Add, Clear, Done } from "@mui/icons-material";
import { Button, ClickAwayListener, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { BASE_API } from "../../constants";
import { axiosGet, axiosPost } from "../../utils/axiosUtils";
import DraggableTodo from "./DraggableTodo";

const DroppableColumn = ({ name }) => {
  const [todos, setTodos] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [newTask, setNewTask] = useState('')

  const { enqueueSnackbar } = useSnackbar()

  const getTodos = async () => {
    const response = await axiosGet(`${BASE_API}/todo`, {
      status: name
    }, true)
    console.log(response)
    setTodos(response.data)
  }

  useEffect(() => {
    if (name)
      getTodos()
  }, [name])

  const addTask = async () => {
    const response = await axiosPost(`${BASE_API}/todo`, {
      "content": newTask,
      "status": name
    }, true)
    if (!response || !response.success) {
      enqueueSnackbar(response?.message || 'Có lỗi gì ý', { variant: 'error' })
      return
    }
    setOpenAdd(false)
    getTodos()
  }

  useEffect(() => {
    setNewTask('')
  }, [openAdd])

  return (
    <Box
      bgcolor='#00000020'
      width='270px'
      overflow='hidden'
      borderRadius='6px'
      height='calc(100% - 80px)'
      position='relative'

    >
      <Box
        width='100%'
        height='100%'
        sx={{
          backgroundColor: '#000000aa',
          backdropFilter: 'blur(5px)'
        }}
      >
      </Box>

      <Paper
        square
        sx={{
          backgroundColor: '#00000020',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        }}
      >
        <Box
          padding={1.5}
        >
          <Typography
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'white',
            }}
          >{name}</Typography>
        </Box>
      </Paper>

      <Droppable droppableId={name}>
        {(provided) => (
          <Box
            marginTop={0.2}
            paddingBottom={0.5}
            width='100%'
            overflow='scroll'
            height='calc(100% - 100px)'
            className="custom-scroll-bar"
            marginLeft={'7px'}
            paddingRight={0.5}
            display='flex'
            flexDirection='column'
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              position: 'absolute',
              top: '42px',
              left: 0,
            }}
          >
            <Box marginTop={0.5} />
            {todos.map((todo, index) => (
              <DraggableTodo key={todo._id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
            {openAdd &&
              <ClickAwayListener onClickAway={() => setOpenAdd(false)}>
                <Box>
                  <Paper
                    sx={{ marginBottom: 0.5, padding: 2 }}
                  >
                    <TextField
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      variant='standard'
                      autoFocus
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: '14px',
                          padding: 0
                        }
                      }}
                      multiline
                    />
                  </Paper>
                  <Box display='flex' justifyContent='flex-end'>
                    <IconButton size='small' color="primary" onClick={addTask} disabled={!newTask}>
                      <Done />
                    </IconButton>
                    <IconButton size='small' color="error" onClick={() => setOpenAdd(false)}>
                      <Clear />
                    </IconButton>
                  </Box>

                </Box>
              </ClickAwayListener>
            }
          </Box>
        )}
      </Droppable>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingX: 1,
          paddingBottom: 1,
          cursor: 'pointer'
        }}
        onClick={() => setOpenAdd(true)}
      >
        <Add style={{ color: 'white' }} />
        <Typography color='white'>Add a task</Typography>
      </Box>
    </Box>
  )
}


export default DroppableColumn