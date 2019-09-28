import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
	margin: 8px;
	border: 1px solid black;
	border-radius: 2px;
	width: 200px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;
const Title = styled.h3`padding: 8px;`;
const TaskList = styled.div`
	padding: 8px;
	min-height: 200px;
	background-color: ${(props) => (props.isDraggingOver ? 'white' : 'whitesmoke')};
`;

const Column = (props) => {
	return (
		<div>
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
		</div>
	);
};

export default Column;
