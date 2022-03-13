import React from "react";
import "./UsersListItem.css";

export default function UsersListItem(props) {
	return (
		<li className="users-list-item">
			<div className="user-item__content">
				<div className="user-item__image">
					<img src={props.user.image} alt={props.user.name} />
				</div>
				<div className="user-item__info">
					<h2>{props.user.name}</h2>
					<h3>
						{props.user.placesCount}{" "}
						{props.user.placesCount === 1 ? "place" : "places"}
					</h3>
				</div>
			</div>
		</li>
	);
}
