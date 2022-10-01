import Button from "../form/Button";
import Modal from "./Modal";

interface Props {
	error: string | null;
	onCancel: () => void;
}

export default function ErrorModal(props: Props) {
	return (
		<Modal
			isOpen={!!props.error}
			headerTitle="An Error Occurred!"
			footer={<Button onClick={props.onCancel}>OKAY</Button>}
			onCancel={props.onCancel}
		>
			<p>{props.error}</p>
		</Modal>
	);
}
