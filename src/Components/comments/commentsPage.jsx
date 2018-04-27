import React, { Component } from 'react';
import { FormControl, FormGroup, HelpBlock, Grid, Row, Button } from 'react-bootstrap';

import { dataService } from '../../Service/dataService';
import { CommentsComponent } from './commentsComponent';
import { validationService } from '../../Service/validationService';

export default class CommentsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			comment: '',
		};
	}

	loadComments() {
		const postId = this.props.postId;

		dataService.getComments(postId, comments => {
			this.setState({ comments });
		});
	}

	componentDidMount() {
		this.loadComments();
	}

	handleCommentsInput = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value,
			[`${name}Error`]: validationService.isInputValid(name, value).errorMessage,
			[`${name}ValidationState`]: validationService.isInputValid(name, value).validationState,
		});
	};

	getFormErrors() {
		let data = {
			comment: this.state.comment,
		};

		this.setState({
			commentError: validationService.isInputValid('comment', data.comment).errorMessage,
			commentValidationState: validationService.isInputValid('comment', data.comment).validationState,
		});
	}

	onBlur = () => {
		this.setState({
			commentError: '',
			commentValidationState: null,
		});
	};

	postComment = event => {
		event.preventDefault();

		let data = {
			comment: this.state.comment,
		};

		const postId = this.props.postId;

		this.getFormErrors();

		if (validationService.isFormValid(data)) {
			dataService.postComment(data.comment, postId, response => {
				this.loadComments();
				this.setState({ comment: '' });
			});
		}
	};

	render() {
		const { comments } = this.state;

		return (
			<Grid>
				<Row>
					<form onBlur={this.onBlur}>
						<FormGroup controlId="formBasicText" validationState={this.state.commentValidationState}>
							<FormControl
								name="comment"
								componentClass="textarea"
								type="text"
								value={this.state.comment}
								onChange={this.handleCommentsInput}
								placeholder="Enter comment"
							/>
							<FormControl.Feedback />
							<HelpBlock>{this.state.commentError}</HelpBlock>
						</FormGroup>
						<Button bsStyle="primary" onClick={this.postComment}>
							Leave a comment
						</Button>
					</form>
					{comments.map(comment => {
						return <CommentsComponent comment={comment} key={comment.id} />;
					})}
				</Row>
			</Grid>
		);
	}
}
