import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import moment from 'moment';

export const TextPostsComponent = ({ post, ownId }) => {
	const { text, id, dateCreated, userId, userDisplayName, type, commentsNum } = post;

	const date = new Date(dateCreated);
	let newDateObj = moment(date)
		.add(2, 'h')
		.toDate();
	const displayDate = newDateObj.toDateString();
	const time = newDateObj.toLocaleTimeString();
	const pathToSingleText = `/feed/${type.charAt(0).toUpperCase()}${type.slice(1)}/${id}`;

	return (
		<Grid>
			<Row>
				<Well bsSize="large" className="text-posts">
					<Row style={{ textAlign: 'left' }}>
						<Col md={12}>
							<h4>
								<Link to={`/users/${userId}`}>{userDisplayName}</Link>
							</h4>
						</Col>
					</Row>
					<Row>
						<Col xs={12} style={{ textAlign: 'center' }}>
							<p>{text}</p>
						</Col>
					</Row>
					<Row>
						<Col xs={5} sm={4}>
							<div>{displayDate}</div>
							<div>{time}</div>
						</Col>
						<Col xs={5} xsOffset={2} sm={4} smOffset={4} style={{ textAlign: 'right' }}>
							<span>Comments num: {commentsNum}</span>
						</Col>
					</Row>
					<Row>
						<Col xs={12} style={{ textAlign: 'center' }}>
							<span>
								<Link to={pathToSingleText}>Read more >>></Link>
							</span>
						</Col>
					</Row>
				</Well>
			</Row>
		</Grid>
	);
};
