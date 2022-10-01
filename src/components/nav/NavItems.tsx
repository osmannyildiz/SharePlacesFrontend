import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import "./NavItems.scss";

export default function NavItems() {
	const authContext = useContext(AuthContext);

	return (
		<ul className="nav-items">
			<li className="nav-items__li">
				<NavLink className="nav-items__item" to="/" end>
					ALL USERS
				</NavLink>
			</li>
			{!authContext.isLoggedIn && (
				<li className="nav-items__li">
					<NavLink className="nav-items__item" to="/auth">
						AUTHENTICATE
					</NavLink>
				</li>
			)}
			{authContext.isLoggedIn && (
				<>
					<li className="nav-items__li">
						<NavLink
							className="nav-items__item"
							to={`/users/${authContext.userId}/places`}
						>
							MY PLACES
						</NavLink>
					</li>
					<li className="nav-items__li">
						<NavLink className="nav-items__item" to="/places/add">
							ADD PLACE
						</NavLink>
					</li>
					<li className="nav-items__li">
						<button className="nav-items__item" onClick={authContext.logout}>
							LOGOUT
						</button>
					</li>
				</>
			)}
		</ul>
	);
}
