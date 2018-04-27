import React from 'react';
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import Modal from 'react-modal';

export const NewImagePostsModal = ({
	modalIsOpen,
	closeModal,
	savePost,
	imageUrl,
	onInputChange,
	onFileChange,
	imagePreview,
	imageError,
	validationState,
	blur,
	style,
}) => (
	<Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} style={style}>
		<form onBlur={blur}>
			<FormGroup validationState={validationState}>
				<ControlLabel>New Image Post</ControlLabel>
				<FormControl type="url" name="image" placeholder="Enter url" value={imageUrl} onChange={onInputChange} />
				<FormControl.Feedback />
				<HelpBlock>{imageError}</HelpBlock>
			</FormGroup>
			<FormGroup>
				<ControlLabel>Upload Image:</ControlLabel>
				<FormControl type="file" name="uploadImage" onChange={onFileChange} className="upload-file" />
			</FormGroup>
			{imagePreview}
			<Button onClick={closeModal} bsStyle="warning" style={{ marginRight: '1em' }}>
				Cancel
			</Button>
			<Button onClick={savePost} bsStyle="primary">
				Post image
			</Button>
		</form>
	</Modal>
);
