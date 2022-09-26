export const USERS = [
	{
		id: "424d3eca-a195-4bdd-8698-fe0deea25fc8",
		name: "Max Schwarz",
		email: "max@example.com",
		password: "testers",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/06/05/07/58/butterfly-2373175_960_720.png",
		placeCount: 5,
	},
	{
		id: "9fc3657e-f3d2-4eb7-9be9-a0ec38f90c48",
		name: "Manu",
		email: "manu@example.com",
		password: "testing",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/06/05/07/58/butterfly-2373175_960_720.png",
		placeCount: 5,
	},
];

export const PLACES = [
	{
		id: "733f3f2a-fd07-4e30-9767-874d21075747",
		userId: "424d3eca-a195-4bdd-8698-fe0deea25fc8",
		title: "Empire State Building 1",
		description: "One of the most famous skyscrapers in the world!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
		address: "20 W 34th St, New York, NY 10001",
		coordinates: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
	},
	{
		id: "ce393340-587e-4fa2-b310-59c0912283a8",
		userId: "424d3eca-a195-4bdd-8698-fe0deea25fc8",
		title: "Empire State Building 2",
		description: "One of the most famous skyscrapers in the world!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
		address: "20 W 34th St, New York, NY 10001",
		coordinates: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
	},
	{
		id: "5a28703c-527b-4a15-9bbf-2c401d2d62df",
		userId: "9fc3657e-f3d2-4eb7-9be9-a0ec38f90c48",
		title: "Empire State Building 3",
		description: "One of the most famous skyscrapers in the world!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
		address: "20 W 34th St, New York, NY 10001",
		coordinates: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
	},
];
