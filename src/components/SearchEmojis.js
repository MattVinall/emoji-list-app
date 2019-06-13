import React, { Component } from 'react';

export default class SearchEmojis extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className="searchBar">
				<label for="search" />
				<input type="search" labelFor="search" placeholder="search your favourite emojis" id="search" />
				<input type="submit" />
			</div>
		);
	}
}
