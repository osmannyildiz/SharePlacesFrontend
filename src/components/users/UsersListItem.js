import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Card from "../ui/Card";
import "./UsersListItem.css";

export default function UsersListItem(props) {
	return (
		<li className="users-list-item">
			<Card className="users-list-item__content">
				<Link to={`/users/${props.user.id}/places`}>
					<div className="users-list-item__image">
						<Avatar src={props.user.image} alt={props.user.name} />
					</div>
					<div className="users-list-item__info">
						<h2>{props.user.name}</h2>
						<h3>
							{props.user.placesCount}{" "}
							{props.user.placesCount === 1 ? "place" : "places"}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
}
