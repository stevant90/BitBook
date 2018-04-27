import React from 'react';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
import { Grid, Row, Well, Col } from 'react-bootstrap';
import moment from 'moment';

export const VideoPostsComponent = ({ post }) => {
	const { videoUrl, id, dateCreated, userId, userDisplayName, type, commentsNum } = post;

	const date = new Date(dateCreated);
	let newDateObj = moment(date)
		.add(2, 'h')
		.toDate();
	const displayDate = newDateObj.toDateString();
	const time = newDateObj.toLocaleTimeString();
	const pathToSingleVideo = `/feed/${type.charAt(0).toUpperCase()}${type.slice(1)}/${id}`;

	const partOfUrl = 'https://youtu.be/';
	const partOfEmbedUrl = 'https://www.youtube.com/embed/';
	const partOfListUrl = '&list=';
	let youTubeVideoUrl = videoUrl.slice(videoUrl.indexOf('=') + 1);

	if (videoUrl.includes(partOfUrl)) {
		youTubeVideoUrl = videoUrl.slice(partOfUrl.length);
	} else if (videoUrl.includes(partOfEmbedUrl)) {
		youTubeVideoUrl = videoUrl.slice(partOfEmbedUrl.length);
	} else if (videoUrl.includes(partOfListUrl)) {
		youTubeVideoUrl = videoUrl.slice(videoUrl.indexOf('=') + 1, videoUrl.indexOf('&'));
	}

	return (
		<Grid>
			<Row>
				<Well style={{ overflow: 'hidden' }} bsSize="large">
					<Row style={{ textAlign: 'left' }}>
						<Col md={12}>
							<h4>
								<Link to={`/users/${userId}`}>{userDisplayName}</Link>
							</h4>
						</Col>
					</Row>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<Iframe
								url={`https://www.youtube.com/embed/${youTubeVideoUrl}`}
								width="100%"
								height="100%"
								display="initial"
								position="relative"
								allowFullScreen
								styles={{ height: '400px' }}
							/>
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
								<Link to={pathToSingleVideo}>Read more >>></Link>
							</span>
						</Col>
					</Row>
				</Well>
			</Row>
		</Grid>
	);
};
