import React, { Component } from 'react';

import { authenticationService } from '../../Service/authenticationService';
import { validationService } from '../../Service/validationService';
import { LoginComponent } from './loginComponent';

export default class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			serverError: '',
			serverErrorValidationState: null,
		};
	}

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value,
			[`${name}Error`]: validationService.isInputValid(name, value).errorMessage,
			[`${name}ValidationState`]: validationService.isInputValid(name, value).validationState,
		});
	};

	getFormErrors() {
		let data = {
			username: this.state.username,
			password: this.state.password,
		};

		this.setState({
			usernameError: validationService.isInputValid('username', data.username).errorMessage,
			usernameValidationState: validationService.isInputValid('username', data.username).validationState,
			passwordError: validationService.isInputValid('password', data.password).errorMessage,
			passwordValidationState: validationService.isInputValid('password', data.password).validationState,
		});
	}

	onBlur = () => {
		this.setState({
			usernameError: '',
			passwordError: '',
			serverError: '',
			usernameValidationState: null,
			passwordValidationState: null,
			serverErrorValidationState: null,
		});
	};

	handleLogin = event => {
		event.preventDefault();

		let data = {
			username: this.state.username,
			password: this.state.password,
		};

		this.getFormErrors();

		if (validationService.isFormValid(data)) {
			authenticationService.login(data, error => {
				this.setState({
					serverError: error.response.data.error.message,
					serverErrorValidationState: 'error',
				});

				if (error.response === undefined) {
					alert('SERVER UNREACHABLE!');
				}
			});
		}
	};

	render() {
		return (
			<LoginComponent
				blur={this.onBlur}
				username={this.state.username}
				password={this.state.password}
				usernameError={this.state.usernameError}
				usernameValidationState={
					this.state.usernameValidationState
						? this.state.usernameValidationState
						: this.state.serverErrorValidationState
				}
				passwordError={this.state.passwordError ? this.state.passwordError : this.state.serverError}
				passwordValidationState={
					this.state.passwordValidationState
						? this.state.passwordValidationState
						: this.state.serverErrorValidationState
				}
				handleChange={this.handleChange}
				handleLogin={this.handleLogin}
			/>
		);
	}
}
