import React, { Component } from 'react';

import { dataService } from '../../Service/dataService';
import { ProfileComponent } from './profileComponent';
import EditProfile from '../profile/editProfile';

export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = { profile: {} };
	}

	loadData = () => {
		dataService.getProfile(profile => {
			this.setState({ profile });
		});
	};

	componentDidMount() {
		this.loadData();
	}

	render() {
		const { profile } = this.state;

		return (
			<div>
				<ProfileComponent profile={profile} />
				<EditProfile reloadProfile={this.loadData} />
			</div>
		);
	}
}
