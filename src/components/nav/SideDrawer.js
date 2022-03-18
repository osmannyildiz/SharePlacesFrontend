import React from "react";
import ReactDOM from "react-dom";
import NavLinks from "./NavLinks";
import "./SideDrawer.css";

export default function SideDrawer() {
	const content = (
		<aside className="side-drawer">
			<nav className="side-drawer-nav">
				<NavLinks />
			</nav>
		</aside>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById("side-drawer-portal")
	);
}
