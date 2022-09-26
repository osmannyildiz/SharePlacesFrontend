export default interface Place {
	id: string;
	user: string;
	title: string;
	description: string;
	imageUrl: string;
	address: string;
	coordinates: {
		lat: number;
		lng: number;
	};
}
