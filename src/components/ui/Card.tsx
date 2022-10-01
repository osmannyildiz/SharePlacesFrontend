import cn from "../../utils/classNamesHelper";
import "./Card.scss";

interface Props {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export default function Card(props: Props) {
	return (
		<div className={cn("card", props.className)} style={props.style}>
			{props.children}
		</div>
	);
}
