import React from "react"
import styled from "styled-components"
import { Draggable } from "react-beautiful-dnd"


const Container = styled.div`
margin : 8px;
border : 1px solid lightgrey;
margin-bottom : 8px;
background-color:white;
`
const Task = (props) => {
  return <Draggable index={props.index} draggableId={props.task.id}>
    {
      (provided) => <Container {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >{props.task.content}</Container>
    }
  </Draggable>
}

export default Task