import React from "react";
import UserList from "../components/users/UserList";

export default function Users() {
	const USERS = [
		{
			id: 1,
			name: "Max Schwarz",
			imageUrl:
				"https://cdn.pixabay.com/photo/2017/06/05/07/58/butterfly-2373175_960_720.png",
			placeCount: 5,
		},
	];

	return <UserList users={USERS} />;
}
