import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Col } from 'antd';

import Card from './Card';

export const AList = (props) => {
	const [ item, setItem ] = useState('');

	const { lists, index, data } = props;
	let card = <Card data={lists[index].cards} />;

	const handleClick = () => {
		props.addCard(item, index);
		setItem('');
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') return handleClick();
	};

	return (
		<span
			style={{
				padding: '20px',
				textAlign: 'start',
				color: '#333333',
				backgroundColor: '#73C9C3',
				borderRadius: '5px'
			}}
		>
			<p style={{ color: '#333333' }}>{data}</p>
			<Col span={8}>
				{card}
				<InputGroup style={{ marginTop: '10px' }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AList);
