import React, { Component } from 'react';
import Modal from 'react-modal';
import { Button, DropdownButton } from 'react-bootstrap';

import { dataService } from '../../Service/dataService';
import { NewTextPostsModal } from './newTextPostsModal';
import { NewImagePostsModal } from './newImagePostsModal';
import { NewVideoPostsModal } from './newVideoPostsModal';
import { validationService } from '../../Service/validationService';

export default class NewPostsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			file: '',
			image: '',
			video: '',
			imagePreviewUrl: '',
			textModalIsOpen: false,
			imageModalIsOpen: false,
			videoModalIsOpen: false,
		};
	}

	openTextModal = () => {
		this.setState({ textModalIsOpen: true });
	};

	openImageModal = () => {
		this.setState({ imageModalIsOpen: true });
	};

	openVideoModal = () => {
		this.setState({ videoModalIsOpen: true });
	};

	closeModal = () => {
		this.setState({
			textModalIsOpen: false,
			imageModalIsOpen: false,
			videoModalIsOpen: false,
			file: '',
			image: '',
			video: '',
			text: '',
		});
	};

	handleInputChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value,
			[`${name}Error`]: validationService.isInputValid(name, value).errorMessage,
			[`${name}ValidationState`]: validationService.isInputValid(name, value).validationState,
		});
	};

	handleFileChange = event => {
		const file = event.target.files[0];

		const reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				file,
				imagePreviewUrl: reader.result,
			});
		};

		reader.readAsDataURL(file);
	};

	getTextErrors() {
		let data = {
			text: this.state.text,
		};

		this.setState({
			textError: validationService.isInputValid('text', data.text).errorMessage,
			textValidationState: validationService.isInputValid('text', data.text).validationState,
		});
	}

	getImageErrors() {
		let data = {
			image: this.state.image,
		};

		this.setState({
			imageError: !this.state.file ? validationService.isInputValid('image', data.image).errorMessage : '',
			imageValidError: !this.state.file ? validationService.isInputValid('image', data.image).urlValidError : '',
			imageValidState: !this.state.file ? validationService.isInputValid('image', data.image).urlValidationState : null,
			imageValidationState: !this.state.file
				? validationService.isInputValid('image', data.image).validationState
				: null,
		});
	}

	getVideoErrors() {
		let data = {
			video: this.state.video,
		};

		this.setState({
			videoError: !data.video
				? validationService.isInputValid('video', data.video).errorMessage
				: validationService.isInputValid('video', data.video).videoUrlValidError,
			videoValidationState: !data.video
				? validationService.isInputValid('video', data.video).validationState
				: validationService.isInputValid('video', data.video).videoUrlValidationState,
		});
	}

	onBlur = () => {
		this.setState({
			textError: '',
			imageError: '',
			imageValidError: '',
			videoError: '',
			textValidationState: null,
			imageValidationState: null,
			videoValidationState: null,
			imageValidState: null,
		});
	};

	saveTextPost = event => {
		event.preventDefault();

		let text = {
			text: this.state.text,
		};

		this.getTextErrors();

		if (validationService.isFormValid(text)) {
			dataService.newPost('Text', text, response => {
				this.closeModal();
				this.props.reloadPage();
			});
		}
	};

	saveImagePost = event => {
		event.preventDefault();

		const { file } = this.state;

		let image = {};

		this.getImageErrors();

		if (!file) {
			image.imageUrl = this.state.image;

			if (
				validationService.isFormValid(image) &&
				validationService.isInputValid('image', this.state.image).isUrlValid
			) {
				dataService.newPost('Image', image, response => {
					this.closeModal();
					this.props.reloadPage();
				});
			}
		} else {
			dataService.uploadImage(file, response => {
				image.imageUrl = response.data;

				dataService.newPost('Image', image, response => {
					this.closeModal();
					this.props.reloadPage();
				});
			});
		}
	};

	saveVideoPost = event => {
		event.preventDefault();

		const video = {
			videoUrl: this.state.video,
		};

		this.getVideoErrors();

		if (
			validationService.isFormValid(video) &&
			validationService.isInputValid('video', this.state.video).isVideoUrlValid
		) {
			dataService.newPost('Video', video, response => {
				this.closeModal();
				this.props.reloadPage();
				this.setState({ video: '' });
			});
		}
	};

	render() {
		const customStyles = {
			content: {
				width: '60%',
				marginRight: '-50%',
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				transform: 'translate(-50%, -50%)',
			},
		};

		let image = this.state.file ? (
			<img src={this.state.imagePreviewUrl} alt="Image Preview" style={{ width: '20%' }} />
		) : (
			''
		);

		return (
			<div className="new-posts">
				<DropdownButton title="Leave a post" id="dropdown-size-medium" bsStyle="primary">
					<Button bsStyle="primary" onClick={this.openTextModal} block>
						Text
					</Button>

					<Button bsStyle="primary" onClick={this.openImageModal} block>
						Image
					</Button>

					<Button bsStyle="primary" onClick={this.openVideoModal} block>
						Video
					</Button>
				</DropdownButton>

				<NewTextPostsModal
					modalIsOpen={this.state.textModalIsOpen}
					closeModal={this.closeModal}
					savePost={this.saveTextPost}
					text={this.state.text}
					onInputChange={this.handleInputChange}
					style={customStyles}
					textError={this.state.textError}
					validationState={this.state.textValidationState}
					blur={this.onBlur}
				/>

				<NewImagePostsModal
					modalIsOpen={this.state.imageModalIsOpen}
					closeModal={this.closeModal}
					savePost={this.saveImagePost}
					imageUrl={this.state.image}
					onInputChange={this.handleInputChange}
					style={customStyles}
					onFileChange={this.handleFileChange}
					imagePreview={image}
					imageError={this.state.imageError ? this.state.imageError : this.state.imageValidError}
					validationState={
						this.state.imageValidationState ? this.state.imageValidationState : this.state.imageValidState
					}
					blur={this.onBlur}
				/>

				<NewVideoPostsModal
					modalIsOpen={this.state.videoModalIsOpen}
					closeModal={this.closeModal}
					savePost={this.saveVideoPost}
					videoUrl={this.state.video}
					onInputChange={this.handleInputChange}
					style={customStyles}
					videoError={this.state.videoError}
					validationState={this.state.videoValidationState}
					blur={this.onBlur}
				/>
			</div>
		);
	}
}
