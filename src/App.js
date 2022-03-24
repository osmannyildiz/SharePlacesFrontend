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
	const login = useCallback(() => {
		setIsLoggedIn(true);
	}, []);
	const logout = useCallback(() => {
		setIsLoggedIn(false);
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			<Router>
				<Header />
				<main>
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
						<Route path="/places/add" exact>
							<AddPlace />
						</Route>
						<Route path="/places/:placeId/edit" exact>
							<EditPlace />
						</Route>
						<Redirect to="/" />
					</Switch>
				</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
