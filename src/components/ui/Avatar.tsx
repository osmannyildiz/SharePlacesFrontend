import cn from "../../utils/classNamesHelper";
import "./Avatar.scss";

interface Props {
	className?: string;
	style?: React.CSSProperties;
	src: string;
	alt: string;
	size?: string;
}

export default function Avatar(props: Props) {
	return (
		<div className={cn("avatar", props.className)} style={props.style}>
			<img
				className="avatar__img"
				src={props.src}
				alt={props.alt}
				style={
					props.size ? { width: props.size, height: props.size } : undefined
				}
			/>
		</div>
	);
}
