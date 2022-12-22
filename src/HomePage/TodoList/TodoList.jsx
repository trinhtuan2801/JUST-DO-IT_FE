import { Box, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { BASE_API } from "../../constants"
import TrashBin from '../../images/trashbin.png'
import { axiosGet } from "../../utils/axiosUtils"
import DroppableColumn from "./DroppableColumn"
import { LoremIpsum } from 'lorem-ipsum'
const statuses = ['TODO', 'PROGRESS', 'DONE']
const lorem = new LoremIpsum()
const initLists = {
  'TODO': [
    {
      id: 'TODO-1',
      content: lorem.generateWords(20)
    },
    {
      id: 'TODO-2',
      content: lorem.generateWords(20)
    },
    {
      id: 'TODO-3',
      content: lorem.generateWords(25)
    },
    {
      id: 'TODO-4',
      content: lorem.generateWords(30)
    },
  ],
  'PROGRESS': [
    {
      id: 'PROGRESS-1',
      content: 'PROGRESS-1'
    },
    {
      id: 'PROGRESS-2',
      content: 'PROGRESS-2'
    },
  ],
  'DONE': [
    {
      id: 'DONE-1',
      content: 'DONE-1'
    },
    {
      id: 'DONE-2',
      content: 'DONE-2'
    },
  ],
  'DELETE': [

  ]
}
const TodoList = () => {

  const [lists, setLists] = useState(initLists)

  const onDragEnd = (result) => {
    if (!result.destination) return
    const listCopy = { ...lists }
    const sourceColumnId = result.source.droppableId
    const sourceTodoIndex = result.source.index
    const sourceList = listCopy[sourceColumnId]
    const newSourceList = Array.from(sourceList)
    const [movedTodo] = newSourceList.splice(sourceTodoIndex, 1)

    listCopy[sourceColumnId] = newSourceList

    const destColumnId = result.destination.droppableId

    if (destColumnId === 'DELETE') {

    } else {
      const destTodoIndex = result.destination.index
      const destList = listCopy[destColumnId]
      const newDestList = Array.from(destList)
      newDestList.splice(destTodoIndex, 0, movedTodo)

      listCopy[destColumnId] = newDestList
    }

    setLists(listCopy)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        height='100%'
        width='100%'
        paddingTop={2}
      >
        <Box
          width='100%'
          display='flex'
          columnGap={10}
          height='calc(100% - 260px)'
          justifyContent='center'
        >
          {statuses.map((status) => (
            <DroppableColumn
              // todos={lists[status]}
              key={status}
              name={status}
            />
          ))}
        </Box>
        <Box display='flex' width='100%' justifyContent='center' position='relative'>
          <Droppable droppableId={'DELETE'}>
            {(provided) => (
              <Box
                width='270px'
                height='250px'
                // bgcolor='yellow'
                {...provided.droppableProps}
                ref={provided.innerRef}
                position='relative'
                left='-15px'
              >

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <img
            src={TrashBin}
            width='230px'
            height='250px'
            style={{ position: 'absolute', bottom: '0px', transform: 'translateX(-10%)' }}
          />
        </Box>

      </Box>

    </DragDropContext>
  )
}

export default TodoList