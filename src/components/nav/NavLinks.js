import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import "./NavLinks.css";

export default function NavLinks() {
	const authContext = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink className="nav-link" to="/" exact>
					ALL USERS
				</NavLink>
			</li>
			{!authContext.isLoggedIn && (
				<li>
					<NavLink className="nav-link" to="/auth">
						AUTHENTICATE
					</NavLink>
				</li>
			)}
			{authContext.isLoggedIn && (
				<li>
					<NavLink className="nav-link" to="/users/1/places">
						MY PLACES
					</NavLink>
				</li>
			)}
			{authContext.isLoggedIn && (
				<li>
					<NavLink className="nav-link" to="/places/add">
						ADD PLACE
					</NavLink>
				</li>
			)}
			{authContext.isLoggedIn && (
				<li>
					<button className="nav-link" onClick={authContext.logout}>
						LOGOUT
					</button>
				</li>
			)}
		</ul>
	);
}
