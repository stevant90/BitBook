import React from 'react';
import { Grid, Row, Col, Badge, Image, Label, Button } from 'react-bootstrap';

export const ProfileComponent = ({ profile, reloadProfile }) => {
	if (!profile) {
		return <div>Loading...</div>;
	}

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
				<Col xs={12} md={6} mdOffset={3}>
					<Image src={image} alt={name} style={{ width: '50%' }} circle />
				</Col>
			</Row>

			<Row>
				<h2>{name}</h2>
				<p>Email: {email}</p>
				<p>{aboutShort}</p>
				<p>{about}</p>
			</Row>
			<Row>
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
