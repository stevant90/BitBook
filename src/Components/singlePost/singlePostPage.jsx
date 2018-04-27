import React, { Component } from 'react';
import { Grid, Row, Button } from 'react-bootstrap';

import { dataService } from '../../Service/dataService';
import { redirectionService } from '../../Service/redirectionService';
import { SingleTextComponent } from './singleTextComponent';
import { SingleImageComponent } from './singleImageComponent';
import { SingleVideoComponent } from './singleVideoComponent';
import CommentsPage from '../comments/commentsPage';

export default class SinglePostsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: '',
			ownId: '',
		};
	}

	componentDidMount() {
		const postId = this.props.match.params.postId;
		const postType = this.props.match.params.type;

		this.loadData(postType, postId);

		this.getOwnId();
	}

	loadData = (postType, postId) => {
		dataService.getSinglePost(postType, postId, post => {
			this.setState({ post: post.data });
		});
	};

	getOwnId = () => {
		dataService.getProfile(profile => {
			this.setState({ ownId: profile.userId });
		});
	};

	deletePost = id => {
		dataService.deletePost(id, response => {
			redirectionService.goTo('/');
		});
	};

	render() {
		const { post } = this.state;
		const { ownId } = this.state;

		if (!post) {
			return (
				<Grid>
					<Row>
						<p>Loading...</p>
					</Row>
				</Grid>
			);
		}

		if (post.type === 'text') {
			return (
				<div>
					<SingleTextComponent post={post} onDelete={this.deletePost} ownId={ownId} />
					<CommentsPage postId={post.id} />
				</div>
			);
		} else if (post.type === 'image') {
			return (
				<div>
					<SingleImageComponent post={post} onDelete={this.deletePost} ownId={ownId} />
					<CommentsPage postId={post.id} />
				</div>
			);
		}

		return (
			<div>
				<SingleVideoComponent post={post} onDelete={this.deletePost} ownId={ownId} />
				<CommentsPage postId={post.id} />
			</div>
		);
	}
}
