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

	handleFavourites = (e) => {
		e.preventDefault();
		this.setState({
			favourites: [ ...this.state.favourites, e.target.value ]
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
								const obj = Object.values(item);
								console.log(obj);
								return (
									<Fragment>
										<ul key={index}>
											{this.state.english ? (
												<li>
													{item.emoji} - {item.english}
													<button
														type="submit"
														id="submit"
														onClick={this.handleFavourites}
														value={obj}
													>
														Add to Favourites
													</button>
												</li>
											) : (
												<li>
													{item.emoji} - {item.arabic}
													<button type="submit" name="emojis" onClick={this.handleFavourites}>
														Add
													</button>
												</li>
											)}
										</ul>
									</Fragment>
								);
							})
					) : null}
					<h1>Favourite Emojis</h1>
					{this.state.favourites &&
						this.state.favourites.map((item, index) => {
							let splitArr = item.split(',');
							console.log(splitArr);
							return (
								<Fragment>
									<ul key={index}>
										<li>
											{splitArr[0]} - {splitArr[1]}
										</li>
									</ul>
								</Fragment>
							);
						})}
				</div>
			</div>
		);
	}
}

export default DisplayEmojis;
