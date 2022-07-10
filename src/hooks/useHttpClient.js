import { useCallback, useEffect, useRef, useState } from "react";

const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const activeRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = "GET", headers = {}, body = null) => {
			setIsLoading(true);
			const abortCtrl = new AbortController();
			activeRequests.current.push(abortCtrl);
			try {
				const resp = await fetch(url, {
					method,
					headers,
					body,
					signal: abortCtrl.signal,
				});
				activeRequests.current = activeRequests.current.filter(
					(ac) => ac !== abortCtrl
				);
				const respData = await resp.json();
				console.log(respData);

				if (!respData.ok) {
					throw new Error(respData.message);
				}

				setIsLoading(false);
				return respData;
			} catch (err) {
				setError(err.message);
				setIsLoading(false);
				throw err;
			}
		},
		[]
	);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line
			activeRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);

	return [sendRequest, isLoading, error, clearError];
};

export default useHttpClient;
