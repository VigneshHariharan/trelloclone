import React from "react"
import styled from "styled-components"
import { Droppable } from "react-beautiful-dnd"

import Task from "./Task"

const Container = styled.div`
margin : 8px;
border : 1px solid lightgrey;
border-radius: 2px;
`
const Title = styled.h3`
padding : 8px;
`
const TaskList = styled.div`
padding : 8px;
`


const Column = (props) => {

  return <Container>
    <Title>
      {props.column.id}
    </Title>
    <Droppable droppableId={props.column.id}>

      {
        (provided) => <TaskList {...provided.droppableProps} ref={provided.innerRef}>
          {props.tasks.map((task, index) => <Task key={index} index={index} task={task}></Task>)}
          {provided.placeholder}
        </TaskList>
      }
    </Droppable>
  </Container>
}

export default Column