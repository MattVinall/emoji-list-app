import React, { Fragment } from 'react';
import '../App.css';

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
				<h1 className="title">Emoji App</h1>
				<form className="searchBar" onSubmit={this.handleSubmit}>
					<label htmlFor="searchTerm">Search Emojis:</label>
					<input
						type="text"
						placeholder="search your favourite emojis"
						id="searchTerm"
						value={this.state.searchTerm}
						onChange={this.handleChange}
						name="searchTerm"
					/>
					<button onClick={this.handleClick}>
						{this.state.english ? <p>Change to Arabic</p> : <p>Change to English</p>}
					</button>
				</form>
				<div className="emojiContainer wrapper">
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
										<div key={index} className="card">
											{this.state.english ? (
												<Fragment>
													<h3 className="emoji">{item.emoji} </h3>
													<h3 className="description">{item.english}</h3>
													<button
														type="submit"
														id="submit"
														onClick={this.handleFavourites}
														value={obj}
													>
														Add to Favourites
													</button>
												</Fragment>
											) : (
												<Fragment>
													<h3 className="emoji">{item.emoji} </h3>
													<h3 className="description">{item.arabic}</h3>
													<button
														type="submit"
														id="submit"
														onClick={this.handleFavourites}
														value={obj}
													>
														Add to Favourites
													</button>
												</Fragment>
											)}
										</div>
									</Fragment>
								);
							})
					) : null}

					<section className="favourites">
						<h2>Favourite Emojis</h2>
						<div className="favouritesContainer">
							{this.state.favourites &&
								this.state.favourites.map((item, index) => {
									let splitArr = item.split(',');
									console.log(splitArr);
									return (
										<div className="card">
											{this.state.english ? (
												<Fragment>
													<h3 className="emoji">{splitArr[0]}</h3>
													<h3 className="description">{splitArr[1]}</h3>
												</Fragment>
											) : (
												<Fragment>
													<h3 className="emoji">{splitArr[0]}</h3>
													<h3 className="description">{splitArr[2]}</h3>
												</Fragment>
											)}
										</div>
									);
								})}
						</div>
					</section>
				</div>
			</div>
		);
	}
}

export default DisplayEmojis;
