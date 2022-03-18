import React from "react";
import PlaceList from "../components/places/PlaceList";

export default function UserPlaces() {
	const PLACES = [
		{
			id: 1,
			userId: 1,
			title: "Empire State Building",
			description: "One of the most famous skyscrapers in the world!",
			imageUrl:
				"https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
			address: "20 W 34th St, New York, NY 10001",
			location: {
				lat: 40.7484405,
				lng: -73.9878584,
			},
		},
		{
			id: 2,
			userId: 1,
			title: "Empire State Building",
			description: "One of the most famous skyscrapers in the world!",
			imageUrl:
				"https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
			address: "20 W 34th St, New York, NY 10001",
			location: {
				lat: 40.7484405,
				lng: -73.9878584,
			},
		},
		{
			id: 3,
			userId: 2,
			title: "Empire State Building",
			description: "One of the most famous skyscrapers in the world!",
			imageUrl:
				"https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
			address: "20 W 34th St, New York, NY 10001",
			location: {
				lat: 40.7484405,
				lng: -73.9878584,
			},
		},
	];

	return <PlaceList places={PLACES} />;
}
