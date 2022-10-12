import cn from "../../utils/classNamesHelper";
import "./Spinner.scss";

interface Props {
	asOverlay?: boolean;
	color?: string;
}

export default function Spinner(props: Props) {
	return (
		<div
			className={cn("spinner", props.asOverlay && "spinner--as-overlay")}
			style={{ ["--color" as any]: props.color || undefined }}
		>
			<div className="spinner__dual-ring"></div>
		</div>
	);
}
