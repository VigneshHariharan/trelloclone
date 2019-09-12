import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Col, Row } from 'antd';

import { connect } from 'react-redux';
import List from './ListComponents/List';

export const Dashboard = (props) => {
	const [ item, setItem ] = useState('');

	const lists = props.lists;
	let list = lists.map((i, index) => {
		return (
			<Col
				style={{
					flex: '0 0 auto',
					width: '250px',
					margin: '20px'
				}}
				key={index.toString()}
			>
				<List data={i.list} index={index} />
			</Col>
		);
	});

	const handleClick = () => {
		if (item !== '') {
			props.addList(item);
			setItem('');
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') return handleClick();
	};

	return (
		<div>
			<Row>
				<Col>{/* Add a Title Bar here */}</Col>
			</Row>

			<Col>NavBar</Col>
			<Row />

			<div
				style={{
					display: 'flex',
					flexWrap: 'nowrap',
					overflowX: 'auto'
				}}
			>
				{list}
				<InputGroup style={{ width: '250px', height: '38px', margin: '20px' }}>
					<Input
						onChange={(e) => setItem(e.target.value)}
						onKeyPress={handleKeyPress}
						value={item}
						placeholder="Add a list"
					/>
					<InputGroupAddon addonType="append">
						<InputGroupText onClick={handleClick}>+</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			</div>
			<br />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		lists: state.lists
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addList: (item) =>
			dispatch({
				type: 'ADD_LIST',
				payload: {
					listItem: item
				}
			})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
