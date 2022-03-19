import React from "react";
import Button from "../form/Button";
import Card from "../ui/Card";
import "./PlaceListItem.css";

export default function PlaceListItem(props) {
	return (
		<li className="place-list-item">
			<Card className="place-list-item__content">
				<div className="place-list-item__image">
					<img src={props.place.imageUrl} alt={props.place.title} />
				</div>
				<div className="place-list-item__info">
					<h2>{props.place.title}</h2>
					<h3>{props.place.address}</h3>
					<p>{props.place.description}</p>
				</div>
				<div className="place-list-item__actions">
					<Button inverse>VIEW ON MAP</Button>
					<Button to={`/places/${props.place.id}`}>EDIT</Button>
					<Button danger>DELETE</Button>
				</div>
			</Card>
		</li>
	);
}
