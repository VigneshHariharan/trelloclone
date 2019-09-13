import React from 'react';
import { ListGroupItem } from 'reactstrap';

export const Card = (props) => {
	return (
		<div>
			{props.data.map((i, index) => {
				return <ListGroupItem key={index.toString()}>{i}</ListGroupItem>;
			})}
		</div>
	);
};

export default Card;
