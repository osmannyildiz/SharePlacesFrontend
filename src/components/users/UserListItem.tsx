import { Link } from "react-router-dom";
import User from "../../models/User";
import Avatar from "../ui/Avatar";
import Card from "../ui/Card";
import "./UserListItem.scss";

interface Props {
	user: User;
}

export default function UserListItem(props: Props) {
	return (
		<li className="user-list-item">
			<Card className="card--no-padding">
				<Link
					to={`/users/${props.user.id}/places`}
					className="user-list-item__link"
				>
					<div className="user-list-item__image">
						<Avatar
							src={
								props.user.imageUrl
									? import.meta.env.PUBLIC_APP_ASSET_URL +
									  "/" +
									  props.user.imageUrl
									: "/img/default_avatar.png"
							}
							alt={props.user.name}
						/>
					</div>
					<div className="user-list-item__info">
						<h2 className="user-list-item__name">{props.user.name}</h2>
						<h3 className="user-list-item__places-count">
							{props.user.places.length}{" "}
							{props.user.places.length === 1 ? "place" : "places"}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
}
