import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
	margin: 8px;
	border: 1px solid black;
	border-radius: 2px;
	min-width: 200px;
	display: flex;
	flex-direction: column;
`;
const Title = styled.h3`padding: 8px;`;
const TaskList = styled.div`
	padding: 8px;
	transition: background 1s ease;
	min-height: 100px;
	flex-grow: 1;
	background-color: ${(props) => (props.isDraggingOver ? 'white' : 'whitesmoke')};
`;

const Column = (props) => {
	return (
		<Draggable draggableId={props.column.id} index={props.index}>
			{(provided) => (
				<Container {...provided.draggableProps} ref={provided.innerRef}>
					<Title {...provided.dragHandleProps}>{props.column.title}</Title>
					<Droppable droppableId={props.column.id} type="task">
						{(provided, snapshot) => (
							<TaskList
								{...provided.droppableProps}
								ref={provided.innerRef}
								isDraggingOver={snapshot.isDraggingOver}
							>
								{props.tasks.map((task, index) => (
									<Task key={index} index={index} task={task} isDragging={snapshot.isDragging} />
								))}
								{provided.placeholder}
							</TaskList>
						)}
					</Droppable>
				</Container>
			)}
		</Draggable>
	);
};

export default Column;
