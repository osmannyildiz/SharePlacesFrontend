import { Link } from "react-router-dom";
import cn from "../../utils/classNamesHelper";
import "./Button.scss";

interface Props {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	size?: string;
	inverse?: boolean;
	danger?: boolean;
	href?: string;
	to?: string;
	type?: "submit" | "reset" | "button";
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: Props) {
	const className = cn(
		"button",
		props.className,
		props.size && `button--${props.size}`,
		props.inverse && "button--inverse",
		props.danger && "button--danger"
	);

	if (props.href) {
		return (
			<a href={props.href} className={className}>
				{props.children}
			</a>
		);
	}

	if (props.to) {
		return (
			<Link
				to={props.to}
				className={className}
				style={{ display: "inline-block", ...props.style }}
			>
				{props.children}
			</Link>
		);
	}

	return (
		<button
			type={props.type}
			className={className}
			style={props.style}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
