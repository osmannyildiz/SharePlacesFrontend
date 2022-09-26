import cn from "../../utils/classNamesHelper";
import "./Spinner.css";

interface Props {
	asOverlay?: boolean;
}

export default function Spinner(props: Props) {
	return (
		<div className={cn("spinner", props.asOverlay && "spinner--as-overlay")}>
			<div className="spinner-dual-ring"></div>
		</div>
	);
}
