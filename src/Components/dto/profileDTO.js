export default class ProfileDTO {
	constructor(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount) {
		this._userId = userId;
		this._name = name;
		this._email = email;
		this._aboutShort = aboutShort;
		this._about = about;
		this._avatarUrl = avatarUrl;
		this._postsCount = postsCount;
		this._commentsCount = commentsCount;
	}

	get userId() {
		return this._userId;
	}

	get name() {
		return this._name;
	}

	get email() {
		return this._email;
	}

	get aboutShort() {
		return this._aboutShort;
	}

	get about() {
		return this._about;
	}

	get avatarUrl() {
		return this._avatarUrl;
	}

	get postsCount() {
		return this._postsCount;
	}

	get commentsCount() {
		return this._commentsCount;
	}
}
