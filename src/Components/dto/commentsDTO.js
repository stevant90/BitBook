export default class CommentsDTO {
	constructor(id, dateCreated, body, postId, authorName, authorId) {
		this._id = id;
		this._dateCreated = dateCreated;
		this._body = body;
		this._postId = postId;
		this._authorName = authorName;
		this._authorId = authorId;
	}

	get id() {
		return this._id;
	}

	get dateCreated() {
		return this._dateCreated;
	}

	get body() {
		return this._body;
	}

	get postId() {
		return this._postId;
	}

	get authorName() {
		return this._authorName;
	}

	get authorId() {
		return this._authorId;
	}
}
