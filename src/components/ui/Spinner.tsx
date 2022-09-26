import "./Spinner.css";

interface Props {
	asOverlay?: boolean;
}

export default function Spinner(props: Props) {
	return (
		<div className={`${props.asOverlay && "spinner__overlay"}`}>
			<div className="spinner-dual-ring"></div>
		</div>
	);
}
