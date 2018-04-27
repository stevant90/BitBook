class RedirectionService {
	goTo(path) {
		window.location.assign(`#${path}`);
	}
}

export const redirectionService = new RedirectionService();
