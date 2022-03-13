import React from "react";
import UsersList from "../components/UsersList";

export default function Users() {
	const USERS = [
		{
			id: 1,
			name: "Max Schwarz",
			image:
				"https://cdn.pixabay.com/photo/2017/06/05/07/58/butterfly-2373175_960_720.png",
			placesCount: 5,
		},
	];

	return <UsersList users={USERS} />;
}
