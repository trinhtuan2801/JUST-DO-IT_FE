import { Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Draggable } from "react-beautiful-dnd"

const DraggableTodo = ({ todo, index }) => {
  return (
    <Draggable draggableId={todo._id} index={index}>
      {(provided, snapshot) => (
        <Paper
          sx={{ marginBottom: 0.5 }}
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            sx={{
              padding: 2,
              width: '100%'
            }}
          >
            <Typography
              sx={{fontSize: '14px', color: '#172b4d'}}
            >{todo.content}</Typography>
          </Box>
        </Paper>
      )}
    </Draggable>
  )
}

export default DraggableTodo