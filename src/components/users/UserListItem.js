import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Card from "../ui/Card";
import "./UserListItem.css";

export default function UserListItem(props) {
	return (
		<li className="user-list-item">
			<Card className="user-list-item__content">
				<Link to={`/users/${props.user.id}/places`}>
					<div className="user-list-item__image">
						<Avatar
							src={
								props.user.imageUrl
									? process.env.REACT_APP_ASSET_URL + "/" + props.user.imageUrl
									: "/img/default_avatar.png"
							}
							alt={props.user.name}
						/>
					</div>
					<div className="user-list-item__info">
						<h2>{props.user.name}</h2>
						<h3>
							{props.user.places.length}{" "}
							{props.user.places.length === 1 ? "place" : "places"}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
}
