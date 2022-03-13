import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import AddPlace from "./pages/AddPlace";
import Users from "./pages/Users";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/places/add" exact>
					<AddPlace />
				</Route>
				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;
