import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/places/PlaceList";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import useHttpClient from "../hooks/useHttpClient";

export default function UserPlaces() {
	const [userPlaces, setUserPlaces] = useState(null);
	const { userId } = useParams();
	const [sendRequest, isLoading, error, clearError] = useHttpClient();

	useEffect(() => {
		(async () => {
			try {
				const respData = await sendRequest(
					`http://localhost:5000/api/places?userId=${userId}`
				);
				setUserPlaces(respData.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [sendRequest, userId]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && (
				<div className="center">
					<Spinner />
				</div>
			)}
			<PlaceList places={userPlaces} />
		</React.Fragment>
	);
}
