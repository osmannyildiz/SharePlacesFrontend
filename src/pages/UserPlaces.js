import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/places/PlaceList";
import { PLACES } from "../utils/dummyData";

export default function UserPlaces() {
	const params = useParams();

	const USER_PLACES = PLACES.filter(
		(place) => place.userId === parseInt(params.userId)
	);

	return <PlaceList places={USER_PLACES} />;
}
