import React from "react";
import Button from "../form/Button";
import Card from "../ui/Card";
import "./PlaceList.css";
import PlaceListItem from "./PlaceListItem";

export default function PlaceList(props) {
	if (!props.places || props.places.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No places found. Maybe create one?</h2>
					<Button to="/places/add">SHARE PLACE</Button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="place-list">
			{props.places.map((place) => (
				<PlaceListItem place={place} key={place.id} />
			))}
		</ul>
	);
}
