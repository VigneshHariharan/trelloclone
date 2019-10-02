import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './Task';

const Column = (props) => {
	return (
		<Draggable draggableId={props.column.id} index={props.index}>
			{(provided) => (
				<div className="all-tasks" {...provided.draggableProps} ref={provided.innerRef}>
					<h3 style={{ padding: '8px' }} {...provided.dragHandleProps}>
						{props.column.title}
					</h3>
					<Droppable droppableId={props.column.id} type="task">
						{(provided, snapshot) => (
							<div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
								{props.tasks.map((task, index) => (
									<Task key={index} index={index} task={task} isDragging={snapshot.isDragging} />
								))}
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
