import React from 'react';
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import Modal from 'react-modal';

export const NewVideoPostsModal = ({
	modalIsOpen,
	closeModal,
	savePost,
	videoUrl,
	onInputChange,
	videoError,
	validationState,
	blur,
	style,
}) => (
	<Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} style={style}>
		<form onBlur={blur}>
			<FormGroup validationState={validationState}>
				<ControlLabel>New Video Post</ControlLabel>
				<FormControl type="url" name="video" placeholder="Enter url" value={videoUrl} onChange={onInputChange} />
				<FormControl.Feedback />
				<HelpBlock>{videoError}</HelpBlock>
			</FormGroup>
			<Button onClick={closeModal} bsStyle="warning" style={{ marginRight: '1em' }}>
				Cancel
			</Button>
			<Button onClick={savePost} bsStyle="primary">
				Post video
			</Button>
		</form>
	</Modal>
);
