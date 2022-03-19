import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import "./Modal.css";

function ModalOverlay(props) {
	function defaultSubmitHandler(event) {
		event.preventDefault();
	}

	const content = (
		<div className={`modal ${props.className || ""}`} style={props.style}>
			<header className="modal__header">
				<h2>{props.header}</h2>
			</header>
			<form onSubmit={props.onSubmit ? props.onSubmit : defaultSubmitHandler}>
				<div className={`modal__body ${props.bodyClassName || ""}`}>
					{props.children}
				</div>
				<footer className={`modal__footer ${props.footerClassName || ""}`}>
					{props.footer}
				</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById("modal-portal")
	);
}

export default function Modal(props) {
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}
