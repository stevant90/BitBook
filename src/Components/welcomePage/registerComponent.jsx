import React from 'react';
import { Button, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

export const RegisterComponent = props => {
	const { blur, name, username, password, repeatPassword, email } = props;
	const {
		nameError,
		nameValidationState,
		usernameError,
		usernameValidationState,
		passwordError,
		passwordValidationState,
		repeatError,
		repeatValidationState,
		emailError,
		emailValidationState,
	} = props;
	const { handleChange, handleRegister } = props;

	return (
		<form onBlur={blur}>
			<FormGroup validationState={nameValidationState}>
				<FormControl type="text" name="name" value={name} placeholder="Name" onChange={handleChange} />
				<FormControl.Feedback />
				<HelpBlock>{nameError}</HelpBlock>
			</FormGroup>
			<FormGroup validationState={usernameValidationState}>
				<FormControl type="text" name="username" value={username} placeholder="Username" onChange={handleChange} />
				<FormControl.Feedback />
				<HelpBlock>{usernameError}</HelpBlock>
			</FormGroup>
			<FormGroup validationState={passwordValidationState}>
				<FormControl type="password" name="password" value={password} placeholder="Password" onChange={handleChange} />
				<FormControl.Feedback />
				<HelpBlock>{passwordError}</HelpBlock>
			</FormGroup>
			<FormGroup validationState={repeatValidationState}>
				<FormControl
					type="password"
					name="repeat"
					value={repeatPassword}
					placeholder="Repeat password"
					onChange={handleChange}
				/>
				<FormControl.Feedback />
				<HelpBlock>{repeatError}</HelpBlock>
			</FormGroup>
			<FormGroup validationState={emailValidationState}>
				<FormControl type="email" name="email" value={email} placeholder="Email" onChange={handleChange} />
				<FormControl.Feedback />
				<HelpBlock>{emailError}</HelpBlock>
			</FormGroup>

			<Button bsStyle="primary" type="submit" onClick={handleRegister}>
				Register
			</Button>
		</form>
	);
};
