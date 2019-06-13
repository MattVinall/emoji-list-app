import React from 'react';
import '../App.css';
import axios from 'axios';

class DisplayEmojis extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		const url = 'http://localhost:3001/emojis';
		fetch(url).then((resp) => resp.json()).then((emoji) => {
			this.setState({
				data: emoji
			});
			console.log(this.state.data);
		});
	}

	render() {
		return <h1>hello</h1>;
	}
}

export default DisplayEmojis;
