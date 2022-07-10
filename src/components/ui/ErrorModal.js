import React from 'react';
import Button from "../form/Button";
import Modal from "./Modal";

export default function ErrorModal(props) {
	return (
		<Modal
			onCancel={props.onCancel}
			header="An Error Occurred!"
			isOpen={!!props.error}
			footer={<Button onClick={props.onCancel}>Okay</Button>}
		>
			<p>{props.error}</p>
		</Modal>
	);
}
