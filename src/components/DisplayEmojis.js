import React from 'react';
import '../App.css';
import emojiData from '../conversion/convertToJson';

class DisplayEmojis extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
		console.log(emojiData);
	}

	render() {
		return <h1>hello</h1>;
	}
}

export default DisplayEmojis;
