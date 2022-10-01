import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/nav/Header";
import Spinner from "./components/ui/Spinner";
import AuthContext from "./contexts/authContext";
import useAuth from "./hooks/useAuth";
import "./styles/form.scss";

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
			<Routes>
				<Route path="/" element={<Users />} />
				<Route path="/users/:userId/places" element={<UserPlaces />} />
				<Route path="/places/add" element={<AddPlace />} />
				<Route path="/places/:placeId/edit" element={<EditPlace />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path="/" element={<Users />} />
				<Route path="/auth" element={<Authenticate />} />
				<Route path="/users/:userId/places" element={<UserPlaces />} />
				<Route path="*" element={<Navigate to="/auth" replace />} />
			</Routes>
		);
	}

	return (
		<AuthContext.Provider
			value={{ userId, token, login, logout, isLoggedIn: !!userId }}
		>
			<BrowserRouter>
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
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
