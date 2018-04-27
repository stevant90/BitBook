import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Well, Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

export const SingleTextComponent = ({ post, onDelete, ownId }) => {
	const { text, id, dateCreated, userId, userDisplayName, commentsNum } = post;

	const date = new Date(dateCreated);
	let newDateObj = moment(date)
		.add(2, 'h')
		.toDate();
	const displayDate = newDateObj.toDateString();
	const time = newDateObj.toLocaleTimeString();

	const deletePost = () => {
		onDelete(id);
	};

	const toolTip = <Tooltip id="tooltip">Delete post</Tooltip>;

	let deleteBtn =
		ownId === userId ? (
			<OverlayTrigger placement="bottom" overlay={toolTip}>
				<Button bsStyle="danger" onClick={deletePost}>
					<Glyphicon glyph="trash" />
				</Button>
			</OverlayTrigger>
		) : (
			''
		);

	return (
		<Grid>
			<Row>
				<Glyphicon glyph="arrow-left">&nbsp;</Glyphicon>
				<Link to="/" className="go-back">
					Go back
				</Link>
				<Well bsSize="large" className="single-post">
					<Row style={{ textAlign: 'right' }}>
						<Col xs={5} style={{ textAlign: 'left' }}>
							<h4>
								<Link to={`/users/${userId}`}>{userDisplayName}</Link>
							</h4>
						</Col>
						<Col xs={5} xsOffset={2} style={{ textAlign: 'right' }} className="delete-btn">
							{deleteBtn}
						</Col>
					</Row>
					<Row style={{ textAlign: 'center' }}>
						<Col xs={12}>
							<p>{text}</p>
						</Col>
					</Row>
					<Row>
						<Col xs={5}>
							<div>{displayDate}</div>
							<div>{time}</div>
						</Col>
						<Col xs={5} xsOffset={2} style={{ textAlign: 'right' }}>
							<span>Comments num: {commentsNum}</span>
						</Col>
					</Row>
				</Well>
			</Row>
		</Grid>
	);
};
