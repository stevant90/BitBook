import { SESSION_ID } from '../constants';
import { communicationService } from './communicationService';
import { sessionService } from './sessionService';
import { redirectionService } from './redirectionService';
import { ServerResponse } from 'http';

class AuthenticationService {
	isAuthenticated() {
		const sessionId = sessionService.getItem(SESSION_ID);

		return !!sessionId;
	}

	login(userData, errorHandler) {
		communicationService.postRequest(
			'/api/login',
			userData,
			response => {
				sessionService.setItem(SESSION_ID, response.data.sessionId);
				redirectionService.goTo('/');
			},
			error => {
				errorHandler(error);
			}
		);
	}

	logOut() {
		sessionService.removeItem(SESSION_ID);
		redirectionService.goTo('/loginPage');
	}

	register(registerData, errorHandler) {
		communicationService.postRequest(
			'/api/register',
			registerData,
			response => {
				redirectionService.goTo('/loginPage');
			},
			error => {
				errorHandler(error);
			}
		);
	}
}

export const authenticationService = new AuthenticationService();
