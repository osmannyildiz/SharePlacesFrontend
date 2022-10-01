import cn from "../../utils/classNamesHelper";
import "./Spinner.scss";

interface Props {
	asOverlay?: boolean;
}

export default function Spinner(props: Props) {
	return (
		<div className={cn("spinner", props.asOverlay && "spinner--as-overlay")}>
			<div className="spinner__dual-ring"></div>
		</div>
	);
}
