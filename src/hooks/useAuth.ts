import { useCallback, useEffect, useState } from "react";

let logoutTimeoutId: number;

const useAuth = () => {
	const [userId, setUserId] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [tokenExpiry, setTokenExpiry] = useState<Date | null>(null);

	const login = useCallback(
		(userId: string, token: string, autoLoggingIn = false) => {
			setUserId(userId);
			setToken(token);
			localStorage.setItem("authData", JSON.stringify({ userId, token }));
			if (!autoLoggingIn) {
				const now = new Date();
				const newTokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
				localStorage.setItem("tokenExpiry", newTokenExpiry.toISOString());
			}
			const storedTokenExpiry = localStorage.getItem("tokenExpiry");
			if (storedTokenExpiry) {
				setTokenExpiry(new Date(storedTokenExpiry));
			}
		},
		[]
	);

	const logout = useCallback(() => {
		setUserId(null);
		setToken(null);
		localStorage.removeItem("authData");
		setTokenExpiry(null);
		localStorage.removeItem("tokenExpiry");
	}, []);

	useEffect(() => {
		const storedAuthData = localStorage.getItem("authData");
		if (!storedAuthData) {
			return;
		}

		const authData = JSON.parse(storedAuthData);
		if (authData && authData.userId) {
			const storedTokenExpiry = localStorage.getItem("tokenExpiry");
			const now = new Date();

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
