import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import Column from './Columns';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('My Test Suite', () => {
	it('My Test Case', () => {
		expect(true).toEqual(true);
	});
});

describe('My first test ', () => {
	it('when add a list is pressed,a new list item should be open', () => {
		let wrapper = shallow(<Dashboard />);
		expect(wrapper.find('Column')).toBeTruthy();

		wrapper = shallow(<Dashboard />);
		expect(wrapper.find('Row').length).toBeFalsy();

		wrapper = shallow(<Column />);
		expect(wrapper.find('Draggable')).toBeTruthy();
	});
});
