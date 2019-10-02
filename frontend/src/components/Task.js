import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = (props) => {
	return (
		<Draggable key={props.task.id} index={props.index} draggableId={props.task.id}>
			{(provided) => (
				<div
					className="task"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{props.task.content}
				</div>
			)}
		</Draggable>
	);
};

export default Task;
