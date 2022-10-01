import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import "./NavLinks.scss";

export default function NavLinks() {
	const authContext = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li className="nav-links__li">
				<NavLink className="nav-links__item" to="/" end>
					ALL USERS
				</NavLink>
			</li>
			{!authContext.isLoggedIn && (
				<li className="nav-links__li">
					<NavLink className="nav-links__item" to="/auth">
						AUTHENTICATE
					</NavLink>
				</li>
			)}
			{authContext.isLoggedIn && (
				<>
					<li className="nav-links__li">
						<NavLink
							className="nav-links__item"
							to={`/users/${authContext.userId}/places`}
						>
							MY PLACES
						</NavLink>
					</li>
					<li className="nav-links__li">
						<NavLink className="nav-links__item" to="/places/add">
							ADD PLACE
						</NavLink>
					</li>
					<li className="nav-links__li">
						<button className="nav-links__item" onClick={authContext.logout}>
							LOGOUT
						</button>
					</li>
				</>
			)}
		</ul>
	);
}
