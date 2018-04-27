import { communicationService } from './communicationService';
import UserDTO from '../Components/dto/userDTO';
import ProfileDTO from '../Components/dto/profileDTO';
import TextPostDTO from '../Components/dto/textPostDTO';
import ImagePostDTO from '../Components/dto/imagePostDTO';
import VideoPostDTO from '../Components/dto/videoPostDTO';
import CommentsDTO from '../Components/dto/commentsDTO';

class DataService {
	getUsers(usersHandler) {
		let users = [];

		communicationService.getRequest(
			'/api/users',
			response => {
				response.data.forEach(item => {
					const id = item.id;
					const name = item.name;
					const aboutShort = item.aboutShort;
					const avatarUrl = item.avatarUrl;
					const lastPostDate = item.lastPostDate;

					const user = new UserDTO(id, name, aboutShort, avatarUrl, lastPostDate);

					users.push(user);
				});

				usersHandler(users);
			},
			error => console.log(error)
		);
	}

	getProfiles(id, profilesHandler) {
		communicationService.getRequest(
			`/api/users/${id}`,
			response => {
				const userId = response.data.userId;
				const name = response.data.name;
				const email = response.data.email;
				const aboutShort = response.data.aboutShort;
				const about = response.data.about;
				const avatarUrl = response.data.avatarUrl;
				const postsCount = response.data.postsCount;
				const commentsCount = response.data.commentsCount;

				const profile = new ProfileDTO(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);

				profilesHandler(profile);
			},
			error => console.log(error)
		);
	}

	getProfile(profileHandler) {
		communicationService.getRequest(
			'/api/profile',
			response => {
				const userId = response.data.userId;
				const name = response.data.name;
				const email = response.data.email;
				const aboutShort = response.data.aboutShort;
				const about = response.data.about;
				const avatarUrl = response.data.avatarUrl;
				const postsCount = response.data.postsCount;
				const commentsCount = response.data.commentsCount;

				const profile = new ProfileDTO(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);

				profileHandler(profile);
			},
			error => console.log(error)
		);
	}

	editProfile(updateData, successHandler) {
		communicationService.puRequest(
			'/api/Profiles',
			updateData,
			response => successHandler(response),
			error => console.log(error)
		);
	}

	getPostsForInfiniteScroll(top, postsHandler) {
		const posts = [];

		communicationService.getRequest(
			`/api/Posts?$top=${top}&$orderby=DateCreated desc`,
			response => {
				response.data.forEach(item => {
					if (item.type === 'text') {
						const text = item.text;
						const id = item.id;
						const dateCreated = item.dateCreated;
						const userId = item.userId;
						const userDisplayName = item.userDisplayName;
						const type = item.type;
						const commentsNum = item.commentsNum;

						const textPosts = new TextPostDTO(text, id, dateCreated, userId, userDisplayName, type, commentsNum);

						posts.push(textPosts);
					} else if (item.type === 'image') {
						const imageUrl = item.imageUrl;
						const id = item.id;
						const dateCreated = item.dateCreated;
						const userId = item.userId;
						const userDisplayName = item.userDisplayName;
						const type = item.type;
						const commentsNum = item.commentsNum;

						const imagePosts = new ImagePostDTO(imageUrl, id, dateCreated, userId, userDisplayName, type, commentsNum);

						posts.push(imagePosts);
					} else if (item.type === 'video') {
						const videoUrl = item.videoUrl;
						const id = item.id;
						const dateCreated = item.dateCreated;
						const userId = item.userId;
						const userDisplayName = item.userDisplayName;
						const type = item.type;
						const commentsNum = item.commentsNum;

						const videoPosts = new VideoPostDTO(videoUrl, id, dateCreated, userId, userDisplayName, type, commentsNum);

						posts.push(videoPosts);
					}
				});

				postsHandler(posts);
			},
			error => console.log(error)
		);
	}

	getPostsCount(successHandler) {
		communicationService.getRequest(
			'/api/posts/count',
			response => successHandler(response),
			error => console.log(error)
		);
	}

	getSinglePost(type, postId, successHandler) {
		communicationService.getRequest(
			`/api/${type}Posts/${postId}`,
			response => successHandler(response),
			error => console.log(error)
		);
	}

	newPost(type, newPostsData, successHandler) {
		communicationService.postRequest(
			`/api/${type}Posts`,
			newPostsData,
			response => successHandler(response),
			error => console.log(error)
		);
	}

	deletePost(id, successHandler) {
		communicationService.deleteRequest(
			`/api/Posts/${id}`,
			response => successHandler(response),
			error => console.log(error)
		);
	}

	uploadImage(data, successHandler) {
		const formData = new FormData();
		formData.append('file', data);

		communicationService.postRequest(
			'/api/upload',
			formData,
			response => successHandler(response),
			error => console.log(error)
		);
	}

	getComments(postId, commentsHandler) {
		const comments = [];

		communicationService.getRequest(
			`/api/Comments?postId=${postId}`,
			response => {
				response.data.forEach(item => {
					const id = item.id;
					const dateCreated = item.dateCreated;
					const body = item.body;
					const postId = item.postId;
					const authorName = item.authorName;
					const authorId = item.authorId;

					const comment = new CommentsDTO(id, dateCreated, body, postId, authorName, authorId);

					comments.push(comment);
				});

				commentsHandler(comments);
			},
			error => console.log(error)
		);
	}

	postComment(comment, postId, successHandler) {
		const data = {
			body: comment,
			postId: postId,
		};

		communicationService.postRequest(
			'/api/Comments',
			data,
			response => successHandler(response),
			error => console.log(error)
		);
	}
}

export const dataService = new DataService();
