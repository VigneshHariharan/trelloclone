import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Input, Icon } from 'antd';
import Task from './Task';
import styled from 'styled-components';

const DragArea = styled.div``;
const DropArea = styled.div``;

const Column = (props) => {
	const [ taskVisibility, setTaskVisibility ] = useState(false);
	const [ task, setTask ] = useState('');

	const addTask = () => {
		if (task.length > 0) {
			props.addTask(props.column.id, task);
			setTaskVisibility(!taskVisibility);
			setTask('');
		}
	};
	return (
		<Draggable draggableId={props.column.id} index={props.index}>
			{(provided) => (
				<DropArea>
					<div className="all-tasks" {...provided.draggableProps} ref={provided.innerRef}>
						<p
							style={{ padding: '8px', margin: '0px', textAlign: 'left', paddingLeft: '24px' }}
							{...provided.dragHandleProps}
						>
							{props.column.title}{' '}
							<Icon type="delete" onClick={() => props.deleteColumn(props.column.id)} />
						</p>
						<Droppable droppableId={props.column.id} type="task">
							{(provided) => (
								<div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
									{props.tasks.map((task, index) => (
										<Task
											key={index}
											index={index}
											task={task}
											deleteTask={props.deleteTask}
											columnId={props.column.id}
										/>
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>
						<div className="task-add-button">
							{!taskVisibility ? (
								<Button type="primary" onClick={setTaskVisibility}>
									Add Card
								</Button>
							) : (
								<DragArea className="title-input add-card-button">
									<Input
										type="text"
										className="title"
										onChange={(e) => setTask(e.target.value)}
										onKeyPress={(e) => {
											if (e.key === 'Enter') addTask();
										}}
										autoFocus
									/>
									<div>
										<Button type="primary" onClick={addTask}>
											Enter title
										</Button>
										<Icon onClick={() => setTaskVisibility(!taskVisibility)} type="close-circle" />
									</div>
								</DragArea>
							)}
						</div>
					</div>
				</DropArea>
			)}
		</Draggable>
	);
};

export default Column;
