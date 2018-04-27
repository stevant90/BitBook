import React, { Component } from 'react';

import { authenticationService } from '../../Service/authenticationService';
import { validationService } from '../../Service/validationService';
import { RegisterComponent } from './registerComponent';

export default class RegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			username: '',
			password: '',
			repeat: '',
			email: '',
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
			name: this.state.name,
			username: this.state.username,
			password: this.state.password,
			repeat: this.state.repeat,
			email: this.state.email,
		};

		this.setState({
			nameError: validationService.isInputValid('name', data.name).errorMessage,
			nameValidationState: validationService.isInputValid('name', data.name).validationState,
			usernameError: validationService.isInputValid('username', data.username).errorMessage,
			usernameValidationState: validationService.isInputValid('username', data.username).validationState,
			passwordError: !data.password
				? validationService.isInputValid('password', data.password).errorMessage
				: validationService.isInputValid('password', data.password).passwordLengthError,
			passwordValidationState: !data.password
				? validationService.isInputValid('password', data.password).validationState
				: validationService.isInputValid('password', data.password).passwordLengthValidationState,
			repeatError: !data.repeat
				? validationService.isInputValid('repeat', data.repeat).errorMessage
				: validationService.isPasswordsMatch(data.password, data.repeat).errorMessage,
			repeatValidationState: !data.repeat
				? validationService.isInputValid('repeat', data.repeat).validationState
				: validationService.isPasswordsMatch(data.password, data.repeat).validationState,
			emailError: !data.email
				? validationService.isInputValid('email', data.email).errorMessage
				: validationService.isInputValid('email', data.email).emailValidError,
			emailValidationState: !data.email
				? validationService.isInputValid('email', data.email).validationState
				: validationService.isInputValid('email', data.email).emailValidState,
		});
	}

	formValidation() {
		return (
			validationService.isPasswordsMatch(this.state.password, this.state.repeat).valid &&
			validationService.isInputValid('password', this.state.password).passwordValid &&
			validationService.isInputValid('email', this.state.email).isEmailValid
		);
	}

	onBlur = () => {
		this.setState({
			emailError: '',
			passwordError: '',
			nameError: '',
			usernameError: '',
			repeatError: '',
			serverError: '',
			nameValidationState: null,
			usernameValidationState: null,
			passwordValidationState: null,
			repeatValidationState: null,
			emailValidationState: null,
			serverErrorValidationState: null,
		});
	};

	handleRegister = event => {
		event.preventDefault();

		let data = {
			name: this.state.name,
			username: this.state.username,
			password: this.state.password,
			repeat: this.state.repeat,
			email: this.state.email,
		};

		this.getFormErrors();

		if (validationService.isFormValid(data) && this.formValidation()) {
			authenticationService.register(data, error => {
				this.setState({
					serverError: error.response.data.error.message,
					serverErrorValidationState: 'error',
				});

				if (!data) {
					console.log('Something went wrong!');
				}
			});
		}
	};

	render() {
		return (
			<RegisterComponent
				blur={this.onBlur}
				name={this.state.name}
				username={this.state.username}
				password={this.state.password}
				repeatPassword={this.state.repeat}
				email={this.state.email}
				nameError={this.state.nameError}
				nameValidationState={this.state.nameValidationState}
				usernameError={this.state.usernameError ? this.state.usernameError : this.state.serverError}
				usernameValidationState={
					this.state.usernameValidationState
						? this.state.usernameValidationState
						: this.state.serverErrorValidationState
				}
				passwordError={this.state.passwordError}
				passwordValidationState={this.state.passwordValidationState}
				repeatError={this.state.repeatError}
				repeatValidationState={this.state.repeatValidationState}
				emailError={this.state.emailError}
				emailValidationState={this.state.emailValidationState}
				handleChange={this.handleChange}
				handleRegister={this.handleRegister}
			/>
		);
	}
}
