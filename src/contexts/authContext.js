import { createContext } from "react";

const AuthContext = createContext({
	userId: null,
	token: null,
	login: (userId, token) => {},
	logout: () => {},
	isLoggedIn: false,
});

export default AuthContext;
