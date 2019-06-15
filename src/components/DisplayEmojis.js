import React, { Fragment } from 'react';
import '../App.css';
// import axios from 'axios';

class DisplayEmojis extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			searchTerm: '',
			favourites: [],
			english: true
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

	handleClick = (e) => {
		e.preventDefault();
		this.setState({
			english: !this.state.english
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
					<button onClick={this.handleClick}>
						{this.state.english ? <p>Change to Arabic</p> : <p>Change to English</p>}
					</button>
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
									<Fragment>
										<ul key={index}>
											{this.state.english ? (
												<li>
													{item.emoji} - {item.english}
													<button type="submit" value="submit" />
												</li>
											) : (
												<li>
													{item.emoji} - {item.arabic}
													<button type="submit" value="submit" />
												</li>
											)}
										</ul>
									</Fragment>
								);
							})
					) : null}
				</div>
			</div>
		);
	}
}

export default DisplayEmojis;
