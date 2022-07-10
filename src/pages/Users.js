import React, { useEffect, useState } from "react";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import UserList from "../components/users/UserList";
import useHttpClient from "../hooks/useHttpClient";

export default function Users() {
	const [users, setUsers] = useState(null);
	const [sendRequest, isLoading, error, clearError] = useHttpClient();

	useEffect(() => {
		(async () => {
			try {
				const respData = await sendRequest("http://localhost:5000/api/users");
				setUsers(respData.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && (
				<div className="center">
					<Spinner />
				</div>
			)}
			{!isLoading && <UserList users={users} />}
		</React.Fragment>
	);
}
