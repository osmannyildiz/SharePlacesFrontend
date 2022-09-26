import { useEffect, useState } from "react";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import UserList from "../components/users/UserList";
import useHttpClient from "../hooks/useHttpClient";
import User from "../models/User";

export default function Users() {
	const [users, setUsers] = useState<User[] | null>(null);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	useEffect(() => {
		(async () => {
			try {
				const respData = await sendRequest(
					import.meta.env.REACT_APP_BACKEND_API_URL + "/users"
				);
				setUsers(respData.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [sendRequest]);

	return (
		<>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && (
				<div className="center">
					<Spinner />
				</div>
			)}
			{!isLoading && users !== null && <UserList users={users} />}
		</>
	);
}
