import React, { Component } from 'react';
import Modal from 'react-modal';
import { Button, FormControl, FormGroup, Grid, Row, Col, HelpBlock, ControlLabel, Glyphicon } from 'react-bootstrap';

import { dataService } from '../../Service/dataService';
import { validationService } from '../../Service/validationService';

export default class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			short: '',
			about: '',
			avatarUrl: '',
			fileAvatarUrl: '',
			file: '',
			modalIsOpen: false,
			imagePreviewUrl: '',
		};
	}

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({
			modalIsOpen: false,
			file: '',
		});
	};

	componentDidMount() {
		this.loadOwnData();
	}

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value,
			[`${name}Error`]: validationService.isInputValid(name, value).errorMessage,
			[`${name}ValidationState`]: validationService.isInputValid(name, value).validationState,
		});
	};

	getFormErrors() {
		let data = {
			name: this.state.name,
			email: this.state.email,
			aboutShort: this.state.short,
			about: this.state.about,
			avatarUrl: this.state.avatarUrl,
		};

		this.setState({
			nameError: validationService.isInputValid('name', data.name).errorMessage,
			nameValidationState: validationService.isInputValid('name', data.name).validationState,
			emailError: validationService.isInputValid('email', data.email).errorMessage,
			emailValidationState: validationService.isInputValid('email', data.email).validationState,
			shortError: validationService.isInputValid('short', data.aboutShort).errorMessage,
			shortValidationState: validationService.isInputValid('short', data.aboutShort).validationState,
			aboutError: validationService.isInputValid('about', data.about).errorMessage,
			aboutValidationState: validationService.isInputValid('about', data.about).validationState,
			avatarUrlError: !this.state.file ? validationService.isInputValid('avatarUrl', data.avatarUrl).errorMessage : '',
			avatarUrlValidationState: !this.state.file
				? validationService.isInputValid('avatarUrl', data.avatarUrl).validationState
				: null,
		});
	}

	onBlur = () => {
		this.setState({
			nameError: '',
			nameValidationState: null,
			emailError: '',
			emailValidationState: null,
			shortError: '',
			shortValidationState: null,
			aboutError: '',
			aboutValidationState: null,
			avatarUrlError: '',
			avatarUrlValidationState: null,
		});
	};

	handleUploadChange = event => {
		let file = event.target.files[0];

		const reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				file,
				imagePreviewUrl: reader.result,
			});
		};

		reader.readAsDataURL(file);
	};

	loadOwnData = () => {
		dataService.getProfile(profile => {
			this.setState({
				name: profile.name,
				email: profile.email,
				short: profile.aboutShort,
				about: profile.about,
				avatarUrl: profile.avatarUrl,
			});
		});
	};

	saveChanges = event => {
		event.preventDefault();

		this.getFormErrors();

		const { file } = this.state;

		if (file === '') {
			let data = {
				name: this.state.name,
				email: this.state.email,
				aboutShort: this.state.short,
				about: this.state.about,
				avatarUrl: this.state.avatarUrl,
			};

			if (validationService.isFormValid(data)) {
				dataService.editProfile(data, response => {
					this.closeModal();
					this.props.reloadProfile();
				});
			}
		} else {
			let data = {
				name: this.state.name,
				email: this.state.email,
				aboutShort: this.state.short,
				about: this.state.about,
			};

			dataService.uploadImage(file, response => {
				data.avatarUrl = response.data;
				const avatar = response.data;

				dataService.editProfile(data, response => {
					this.setState({ avatarUrl: avatar });
					this.closeModal();
					this.props.reloadProfile();
				});
			});
		}
	};

	render() {
		const customStyles = {
			content: {
				marginRight: '-50%',
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				transform: 'translate(-50%, -50%)',
			},
		};

		let image = this.state.file ? (
			<img src={this.state.imagePreviewUrl} alt="preview Image" style={{ width: '20%' }} />
		) : (
			''
		);

		return (
			<div>
				<Grid>
					<Row style={{ marginTop: '15em' }}>
						<Col xs={4} xsOffset={4} style={{ textAlign: 'center' }}>
							<Button onClick={this.openModal} bsStyle="primary">
								Edit Profile
							</Button>
						</Col>
					</Row>
				</Grid>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					ariaHideApp={false}
					style={customStyles}
				>
					<form onBlur={this.onBlur}>
						<h2 style={{ textAlign: 'center' }}>Edit Profile</h2>
						<FormGroup validationState={this.state.nameValidationState}>
							<Glyphicon glyph="user" />
							<ControlLabel>Name:</ControlLabel>
							<FormControl type="text" name="name" value={this.state.name} onChange={this.handleChange} />
							<FormControl.Feedback />
							<HelpBlock>{this.state.nameError}</HelpBlock>
						</FormGroup>
						<FormGroup validationState={this.state.emailValidationState}>
							<Glyphicon glyph="envelope" />
							<ControlLabel>Email:</ControlLabel>
							<FormControl type="email" name="email" value={this.state.email} onChange={this.handleChange} />
							<FormControl.Feedback />
							<HelpBlock>{this.state.emailError}</HelpBlock>
						</FormGroup>
						<FormGroup validationState={this.state.shortValidationState}>
							<Glyphicon glyph="pencil" />
							<ControlLabel>About short:</ControlLabel>
							<FormControl type="text" name="short" value={this.state.short} onChange={this.handleChange} />
							<FormControl.Feedback />
							<HelpBlock>{this.state.shortError}</HelpBlock>
						</FormGroup>
						<FormGroup validationState={this.state.aboutValidationState}>
							<Glyphicon glyph="book" />
							<ControlLabel>About:</ControlLabel>
							<FormControl type="text" name="about" value={this.state.about} onChange={this.handleChange} />
							<FormControl.Feedback />
							<HelpBlock>{this.state.aboutError}</HelpBlock>
						</FormGroup>
						<FormGroup validationState={this.state.avatarUrlValidationState}>
							<Glyphicon glyph="picture" />
							<ControlLabel>Image Url:</ControlLabel>
							<FormControl type="url" name="avatarUrl" value={this.state.avatarUrl} onChange={this.handleChange} />
							<FormControl.Feedback />
							<HelpBlock>{this.state.avatarUrlError}</HelpBlock>
						</FormGroup>
						<FormGroup>
							<Glyphicon glyph="picture" />
							<ControlLabel>Upload Image:</ControlLabel>

							<FormControl type="file" name="uploadImage" onChange={this.handleUploadChange} />
						</FormGroup>
						{image}

						<Button onClick={this.closeModal} bsStyle="warning" style={{ marginRight: '1em' }}>
							Close
						</Button>

						<Button onClick={this.saveChanges} bsStyle="primary">
							Save changes
						</Button>
					</form>
				</Modal>
			</div>
		);
	}
}
