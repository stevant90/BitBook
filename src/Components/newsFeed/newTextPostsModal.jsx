import React from 'react';
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import Modal from 'react-modal';

export const NewTextPostsModal = ({
	modalIsOpen,
	closeModal,
	savePost,
	text,
	onInputChange,
	textError,
	validationState,
	blur,
	style,
}) => (
	<Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} style={style}>
		<form onBlur={blur}>
			<FormGroup validationState={validationState}>
				<ControlLabel>New Text Post</ControlLabel>
				<FormControl
					componentClass="textarea"
					type="text"
					name="text"
					cols="20"
					rows="5"
					value={text}
					onChange={onInputChange}
				/>
				<FormControl.Feedback />
				<HelpBlock>{textError}</HelpBlock>
			</FormGroup>
			<Button onClick={closeModal} bsStyle="warning" style={{ marginRight: '1em' }}>
				Cancel
			</Button>
			<Button onClick={savePost} bsStyle="primary">
				Post text
			</Button>
		</form>
	</Modal>
);
