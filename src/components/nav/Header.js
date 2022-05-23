import React, { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../ui/Backdrop";
import Drawer from "./Drawer";
import "./Header.css";
import HeaderNav from "./HeaderNav";

export default function Header() {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	function openDrawer() {
		setDrawerIsOpen(true);
	}

	function closeDrawer() {
		setDrawerIsOpen(false);
	}

	return (
		<React.Fragment>
			{drawerIsOpen && <Backdrop onClick={closeDrawer} />}
			<Drawer isOpen={drawerIsOpen} handleCloseDrawer={closeDrawer} />

			<header className="header">
				<button className="header__menu-btn" onClick={openDrawer}>
					<span />
					<span />
					<span />
				</button>
				<h1 className="header__title">
					<Link to="/">YourPlaces</Link>
				</h1>
				<HeaderNav />
			</header>
		</React.Fragment>
	);
}
