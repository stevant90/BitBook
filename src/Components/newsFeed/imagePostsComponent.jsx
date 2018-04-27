import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Well, Image, Button, Modal } from 'react-bootstrap';
import moment from 'moment';

export default class ImagePostsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { isModalOpen: false };
	}

	openModal = () => {
		this.setState({ isModalOpen: true });
	};

	closeModal = () => {
		this.setState({ isModalOpen: false });
	};

	render() {
		const { imageUrl, id, dateCreated, userId, userDisplayName, type, commentsNum } = this.props.post;

		const date = new Date(dateCreated);
		let newDateObj = moment(date)
			.add(2, 'h')
			.toDate();
		const displayDate = newDateObj.toDateString();
		const time = newDateObj.toLocaleTimeString();
		const pathToSingleImage = `/feed/${type.charAt(0).toUpperCase()}${type.slice(1)}/${id}`;

		return (
			<Grid style={{ overflow: 'hidden' }}>
				<Row>
					<Modal
						bsSize="large"
						show={this.state.isModalOpen}
						onHide={this.closeModal}
						container={this}
						aria-labelledby="contained-modal-title"
					>
						<Modal.Body>
							<Image src={imageUrl} className="feed-img" />
						</Modal.Body>
					</Modal>

					<Well style={{ overflow: 'hidden' }} bsSize="large">
						<Row style={{ textAlign: 'left' }}>
							<Col md={12}>
								<h4>
									<Link to={`/users/${userId}`}>{userDisplayName}</Link>
								</h4>
							</Col>
						</Row>
						<Row style={{ textAlign: 'center' }}>
							<Col>
								<Image src={imageUrl} onClick={this.openModal} className="feed-img" />
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
									<Link to={pathToSingleImage}>Read more >>></Link>
								</span>
							</Col>
						</Row>
					</Well>
				</Row>
			</Grid>
		);
	}
}
