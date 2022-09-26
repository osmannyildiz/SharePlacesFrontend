import { useCallback, useEffect, useRef, useState } from "react";

const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const activeRequests = useRef<AbortController[]>([]);

	const sendRequest = useCallback<
		(
			url: string,
			method?: string,
			headers?: HeadersInit,
			body?: BodyInit
		) => any
	>(async (url, method = "GET", headers, body) => {
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

			if (!respData.ok) {
				throw new Error(respData.message);
			}

			setIsLoading(false);
			return respData;
		} catch (err) {
			setError((err as Error).message);
			setIsLoading(false);
			throw err;
		}
	}, []);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	useEffect(() => {
		return () => {
			activeRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);

	return { sendRequest, isLoading, error, clearError };
};

export default useHttpClient;
