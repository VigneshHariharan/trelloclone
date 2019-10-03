import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Input, Icon } from 'antd';

import Task from './Task';

const Column = (props) => {
	const [ taskVisibility, setTaskVisibility ] = useState(false);
	const [ task, setTask ] = useState('');

	const addTask = () => {
		props.addTask(props.column.id, task);
		setTaskVisibility(!taskVisibility);
	};
	return (
		<Draggable draggableId={props.column.id} index={props.index}>
			{(provided) => (
				<div className="all-tasks" {...provided.draggableProps} ref={provided.innerRef}>
					<h3 style={{ padding: '8px' }} {...provided.dragHandleProps}>
						{props.column.title}
					</h3>
					<Droppable droppableId={props.column.id} type="task">
						{(provided) => (
							<div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
								{props.tasks.map((task, index) => <Task key={index} index={index} task={task} />)}
								{!taskVisibility ? (
									<Button type="primary" onClick={setTaskVisibility}>
										Add a task
									</Button>
								) : (
									<div>
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
											<Icon
												onClick={() => setTaskVisibility(!taskVisibility)}
												type="close-circle"
											/>
										</div>
									</div>
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

export default Column;
