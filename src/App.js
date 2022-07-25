import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import Header from "./components/nav/Header";
import Spinner from "./components/ui/Spinner";
import AuthContext from "./contexts/authContext";
import useAuth from "./hooks/useAuth";
import "./styles/form.css";

// Code splitting (lazy load pages)
const AddPlace = React.lazy(() => import("./pages/AddPlace"));
const Authenticate = React.lazy(() => import("./pages/Authenticate"));
const EditPlace = React.lazy(() => import("./pages/EditPlace"));
const UserPlaces = React.lazy(() => import("./pages/UserPlaces"));
const Users = React.lazy(() => import("./pages/Users"));

function App() {
	const { userId, token, login, logout } = useAuth();

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
				<main>
					<Suspense
						fallback={
							<div className="center">
								<Spinner />
							</div>
						}
					>
						{routes}
					</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
