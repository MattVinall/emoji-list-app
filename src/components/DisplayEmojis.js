import React from 'react';
import '../App.css';
// import axios from 'axios';

class DisplayEmojis extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			searchTerm: '',
			searchParam: ''
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

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			searchParam: this.state.searchTerm,
			searchTerm: ''
		});
	};

	render() {
		return (
			<div>
				<form className="searchBar" onSubmit={this.handleSubmit}>
					<label htmlFor="searchTerm">Search Emojis:</label>
					<input
						type="text"
						placeholder="search your favourite emojis"
						id="searchTerm"
						value={this.state.searchTerm}
						onChange={this.handleChange}
					/>
				</form>
				<div className="emojiContainer">
					{this.state.data ? (
						this.state.data
							.filter((data) => data.english.includes(this.state.searchTerm))
							.map((item, index) => {
								return (
									<ul key={index}>
										<li>
											{item.emoji} - {item.english}
										</li>
									</ul>
								);
							})
					) : null}
				</div>
			</div>
		);
	}
}

export default DisplayEmojis;
