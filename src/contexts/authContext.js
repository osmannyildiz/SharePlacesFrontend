import { createContext } from "react";

const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	login: (userId) => {},
	logout: () => {},
});

export default AuthContext;
