import { useCallback, useEffect, useState } from "react";

let logoutTimeoutId;

const useAuth = () => {
	const [userId, setUserId] = useState(null);
	const [token, setToken] = useState(null);
	const [tokenExpiry, setTokenExpiry] = useState(null);

	const login = useCallback((userId, token, autoLoggingIn = false) => {
		setUserId(userId);
		setToken(token);
		localStorage.setItem("authData", JSON.stringify({ userId, token }));
		if (!autoLoggingIn) {
			const now = new Date();
			const newTokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
			localStorage.setItem("tokenExpiry", newTokenExpiry.toISOString());
		}
		setTokenExpiry(new Date(localStorage.getItem("tokenExpiry")));
	}, []);

	const logout = useCallback(() => {
		setUserId(null);
		setToken(null);
		localStorage.removeItem("authData");
		setTokenExpiry(null);
		localStorage.removeItem("tokenExpiry");
	}, []);

	useEffect(() => {
		const authData = JSON.parse(localStorage.getItem("authData"));
		const storedTokenExpiry = localStorage.getItem("tokenExpiry");
		const now = new Date();

		if (authData && authData.userId) {
			if (storedTokenExpiry && new Date(storedTokenExpiry) > now) {
				login(authData.userId, authData.token, true);
			} else {
				logout();
			}
		}
	}, [login, logout]);

	useEffect(() => {
		if (tokenExpiry) {
			const now = new Date();
			const remainingTimeMs = tokenExpiry.getTime() - now.getTime();
			logoutTimeoutId = setTimeout(logout, remainingTimeMs);
		} else {
			clearTimeout(logoutTimeoutId);
		}
	}, [tokenExpiry, logout]);

	return { userId, token, login, logout };
};

export default useAuth;
