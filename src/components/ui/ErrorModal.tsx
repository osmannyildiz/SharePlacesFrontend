import Button from "../form/Button";
import Modal from "./Modal";

interface Props {
	error: string | null;
	onCancel: () => void;
}

export default function ErrorModal(props: Props) {
	return (
		<Modal
			onCancel={props.onCancel}
			header="An Error Occurred!"
			isOpen={!!props.error}
			footer={<Button onClick={props.onCancel}>OKAY</Button>}
		>
			<p>{props.error}</p>
		</Modal>
	);
}
