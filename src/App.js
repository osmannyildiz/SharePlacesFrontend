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
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(false);
	const login = useCallback((userId) => {
		setIsLoggedIn(true);
		setUserId(userId);
	}, []);
	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setUserId(null);
	}, []);

	let routes;
	if (isLoggedIn) {
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
		<AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
			<Router>
				<Header />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
