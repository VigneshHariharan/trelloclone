import React from 'react';
import Dashboard from './Dashboard';
import { Layout, Typography } from 'antd';
const { Header } = Layout;
const { Title } = Typography;

const Home = () => {
	return (
		<div>
			<Header className="header">
				<Title id="trello">Trello</Title>
			</Header>
			<Dashboard />
		</div>
	);
};

export default Home;
