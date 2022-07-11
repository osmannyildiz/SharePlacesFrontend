import React, { useRef } from "react";
import Button from "./Button";
import "./ImagePicker.css";

export default function ImagePicker(props) {
	const filePickerRef = useRef();

	function pickImageHandler(event) {}

	return (
		<div className="form-control">
			<input
				type="file"
				accept=".jpg,.jpeg,.png"
				id={props.id}
				style={{ display: "none" }}
				ref={filePickerRef}
				onChange={pickImageHandler}
			/>
			<div className={`image-picker ${props.center && "center"}`}>
				<div className="image-picker__preview">
					<img src="" alt="Preview" />
				</div>
				<Button type="button" onClick={() => filePickerRef.current.click()}>
					PICK IMAGE
				</Button>
			</div>
		</div>
	);
}
