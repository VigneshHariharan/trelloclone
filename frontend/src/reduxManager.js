import { createStore } from 'redux';

const initialState = {
	lists: []
};

const load = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_LIST':
			let list = { list: action.payload.listItem, cards: [] };
			return { ...state, lists: [ ...state.lists, list ] };

		case 'ADD_CARD':
			state.lists[action.payload.index].cards = [
				...state.lists[action.payload.index].cards,
				action.payload.cardItem
			];
			return { ...state };

		default:
			return state;
	}
};

const store = createStore(load);

export default store;
