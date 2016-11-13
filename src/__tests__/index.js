import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import FormNovaPochta from '../index';

/*
describe('Прбный тест', () => {
	it('simulates click events', () => {
		const buttonClick = sinon.spy();
//		console.log(buttonClick);
		const wrapper = shallow(
			<MyComponent handleClick={buttonClick}/>
		);
		wrapper.find('button').simulate('click');
		expect(buttonClick.calledOnce).to.equal(true);
	});

});
 */

// Shallow Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md


describe('Тест элементов модуля', () => {
	const wrapper = shallow(<FormNovaPochta apiKey="not"/>);
	const state = wrapper.state();

	it('Количество тегов <select>: 3', () => {
		let wf = wrapper.find('select');
		expect(wf).to.have.length(3);
	});

	it('Пустой массив `state.listAreas`', () => {
		expect(state.listAreas).to.have.length(0);
	});

	it('Пустой массив `state.listCities:`', () => {
		expect(state.listCities).to.have.length(0);
	});

	it('Пустой массив `state.listCitiesCurrent`', () => {
		expect(state.listCitiesCurrent).to.have.length(0);
	});

	it('Пустой массив `state.listWarehouses`', () => {
		let state = wrapper.state();
		expect(state.listWarehouses).to.have.length(0);
	});



 /*
	it('simulates click events', () => {
		const buttonClick = sinon.spy();
		const wrapper = shallow(
			<MyComponent handleClick={buttonClick}/>
		);
		wrapper.find('button').simulate('click');
		expect(buttonClick.calledOnce).to.equal(true);
	});
  */
});



// Full DOM Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md


describe('Full DOM Rendering', () => {

	it('Test apiKey to set props', () => {
		const wrapper = mount(<FormNovaPochta apiKey='Test apiKey' />);
		expect(wrapper.props().apiKey).to.equal('Test apiKey');
//		wrapper.setProps({bar: 'foo'});
//		expect(wrapper.props().bar).to.equal('foo');
	});

	it('calls componentDidMount', () => {
		sinon.spy(FormNovaPochta.prototype, 'componentDidMount');
		const wrapper = mount(<FormNovaPochta apiKey='Test apiKey' />);
		expect(FormNovaPochta.prototype.componentDidMount.calledOnce).to.be.true;
		FormNovaPochta.prototype.componentDidMount.restore();
	});

});


// Static Rendered Markup
// https://github.com/airbnb/enzyme/blob/master/docs/api/render.md


describe('Static Rendered Markup', () => {

	it('renders three `.icon-test`s', () => {
		const wrapper = render(<FormNovaPochta apiKey='Test apiKey' />);
		expect(wrapper.find('select').length).to.equal(3);
	});

});

