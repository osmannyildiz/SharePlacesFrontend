import React from "react";
import UserList from "../components/users/UserList";
import { USERS } from "../util/dummyData";

export default function Users() {
	return <UserList users={USERS} />;
}
