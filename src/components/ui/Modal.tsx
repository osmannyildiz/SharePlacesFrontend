import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import cn from "../../utils/classNamesHelper";
import Backdrop from "./Backdrop";
import "./Modal.scss";

interface ModalOverlayProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	headerTitle: React.ReactNode;
	footer: React.ReactNode;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

function ModalOverlay(props: ModalOverlayProps) {
	const defaultSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
		event
	) => {
		event.preventDefault();
	};

	const content = (
		<div className={cn("modal", props.className)} style={props.style}>
			<header className="modal__header">
				<h2 className="modal__header-title">{props.headerTitle}</h2>
			</header>
			<form onSubmit={props.onSubmit ? props.onSubmit : defaultSubmitHandler}>
				<div className="modal__body">{props.children}</div>
				<footer className="modal__footer">{props.footer}</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById("modal-portal")!
	);
}

interface Props extends ModalOverlayProps {
	isOpen: boolean;
	onCancel: () => void;
}

export default function Modal(props: Props) {
	return (
		<>
			{props.isOpen && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.isOpen}
				classNames="modal"
				timeout={200}
				mountOnEnter
				unmountOnExit
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</>
	);
}
