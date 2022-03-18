import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import Header from "./components/nav/Header";
import AddPlace from "./pages/AddPlace";
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
					<Route path="/places/add" exact>
						<AddPlace />
					</Route>
					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
}

export default App;
