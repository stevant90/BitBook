class ValidationService {
	isFormValid(data) {
		for (let prop in data) {
			if (data[prop] === '') {
				return false;
			}
		}

		return true;
	}

	isPasswordsMatch(password1, password2) {
		if (password2 !== password1) {
			return {
				errorMessage: 'Passwords must match',
				validationState: 'error',
				valid: false,
			};
		} else {
			return {
				errorMessage: undefined,
				validationState: null,
				valid: true,
			};
		}
	}

	isInputValid(name, value) {
		let errorMessage;
		let validationState;
		let passwordLengthError;
		let passwordValid;
		let passwordLengthValidationState;
		let emailValidError;
		let emailValidState;
		let isEmailValid;
		let urlValidError;
		let urlValidationState;
		let isUrlValid;
		let isVideoUrlValid;
		let videoUrlValidError;
		let videoUrlValidationState;

		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

		switch (name) {
			case 'username':
				return {
					errorMessage: value === '' ? 'Enter username' : '',
					validationState: value === '' ? 'error' : null,
				};

			case 'password':
				return {
					errorMessage: value === '' ? 'Enter password' : '',
					validationState: value === '' ? 'error' : null,
					passwordLengthError: value.length < 6 ? 'Password must be minimum 6 characters long' : '',
					passwordLengthValidationState: value.length < 6 ? 'error' : null,
					passwordValid: value.length < 6 ? false : true,
				};

			case 'repeat':
				return {
					errorMessage: value === '' ? 'Repeat password' : '',
					validationState: value === '' ? 'error' : null,
				};

			case 'name':
				return {
					errorMessage: value === '' ? 'Enter name' : '',
					validationState: value === '' ? 'error' : null,
				};

			case 'email':
				return {
					errorMessage: value === '' ? 'Enter email' : '',
					validationState: value === '' ? 'error' : null,
					emailValidError: value.match(emailRegex) ? '' : 'Enter valid email',
					emailValidState: value.match(emailRegex) ? null : 'error',
					isEmailValid: value.match(emailRegex) ? true : false,
				};

			case 'short':
				return {
					errorMessage: value === '' ? 'Enter something short about you' : '',
					validationState: value === '' ? 'error' : null,
				};

			case 'about':
				return {
					errorMessage: value === '' ? 'Enter something about you' : '',
					validationState: value === '' ? 'error' : null,
				};

			case 'avatarUrl':
				return {
					errorMessage: value === '' ? 'Enter picture url' : '',
					validationState: value === '' ? 'error' : null,
				};

			case 'text':
				return {
					errorMessage: value === '' ? "Text post can't be empty" : '',
					validationState: value === '' ? 'error' : null,
				};

			case 'image':
				return {
					errorMessage: value === '' ? "Image post can't be empty" : '',
					validationState: value === '' ? 'error' : null,
					urlValidError: value.match(urlRegex) ? '' : 'Enter valid url',
					urlValidationState: value.match(urlRegex) ? null : 'error',
					isUrlValid: value.match(urlRegex) ? true : false,
				};

			case 'video':
				return {
					errorMessage: value === '' ? "Video post can't be empty" : '',
					validationState: value === '' ? 'error' : null,
					videoUrlValidError: value.match(urlRegex) ? '' : 'Enter valid url',
					videoUrlValidationState: value.match(urlRegex) ? null : 'error',
					isVideoUrlValid: value.match(urlRegex) ? true : false,
				};

			case 'comment':
				return {
					errorMessage: value === '' ? "Comment can't be empty" : '',
					validationState: value === '' ? 'error' : null,
				};
		}
	}
}

export const validationService = new ValidationService();
