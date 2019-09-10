import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export class Dashboard extends Component {
	render() {
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
				</Container>
			</div>
		);
	}
}

export default Dashboard;
