import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import HeaderNav from "./HeaderNav";
import SideDrawer from "./SideDrawer";

export default function Header() {
	return (
		<React.Fragment>
			<SideDrawer />
			<header className="header">
				<button className="header__menu-btn">
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
