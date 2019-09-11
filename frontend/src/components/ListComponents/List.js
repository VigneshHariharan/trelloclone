import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Col, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

import Card from './Card';

export const List = (props) => {
	const [ item, setItem ] = useState('');

	const { lists, index, data } = props;
	let card = <Card key={(index * 100).toString()} data={lists[index].cards} />;

	const handleClick = () => {
		props.addCard(item, index);
		setItem('');
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') return handleClick();
	};

	return (
		<span>
			<h1>{data}</h1>
			<Col>
				{card}
				<InputGroup>
					<Input
						onChange={(e) => setItem(e.target.value)}
						onKeyPress={handleKeyPress}
						value={item}
						placeholder="Add a Card"
					/>
					<InputGroupAddon addonType="append">
						<InputGroupText onClick={handleClick}>+</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			</Col>
		</span>
	);
};

const mapStateToProps = (state) => {
	return {
		lists: state.lists
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addCard: (item, index) =>
			dispatch({
				type: 'ADD_CARD',
				payload: {
					cardItem: item,
					index
				}
			})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
