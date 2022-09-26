import Place from "../../models/Place";
import Button from "../form/Button";
import Card from "../ui/Card";
import "./PlaceList.css";
import PlaceListItem from "./PlaceListItem";

interface Props {
	places: Place[];
	onDeletePlace: (deletedPlaceId: string) => void;
}

export default function PlaceList(props: Props) {
	if (!props.places || props.places.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No places found. Maybe create one?</h2>
					<Button to="/places/add">SHARE PLACE</Button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="place-list">
			{props.places.map((place) => (
				<PlaceListItem
					place={place}
					onDeletePlace={props.onDeletePlace}
					key={place.id}
				/>
			))}
		</ul>
	);
}
