import React from "react";
import "./UsersList.css";
import UsersListItem from "./UsersListItem";

export default function UsersList(props) {
	if (!props.users) {
		return (
			<div className="center">
				<h3>No users found.</h3>
			</div>
		);
	}

	return (
		<ul>
			{props.users.map((user) => (
				<UsersListItem user={user} key={user.id} />
			))}
		</ul>
	);
}
