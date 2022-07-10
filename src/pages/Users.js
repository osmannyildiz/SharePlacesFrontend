import React, { useEffect, useState } from "react";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import UserList from "../components/users/UserList";

export default function Users() {
	const [users, setUsers] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const resp = await fetch("http://localhost:5000/api/users");
				const respData = await resp.json();
				console.log(respData);

				if (!respData.ok) {
					throw new Error(respData.message);
				}

				setUsers(respData.data);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
				setError(err.message);
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<React.Fragment>
			<ErrorModal error={error} onCancel={() => setError(null)} />
			{isLoading && <Spinner asOverlay />}
			{!isLoading && <UserList users={users} />}
		</React.Fragment>
	);
}
