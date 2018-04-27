import React, { Component } from 'react';
import { Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap';

import { dataService } from '../../Service/dataService';
import { UsersComponent } from './usersComponent';
import SearchBar from '../../Common/search';

export default class UsersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			allUsers: [],
			display: 'none',
		};
	}

	componentDidMount() {
		dataService.getUsers(users => {
			this.setState({
				allUsers: users,
				users,
			});
		});
	}

	searchRequest = searchString => {
		const currentUsersList = this.state.allUsers;

		if (searchString === '') {
			this.setState({ users: currentUsersList });
		}

		const filteredUsers = currentUsersList.filter(user => {
			return user.name.toLowerCase().includes(searchString.toLowerCase());
		});

		this.setState({ users: filteredUsers });
	};

	render() {
		const { users } = this.state;

		if (!users) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<SearchBar onSearch={this.searchRequest} />
				{users.map(user => {
					return <UsersComponent user={user} key={user.id} />;
				})}
			</div>
		);
	}
}
