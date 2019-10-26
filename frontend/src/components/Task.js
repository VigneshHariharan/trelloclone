import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from 'antd';

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
					<Icon type="delete" onClick={() => props.deleteTask(props.task.id, props.columnId)} />
				</div>
			)}
		</Draggable>
	);
};

export default Task;
