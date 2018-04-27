import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default class FilterPosts extends Component {
	constructor(props) {
		super(props);
	}

	handleSelect = event => {
		const searchTerm = event.target.value;

		this.props.onSelect(searchTerm);
	};

	render() {
		return (
			<form className="filter-posts">
				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Filter Posts</ControlLabel>
					<FormControl componentClass="select" onChange={this.handleSelect}>
						<option value="">All posts</option>
						<option value="text">Text posts</option>
						<option value="image">Image posts</option>
						<option value="video">Video posts</option>
					</FormControl>
				</FormGroup>
			</form>
		);
	}
}
