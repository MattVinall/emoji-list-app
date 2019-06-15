import React from 'react';
import '../App.css';
// import axios from 'axios';

class DisplayEmojis extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			searchTerm: '',
			favourites: []
		};
	}

	componentDidMount() {
		this.getEmojiData();
	}

	getEmojiData = () => {
		const url = 'http://localhost:3001/emojis';
		fetch(url).then((resp) => resp.json()).then((emoji) => {
			this.setState({
				data: emoji
			});
			console.log(this.state.data);
		});
	};

	handleChange = (e) => {
		const { id, value } = e.target;
		this.setState({
			[id]: value
		});
	};

	render() {
		return (
			<div>
				<form className="searchBar" onSubmit={this.handleSubmit}>
					<label htmlFor="searchTerm">
						Search Emojis:
						<input
							type="text"
							placeholder="search your favourite emojis"
							id="searchTerm"
							value={this.state.searchTerm}
							onChange={this.handleChange}
							name="searchTerm"
						/>
					</label>
				</form>
				<div className="emojiContainer">
					{this.state.data ? (
						this.state.data
							.filter(
								(data) =>
									data.english.includes(this.state.searchTerm) ||
									data.arabic.includes(this.state.searchTerm)
							)
							.map((item, index) => {
								return (
									<ul key={index}>
										<li>
											{item.emoji} - {item.english}
										</li>
										<p>{item.arabic}</p>
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
