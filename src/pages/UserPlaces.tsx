import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/places/PlaceList";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import useHttpClient from "../hooks/useHttpClient";
import Place from "../models/Place";

export default function UserPlaces() {
	const [userPlaces, setUserPlaces] = useState<Place[] | null>(null);
	const { userId } = useParams();
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	useEffect(() => {
		(async () => {
			try {
				const respData = await sendRequest(
					import.meta.env.PUBLIC_APP_BACKEND_API_URL +
						`/places?userId=${userId}`
				);
				setUserPlaces(respData.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [sendRequest, userId]);

	function onDeletePlace(deletedPlaceId: string) {
		setUserPlaces((userPlaces) => {
			if (userPlaces === null) {
				return null;
			}
			return userPlaces.filter((place) => place.id !== deletedPlaceId);
		});
	}

	return (
		<>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && (
				<div className="center">
					<Spinner />
				</div>
			)}
			{!isLoading && userPlaces !== null && (
				<PlaceList places={userPlaces} onDeletePlace={onDeletePlace} />
			)}
		</>
	);
}
