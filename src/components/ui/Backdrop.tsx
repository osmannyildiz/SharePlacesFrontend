import ReactDOM from "react-dom";
import "./Backdrop.scss";

interface Props {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Backdrop(props: Props) {
	return ReactDOM.createPortal(
		<div className="backdrop" onClick={props.onClick}></div>,
		document.getElementById("backdrop-portal")!
	);
}
