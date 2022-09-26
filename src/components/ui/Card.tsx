import "./Card.css";

interface Props {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export default function Card(props: Props) {
	return (
		<div className={`card ${props.className || ""}`} style={props.style}>
			{props.children}
		</div>
	);
}
