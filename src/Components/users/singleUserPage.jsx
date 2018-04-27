import React, { Component } from 'react';

import { dataService } from '../../Service/dataService';
import { UsersProfilesComponent } from '../profile/usersProfilesComponent';
import EditProfile from '../profile/editProfile';

export default class SingleUserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: {},
			ownId: '',
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;

		this.loadData(id);
		this.getOwnId();
	}

	loadData(id) {
		dataService.getProfiles(id, profile => this.setState({ profile }));
	}

	getOwnId = () => {
		dataService.getProfile(profile => {
			this.setState({ ownId: profile.userId });
		});
	};

	refreshProfile = () => {
		dataService.getProfile(profile => this.setState({ profile }));
	};

	goBack() {
		history.back();
	}

	render() {
		const { profile } = this.state;
		const { ownId } = this.state;
		const { userId } = this.state.profile;

		if (!profile) {
			return <div>Loading profile...</div>;
		}

		if (ownId === userId) {
			return (
				<div>
					<UsersProfilesComponent profile={profile} back={this.goBack} />
					<EditProfile reloadProfile={this.refreshProfile} />
				</div>
			);
		}

		return (
			<div>
				<UsersProfilesComponent profile={profile} back={this.goBack} />
			</div>
		);
	}
}
