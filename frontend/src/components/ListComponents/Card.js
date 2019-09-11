import React from 'react';

export const Card = (props) => {
	return <div>{props.data ? props.data.map((i, index) => <p key={index.toString()}>{i}</p>) : ''}</div>;
};

export default Card;
