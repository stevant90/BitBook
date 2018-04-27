import React, { Component } from 'react';
import { FormControl, FormGroup, Grid, Row } from 'react-bootstrap';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = { searchString: '' };
	}

	searchHandler = event => {
		const searchTerm = event.target.value;

		this.setState({ searchString: searchTerm });

		this.props.onSearch(searchTerm);
	};

	render() {
		return (
			<Grid>
				<Row>
					<form>
						<FormGroup bsSize="large">
							<FormControl
								type="search"
								placeholder="Search"
								value={this.state.searchString}
								onChange={this.searchHandler}
							/>
						</FormGroup>
					</form>
				</Row>
			</Grid>
		);
	}
}
