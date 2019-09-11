import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import List from './ListComponents/List';

export const Dashboard = (props) => {
	const [ item, setItem ] = useState('');

	const lists = props.lists;
	let list = lists.map((i, index) => {
		return (
			<Col key={index.toString()}>
				<List data={i.list} index={index} />
			</Col>
		);
	});

	const handleClick = () => {
		props.addList(item);
		setItem('');
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') return handleClick();
	};

	return (
		<div>
			<Container>
				<Row>
					<Col>{/* Add a Title Bar here */}</Col>
				</Row>

				<Row>
					<Col>Title</Col>
					<Col>Title</Col>
					<Col>Title</Col>
				</Row>
				<Row>
					{list}
					<Col>
						<InputGroup>
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
					</Col>
				</Row>
			</Container>
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
