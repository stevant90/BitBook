import React from 'react';
import { Button, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

export const LoginComponent = ({
	blur,
	username,
	password,
	usernameError,
	usernameValidationState,
	passwordError,
	passwordValidationState,
	handleChange,
	handleLogin,
}) => (
	<form onBlur={blur}>
		<FormGroup validationState={usernameValidationState}>
			<FormControl type="text" name="username" value={username} placeholder="Enter email" onChange={handleChange} />
			<FormControl.Feedback />
			<HelpBlock>{usernameError}</HelpBlock>
		</FormGroup>
		<FormGroup validationState={passwordValidationState}>
			<FormControl
				type="password"
				name="password"
				value={password}
				placeholder="Enter password"
				onChange={handleChange}
			/>
			<FormControl.Feedback />
			<HelpBlock>{passwordError}</HelpBlock>
		</FormGroup>
		<Button bsStyle="primary" type="submit" onClick={handleLogin}>
			Login
		</Button>
	</form>
);
