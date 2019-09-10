import { createStore } from 'redux';

const initialState = {
	lists: [ 'cons', 'pros', 'adv' ],
	cards: [ 'cons', 'pros', 'adv' ]
};

const loadCards = (state = initialState, action) => {
	return state;
};

const store = createStore(loadCards);

export default store;
