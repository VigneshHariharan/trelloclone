import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

import Card from './Card';

export const List = (props) => {
	const { cards, data } = props;
	let card = cards.map((i, index) => <Card key={(index * 100).toString()} data={i} />);
	return (
		<div>
			<h1>{data}</h1>
			<Col>{card}</Col>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		cards: state.cards
	};
};

export default connect(mapStateToProps)(List);
