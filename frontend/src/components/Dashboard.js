import React, { useState } from 'react';
import Column from './Columns';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button, Input, Icon } from 'antd';
import 'antd/dist/antd.css';

const Dashboard = () => {
	const [ tasks, setTasks ] = useState({
		task1: {
			id: 'task1',
			content: 'content1'
		},
		task2: {
			id: 'task2',
			content: 'content2'
		},
		task3: {
			id: 'task3',
			content: 'content3'
		},
		task4: {
			id: 'task4',
			content: 'content4'
		},
		task5: {
			id: 'task5',
			content: 'content5'
		},
		task6: {
			id: 'task6',
			content: 'content6'
		}
	});

	const [ columns, setColumns ] = useState({
		column1: {
			id: 'column1',
			title: 'To Do',
			taskIds: [ 'task1', 'task2', 'task3', 'task4', 'task5', 'task6' ]
		},
		column2: {
			id: 'column2',
			title: 'InProgress',
			taskIds: []
		},
		column3: {
			id: 'column3',
			title: 'Completed',
			taskIds: []
		},
		column4: {
			id: 'column4',
			title: 'Completed',
			taskIds: []
		}
	});

	const [ columnOrder, setColumnOrder ] = useState([ 'column1', 'column2', 'column3', 'column4' ]);
	const [ columnTitle, setColumnTitle ] = useState('');
	const [ titleVisibility, setTitleVisibility ] = useState(false);

	const onDragStart = (result) => {};
	const onDragUpdate = (result) => {};
	const onDragEnd = (result) => {
		const { source, destination, draggableId, type } = result;
		// if there is no destination
		if (!destination) {
			return;
		}
		// if the drag start and end in same place
		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);
			setColumnOrder(newColumnOrder);
			return;
		}

		const start = columns[source.droppableId];
		const finish = columns[destination.droppableId];

		// For drag between a single column
		if (start === finish) {
			// creating a new column
			const column = columns[source.droppableId];
			// creating new taskIds
			const newTaskIds = column.taskIds;
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);
			// creating new Column to avoid mutation
			// changing a single column to persist all the remaining properties
			const newColumn = {
				...column,
				taskIds: newTaskIds
			};
			// replacing the new column in the state
			setColumns({
				...columns,
				[newColumn.id]: newColumn
			});
			return;
		}

		// For drag and drop between multiple columns
		const newStartTaskIds = Array.from(start.taskIds);
		newStartTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: newStartTaskIds
		};

		const newFinishTaskIds = Array.from(finish.taskIds);
		newFinishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: newFinishTaskIds
		};

		setColumns({ ...columns, [newStart.id]: newStart, [newFinish.id]: newFinish });
		return;
	};

	const changeTitleVisibility = () => {
		setTitleVisibility(!titleVisibility);
	};

	const addColumn = () => {
		// To add a column, a columnOrder and a new Column should be created to map through the tasks
		// when a column title is added it needs to be stored in a object(id,title,taskIds)
		// a new Column object is created,it needs to be concatenate in the the columns array
		if (columnTitle.length > 0) {
			// writing new column id by not considering the deleted elements number
			// it is also considering the possibility of not having any columns
			const newReference = columns ? columns[`column${columnOrder.length ? columnOrder.length : ''}`] : '';
			const columnOrderLength = columnOrder.length ? parseInt(newReference.id[6]) : 0;
			const column = `column${columnOrderLength + 1}`;
			const newColumn = {
				id: column,
				title: columnTitle,
				taskIds: []
			};

			setColumnOrder([ ...columnOrder, newColumn.id ]);
			setColumns({ ...columns, [newColumn.id]: newColumn });
			changeTitleVisibility();
			setColumnTitle('');
		}
	};

	const addTask = (column, task) => {
		// adding taskIds in the respective column of the task
		const columnId = columns[column];
		const taskLength = Object.keys(tasks).length + 1;
		const newTask = {
			id: `task${taskLength}`,
			content: task
		};

		const newTaskIds = [ ...columnId.taskIds, [ newTask.id ] ];
		columnId.taskIds = newTaskIds;
		const newColumn = { ...columns, [column]: columnId };
		setColumns(newColumn);

		// creating a new task object to add in the task list object
		const newTasks = { ...tasks, [newTask.id]: newTask };
		setTasks(newTasks);
	};

	const deleteTask = (task, column) => {
		const newTasks = {};
		//Deleting a task
		Object.keys(tasks).map((taskObject) => {
			if (taskObject !== task) {
				return (newTasks[taskObject] = tasks[taskObject]);
			}
		});
		setTasks(newTasks);

		// removing its reference in columns object
		const index = columns[column].taskIds.indexOf(task);
		const newColumn = columns[column].taskIds.splice(index, 1);
		const newColumnsObject = { ...columns, newColumn };
		setColumns(newColumnsObject);
	};

	const deleteColumn = (column) => {
		const newColumnOrder = columnOrder.filter((columns) => columns !== column);
		setColumnOrder(newColumnOrder);

		// making a new Column object and updating references
		const newColumns = {};
		Object.keys(columns).map((columnObject) => {
			if (columnObject !== column) {
				return (newColumns[columnObject] = columns[columnObject]);
			}
		});
		setColumns(newColumns);
	};

	return (
		<div>
			<DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
				<Droppable droppableId="all-columns" direction="horizontal" type="column">
					{(provided, index) => {
						return (
							<div className="all-columns" {...provided.droppableProps} ref={provided.innerRef}>
								{columnOrder.map((columnId, index) => {
									const column = columns[columnId];
									const task = column.taskIds.map((taskIds) => tasks[taskIds]);
									return (
										<Column
											key={column.id}
											column={column}
											tasks={task}
											addTask={addTask}
											index={index}
											deleteTask={deleteTask}
											deleteColumn={deleteColumn}
										/>
									);
								})}
								{provided.placeholder}

								<div>
									{titleVisibility ? (
										<div className="title-input add-list-button">
											<Input
												type="text"
												onChange={(e) => setColumnTitle(e.target.value)}
												onKeyPress={(e) => {
													if (e.key === 'Enter') addColumn();
												}}
												autoFocus
											/>
											<div>
												<Button onClick={addColumn} type="primary">
													Enter title
												</Button>
												<Icon onClick={changeTitleVisibility} type="close-circle" />
											</div>
										</div>
									) : (
										<Button type="primary" className="add-list" onClick={changeTitleVisibility}>
											Add List
										</Button>
									)}
								</div>
							</div>
						);
					}}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default Dashboard;
