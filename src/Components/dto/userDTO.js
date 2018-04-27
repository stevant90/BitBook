export default class UserDto {
	constructor(id, name, aboutShort, avatarUrl, lastPostDate) {
		this._id = id;
		this._name = name;
		this._aboutShort = aboutShort;
		this._avatarUrl = avatarUrl;
		this._lastPostDate = lastPostDate;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get aboutShort() {
		return this._aboutShort;
	}

	get lastPostDate() {
		return this._lastPostDate;
	}

	get avatarUrl() {
		return this._avatarUrl;
	}
}
