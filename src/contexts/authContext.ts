import { createContext } from "react";

interface IAuthContext {
	userId: string | null;
	token: string | null;
	login: (userId: string, token: string) => void;
	logout: () => void;
	isLoggedIn: boolean;
}

const AuthContext = createContext<IAuthContext>({
	userId: null,
	token: null,
	login: (userId: string, token: string) => {},
	logout: () => {},
	isLoggedIn: false,
});

export default AuthContext;
