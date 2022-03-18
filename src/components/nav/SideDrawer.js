import React from "react";
import NavLinks from "./NavLinks";
import "./SideDrawer.css";

export default function SideDrawer() {
	return (
		<aside className="side-drawer">
			<nav className="side-drawer-nav">
				<NavLinks />
			</nav>
		</aside>
	);
}
