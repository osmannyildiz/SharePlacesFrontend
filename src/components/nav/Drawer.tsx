import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Drawer.css";
import NavLinks from "./NavLinks";

interface Props {
	isOpen: boolean;
	handleCloseDrawer: () => void;
}

export default function Drawer(props: Props) {
	const content = (
		<CSSTransition
			in={props.isOpen}
			classNames="slide-in-left"
			timeout={200}
			mountOnEnter
			unmountOnExit
		>
			<aside className="drawer">
				<nav className="drawer-nav" onClick={props.handleCloseDrawer}>
					<NavLinks />
				</nav>
			</aside>
		</CSSTransition>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById("drawer-portal")!
	);
}
