import React from "react";
import Card from "../ui/Card";
import "./UserList.css";
import UserListItem from "./UserListItem";

export default function UserList(props) {
	if (props.users) {
		if (props.users.length > 0) {
			return (
				<ul className="user-list">
					{props.users.map((user) => (
						<UserListItem user={user} key={user.id} />
					))}
				</ul>
			);
		} else {
			return (
				<div className="user-list center">
					<Card>
						<h2>No users found.</h2>
					</Card>
				</div>
			);
		}
	} else {
		return null;
	}
}
