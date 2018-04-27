import React from 'react';
import { Grid, Row, Col, Badge, Label, Image, Button, Glyphicon } from 'react-bootstrap';

export const UsersProfilesComponent = ({ profile, back }) => {
	const { userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount } = profile;

	let backupAvatarUrl;
	let comment = commentsCount > 1 ? 'comments' : 'comment';
	let post = postsCount > 1 ? 'posts' : 'post';

	if (!avatarUrl) {
		backupAvatarUrl = 'http://via.placeholder.com/100x100';
	}

	let image = avatarUrl ? avatarUrl : backupAvatarUrl;

	return (
		<Grid style={{ textAlign: 'center' }}>
			<Row>
				<Glyphicon glyph="arrow-left" style={{ float: 'left' }}>
					&nbsp;
				</Glyphicon>
				<a className="go-back" onClick={back} style={{ float: 'left' }}>
					Go back
				</a>
			</Row>
			<Row>
				<Col xs={12} md={6} mdOffset={3}>
					<Image src={image} alt={name} style={{ width: '50%' }} circle />
					<h2>{name}</h2>
					<p>Email: {email}</p>
					<p>{aboutShort}</p>
					<p>{about}</p>
				</Col>
			</Row>
			<Row style={{ marginTop: '1em' }}>
				<Col md={3} mdOffset={3}>
					<h4>
						<Label bsStyle="primary">
							<Badge>{postsCount}</Badge>
							{post}
						</Label>
					</h4>
				</Col>
				<Col md={3}>
					<h4>
						<Label bsStyle="primary">
							<Badge>{commentsCount}</Badge>
							{comment}
						</Label>
					</h4>
				</Col>
			</Row>
		</Grid>
	);
};
