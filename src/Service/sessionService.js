class SessionService {
	setItem(key, value) {
		sessionStorage.setItem(key, value);
	}

	getItem(key) {
		return sessionStorage.getItem(key);
	}

	removeItem(key) {
		sessionStorage.removeItem(key);
	}
}

export const sessionService = new SessionService();
