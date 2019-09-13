import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, ListGroup } from 'reactstrap';
import { Col, Row, Layout } from 'antd';

import { connect } from 'react-redux';
import List from './ListComponents/List';
import '../App.css';
import './Dashboard.css';

export const Dashboard = (props) => {
	const [ item, setItem ] = useState('');
	const { Header, Content } = Layout;

	const lists = props.lists;

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
		<Layout>
			<Header>
				<Row>
					<Col>{/* Add a Title Bar here */}</Col>
				</Row>

				<Col>NavBar</Col>
				<Row />
			</Header>
			<Content style={{ height: '100%' }}>
				<div
					id="Content"
					style={{
						display: 'flex',
						flexWrap: 'nowrap',
						overflowX: 'auto',
						overflowY: 'hidden',
						alignItems: 'stretch',
						height: '100%'
					}}
				>
					{lists.map((i, index) => {
						return (
							<Col className="lists" key={index.toString()}>
								<ListGroup>
									<List data={i.list} index={index} />
								</ListGroup>
							</Col>
						);
					})}
					<div>
						<InputGroup style={{ width: '250px', height: '38px', margin: '20px', marginRight: '50px' }}>
							<Input
								style={{ width: '80%' }}
								onChange={(e) => setItem(e.target.value)}
								onKeyPress={handleKeyPress}
								value={item}
								placeholder="Add a list"
							/>
							<InputGroupAddon style={{ width: '20%' }} addonType="append">
								<InputGroupText onClick={handleClick}>+</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
					</div>
				</div>
				<br />
			</Content>
		</Layout>
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
