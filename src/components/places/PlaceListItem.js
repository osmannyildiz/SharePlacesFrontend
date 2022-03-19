import React, { useState } from "react";
import Button from "../form/Button";
import Card from "../ui/Card";
import Map from "../ui/Map";
import Modal from "../ui/Modal";
import "./PlaceListItem.css";

export default function PlaceListItem(props) {
	const [mapIsOpen, setMapIsOpen] = useState(false);

	function openMap() {
		setMapIsOpen(true);
	}

	function closeMap() {
		setMapIsOpen(false);
	}

	return (
		<React.Fragment>
			<li className="place-list-item">
				<Card className="place-list-item__content">
					<div className="place-list-item__image">
						<img src={props.place.imageUrl} alt={props.place.title} />
					</div>
					<div className="place-list-item__info">
						<h2>{props.place.title}</h2>
						<h3>{props.place.address}</h3>
						<p>{props.place.description}</p>
					</div>
					<div className="place-list-item__actions">
						<Button inverse onClick={openMap}>
							VIEW ON MAP
						</Button>
						<Button to={`/places/${props.place.id}`}>EDIT</Button>
						<Button danger>DELETE</Button>
					</div>
				</Card>
			</li>
			<Modal
				isOpen={mapIsOpen}
				onCancel={closeMap}
				header={props.place.address}
				bodyClassName="place-list-item__modal-content"
				footer={<Button onClick={closeMap}>CLOSE</Button>}
				footerClassName="place-list-item__modal-actions"
			>
				<div className="map-wrapper">
					<Map center={props.place.coordinates} zoom={16} />
				</div>
			</Modal>
		</React.Fragment>
	);
}
