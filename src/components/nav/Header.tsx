import { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../ui/Backdrop";
import Drawer from "./Drawer";
import "./Header.scss";
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
		<>
			{drawerIsOpen && <Backdrop onClick={closeDrawer} />}
			<Drawer isOpen={drawerIsOpen} handleCloseDrawer={closeDrawer} />

			<header className="header">
				<button className="header__menu-btn" onClick={openDrawer}>
					<span className="header__menu-btn-bar" />
					<span className="header__menu-btn-bar" />
					<span className="header__menu-btn-bar" />
				</button>
				<h1 className="header__brand">
					<Link to="/" className="header__brand-link">
						{import.meta.env.PUBLIC_APP_BRAND}
					</Link>
				</h1>
				<HeaderNav />
			</header>
		</>
	);
}
