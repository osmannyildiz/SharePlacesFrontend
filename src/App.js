import React, { useCallback, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import Header from "./components/nav/Header";
import AuthContext from "./contexts/authContext";
import AddPlace from "./pages/AddPlace";
import Authenticate from "./pages/Authenticate";
import EditPlace from "./pages/EditPlace";
import UserPlaces from "./pages/UserPlaces";
import Users from "./pages/Users";

let logoutTimeoutId;

function App() {
	const [userId, setUserId] = useState(null);
	const [token, setToken] = useState(null);
	const [tokenExpiry, setTokenExpiry] = useState(null);

	const login = useCallback((userId, token, autoLoggingIn = false) => {
		setUserId(userId);
		setToken(token);
		localStorage.setItem("authData", JSON.stringify({ userId, token }));
		if (!autoLoggingIn) {
			const now = new Date();
			const newTokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
			localStorage.setItem("tokenExpiry", newTokenExpiry.toISOString());
		}
		setTokenExpiry(new Date(localStorage.getItem("tokenExpiry")));
	}, []);

	const logout = useCallback(() => {
		setUserId(null);
		setToken(null);
		localStorage.removeItem("authData");
		setTokenExpiry(null);
		localStorage.removeItem("tokenExpiry");
	}, []);

	useEffect(() => {
		const authData = JSON.parse(localStorage.getItem("authData"));
		const storedTokenExpiry = localStorage.getItem("tokenExpiry");
		const now = new Date();

		if (authData && authData.userId) {
			if (storedTokenExpiry && new Date(storedTokenExpiry) > now) {
				login(authData.userId, authData.token, true);
			} else {
				logout();
			}
		}
	}, [login, logout]);

	useEffect(() => {
		if (tokenExpiry) {
			const now = new Date();
			const remainingTimeMs = tokenExpiry.getTime() - now.getTime();
			logoutTimeoutId = setTimeout(logout, remainingTimeMs);
		} else {
			clearTimeout(logoutTimeoutId);
		}
	}, [tokenExpiry, logout]);

	let routes;
	if (userId) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/users/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/places/add" exact>
					<AddPlace />
				</Route>
				<Route path="/places/:placeId/edit" exact>
					<EditPlace />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/auth" exact>
					<Authenticate />
				</Route>
				<Route path="/users/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{ userId, token, login, logout, isLoggedIn: !!userId }}
		>
			<Router>
				<Header />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
