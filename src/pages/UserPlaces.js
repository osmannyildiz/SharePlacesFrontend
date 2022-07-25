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
					process.env.REACT_APP_BACKEND_API_URL + `/places?userId=${userId}`
				);
				setUserPlaces(respData.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [sendRequest, userId]);

	function onDeletePlace(deletedPlaceId) {
		setUserPlaces((userPlaces) =>
			userPlaces.filter((place) => place.id !== deletedPlaceId)
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && (
				<div className="center">
					<Spinner />
				</div>
			)}
			{!isLoading && (
				<PlaceList places={userPlaces} onDeletePlace={onDeletePlace} />
			)}
		</React.Fragment>
	);
}
