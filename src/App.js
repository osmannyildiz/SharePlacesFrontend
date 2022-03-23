import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import Header from "./components/nav/Header";
import AddPlace from "./pages/AddPlace";
import Authenticate from "./pages/Authenticate";
import EditPlace from "./pages/EditPlace";
import UserPlaces from "./pages/UserPlaces";
import Users from "./pages/Users";

function App() {
	return (
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
	);
}

export default App;
