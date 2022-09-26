import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import useHttpClient from "../../hooks/useHttpClient";
import Place from "../../models/Place";
import Button from "../form/Button";
import Card from "../ui/Card";
import ErrorModal from "../ui/ErrorModal";
import Map from "../ui/Map";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import "./PlaceListItem.css";

interface Props {
	place: Place;
	onDeletePlace: (deletedPlaceId: string) => void;
}

export default function PlaceListItem(props: Props) {
	const authContext = useContext(AuthContext);
	const [mapIsOpen, setMapIsOpen] = useState(false);
	const [deleteIsOpen, setDeleteIsOpen] = useState(false);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	const openMap = () => setMapIsOpen(true);
	const closeMap = () => setMapIsOpen(false);
	const openDelete = () => setDeleteIsOpen(true);
	const closeDelete = () => setDeleteIsOpen(false);

	async function deleteHandler() {
		closeDelete();
		try {
			await sendRequest(
				import.meta.env.REACT_APP_BACKEND_API_URL + `/places/${props.place.id}`,
				"DELETE",
				{
					Authorization: "Bearer " + authContext.token,
				}
			);
			props.onDeletePlace(props.place.id);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && <Spinner asOverlay />}
			<li className="place-list-item">
				<Card className="card--no-padding">
					<div className="place-list-item__image">
						<img
							src={
								import.meta.env.REACT_APP_ASSET_URL + "/" + props.place.imageUrl
							}
							alt={props.place.title}
						/>
					</div>
					<div className="place-list-item__info">
						<h2>{props.place.title}</h2>
						<h3>{props.place.address}</h3>
						<p>{props.place.description}</p>
					</div>
					<div className="place-list-item__actions">
						<Button onClick={openMap}>VIEW ON MAP</Button>
						{props.place.user === authContext.userId && (
							<>
								<Button to={`/places/${props.place.id}/edit`}>EDIT</Button>
								<Button danger onClick={openDelete}>
									DELETE
								</Button>
							</>
						)}
					</div>
				</Card>
			</li>
			<Modal
				isOpen={mapIsOpen}
				onCancel={closeMap}
				header={props.place.address}
				bodyClassName="modal__body--no-padding"
				footer={<Button onClick={closeMap}>CLOSE</Button>}
			>
				<div className="map-wrapper">
					<Map
						center={props.place.coordinates}
						zoom={18}
						placeId={props.place.id}
					/>
				</div>
			</Modal>
			<Modal
				isOpen={deleteIsOpen}
				onCancel={closeDelete}
				header="Delete Place"
				footer={
					<>
						<Button inverse onClick={closeDelete}>
							CANCEL
						</Button>
						<Button danger onClick={deleteHandler}>
							DELETE
						</Button>
					</>
				}
			>
				<p>Are you sure you want to delete this place?</p>
				<p>{props.place.title}</p>
				<p>
					<strong>This operation cannot be undone.</strong>
				</p>
			</Modal>
		</>
	);
}
