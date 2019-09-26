import React, { useState } from 'react';
import Column from './Columns';
import { DragDropContext } from 'react-beautiful-dnd'

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    'task1': { id: 'task1', content: 'content1' },
    'task2': { id: 'task2', content: 'content2' },
    'task3': { id: 'task3', content: 'content3' },
    'task4': { id: 'task4', content: 'content4' },
    'task5': { id: 'task5', content: 'content5' },
    'task6': { id: 'task6', content: 'content6' },
  })

  const [columns, setColumns] = useState({
    'column1': {
      id: "column1",
      title: 'Trello',
      taskIds: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6']
    },
    'column2': {
      id: "column2",
      title: 'Trello',
      taskIds: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6']
    }
  })

  const [columnOrder, setColumnOrder] = useState(['column1'])

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    console.log(result)
    // if there is no destination
    if (!destination) {
      return
    }
    // if the drag start and end in same place
    if ((source.droppableId === destination.droppableId) && (source.index === destination.index)) {
      return
    }
    // creating a new column
    const column = columns[source.droppableId]
    // creating new taskIds
    const newTaskIds = column.taskIds
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 1, draggableId)
    // creating new Column to avoid mutation 
    // changing a single column to persist all the remaining properties
    const newColumn = { ...column, taskIds: newTaskIds }
    // replacing the new column in the state
    setColumns({ ...columns, [newColumn.id]: newColumn })
  }

  return <DragDropContext onDragEnd={onDragEnd}>
    {columnOrder.map((columnId, index) => {
      const column = columns[columnId]
      const task = column.taskIds.map(taskIds => tasks[taskIds])
      return <Column key={index} column={column} tasks={task}></Column>
    })}
  </DragDropContext>

}

export default Dashboard