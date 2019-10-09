import React from 'react';
import Dashboard from './Dashboard';
import { Layout } from 'antd';
const { Header, Content } = Layout;

const Home = () => {
	return (
		<div>
			<Header className="header">
				<h1 id="trello">Trello</h1>
			</Header>
			<Content className="content">
				<Dashboard />
			</Content>
		</div>
	);
};

export default Home;
