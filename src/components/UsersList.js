import React from "react";
import "./UsersList.css";
import UsersListItem from "./UsersListItem";

export default function UsersList(props) {
	if (!props.users || props.users.length === 0) {
		return (
			<div className="center">
				<h2>No users found.</h2>
			</div>
		);
	}

	return (
		<ul className="users-list">
			{props.users.map((user) => (
				<UsersListItem user={user} key={user.id} />
			))}
		</ul>
	);
}
