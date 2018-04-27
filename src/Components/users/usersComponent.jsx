import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, Grid, Row, Col, Image } from 'react-bootstrap';

export const UsersComponent = ({ user }) => {
	const { id, name, aboutShort, avatarUrl, lastPostDate } = user;

	const date = new Date(lastPostDate);
	const postDate = date.toDateString();
	const time = date.toLocaleTimeString();
	let backupAvatarUrl;

	if (!avatarUrl) {
		backupAvatarUrl = 'http://via.placeholder.com/100x100';
	}

	let image = avatarUrl ? avatarUrl : backupAvatarUrl;

	return (
		<Grid>
			<Row>
				<Panel bsStyle="primary">
					<Panel.Heading>
						<Link to={`/users/${id}`}>
							{' '}
							<Panel.Title componentClass="h1" style={{ textAlign: 'center', color: 'white' }}>
								{name}
							</Panel.Title>{' '}
						</Link>
					</Panel.Heading>
					<Panel.Body className="panel-body">
						<Row>
							<Col xs={12} md={3} style={{ textAlign: 'center' }}>
								<Image src={image} alt={name} circle style={{ width: '60%' }} />
							</Col>
							<Col xs={4} md={4} mdOffset={1} style={{ textAlign: 'center' }}>
								{aboutShort}
							</Col>
							<Col xs={5} xsOffset={2} md={3} mdOffset={0} style={{ textAlign: 'right' }}>
								<span>
									Last post at <br /> {postDate} <br /> {time}
								</span>
							</Col>
						</Row>
					</Panel.Body>
				</Panel>
			</Row>
		</Grid>
	);
};
