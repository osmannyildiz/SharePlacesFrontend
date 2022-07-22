import React, { useCallback, useState } from "react";
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

function App() {
	const [userId, setUserId] = useState(null);
	const [token, setToken] = useState(null);
	const login = useCallback((userId, token) => {
		setUserId(userId);
		setToken(token);
	}, []);
	const logout = useCallback(() => {
		setUserId(null);
		setToken(null);
	}, []);

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
