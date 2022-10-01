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
import "./PlaceListItem.scss";

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
					<div className="place-list-item__img-wrapper">
						<img
							className="place-list-item__img"
							src={
								import.meta.env.REACT_APP_ASSET_URL + "/" + props.place.imageUrl
							}
							alt={props.place.title}
						/>
					</div>
					<div className="place-list-item__info">
						<h2 className="place-list-item__info-item">{props.place.title}</h2>
						<h3 className="place-list-item__info-item">
							{props.place.address}
						</h3>
						<p className="place-list-item__info-item">
							{props.place.description}
						</p>
					</div>
					<div className="place-list-item__actions">
						<Button className="place-list-item__action" onClick={openMap}>
							VIEW ON MAP
						</Button>
						{props.place.user === authContext.userId && (
							<>
								<Button
									to={`/places/${props.place.id}/edit`}
									className="place-list-item__action"
								>
									EDIT
								</Button>
								<Button
									className="place-list-item__action"
									danger
									onClick={openDelete}
								>
									DELETE
								</Button>
							</>
						)}
					</div>
				</Card>
			</li>
			<Modal
				className="modal--no-body-padding"
				isOpen={mapIsOpen}
				headerTitle={props.place.address}
				footer={<Button onClick={closeMap}>CLOSE</Button>}
				onCancel={closeMap}
			>
				<div className="place-list-item__modal-body-map-wrapper">
					<Map
						center={props.place.coordinates}
						zoom={18}
						placeId={props.place.id}
					/>
				</div>
			</Modal>
			<Modal
				isOpen={deleteIsOpen}
				headerTitle="Delete Place"
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
				onCancel={closeDelete}
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
