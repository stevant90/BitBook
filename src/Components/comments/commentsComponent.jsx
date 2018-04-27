import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import moment from 'moment';

export const CommentsComponent = ({ comment }) => {
	const { id, dateCreated, body, postId, authorName, authorId } = comment;

	const date = new Date(dateCreated);
	let newDateObj = moment(date)
		.add(2, 'h')
		.toDate();
	const displayDate = newDateObj.toDateString();
	const time = newDateObj.toLocaleTimeString();

	const userName = (
		<h4>
			<Link to={`/users/${authorId}`}>{authorName}</Link>
		</h4>
	);

	return (
		<Grid className="comments">
			<Row>
				<ListGroup>
					<ListGroupItem header={userName} className="comment-body">
						{body}
					</ListGroupItem>
					<ListGroupItem>
						{displayDate}
						&nbsp; &nbsp;
						{time}
					</ListGroupItem>
				</ListGroup>
			</Row>
		</Grid>
	);
};
