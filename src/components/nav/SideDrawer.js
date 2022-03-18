import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import NavLinks from "./NavLinks";
import "./SideDrawer.css";

export default function SideDrawer(props) {
	const content = (
		<CSSTransition
			in={props.isOpen}
			timeout={200}
			classNames="slide-in-left"
			mountOnEnter
			unmountOnExit
		>
			<aside className="side-drawer">
				<nav className="side-drawer-nav" onClick={props.handleCloseDrawer}>
					<NavLinks />
				</nav>
			</aside>
		</CSSTransition>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById("side-drawer-portal")
	);
}
