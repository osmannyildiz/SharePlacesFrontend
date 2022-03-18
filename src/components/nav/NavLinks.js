import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

export default function NavLinks() {
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					ALL USERS
				</NavLink>
			</li>
			<li>
				<NavLink to="/users/1/places">MY PLACES</NavLink>
			</li>
			<li>
				<NavLink to="/places/add">ADD PLACE</NavLink>
			</li>
			<li>
				<NavLink to="/auth">AUTHENTICATE</NavLink>
			</li>
		</ul>
	);
}
