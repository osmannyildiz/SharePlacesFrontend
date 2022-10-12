import cn from "../../utils/classNamesHelper";
import "./FormPanel.scss";

interface Props {
	children: React.ReactNode;
	className?: string;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function FormPanel(props: Props) {
	return (
		<form
			className={cn("form-panel form", props.className)}
			onSubmit={props.onSubmit}
		>
			{props.children}
		</form>
	);
}
