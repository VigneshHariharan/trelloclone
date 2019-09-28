import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	margin-bottom: 8px;
	background-color: white;
	background-color: ${(props) => (props.isDragging ? 'whitesmoke' : 'lightblue')};
`;
const Task = (props) => {
	return (
		<Draggable key={props.task.id} index={props.index} draggableId={props.task.id}>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
				>
					{props.task.content}
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
