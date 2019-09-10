import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import List from './ListComponents/List';

export const Dashboard = (props) => {
	const lists = props.lists;
	let list = lists.map((i, index) => {
		return (
			<Col key={index.toString()}>
				<List data={i} />
			</Col>
		);
	});

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
				<Row>{list}</Row>
			</Container>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		lists: state.lists
	};
};

export default connect(mapStateToProps)(Dashboard);
