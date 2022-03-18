import React from "react";
import Card from "../ui/Card";
import "./UsersList.css";
import UsersListItem from "./UsersListItem";

export default function UsersList(props) {
	if (!props.users || props.users.length === 0) {
		return (
			<div className="center">
				<Card style={{ margin: "1rem" }}>
					<h2>No users found.</h2>
				</Card>
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
