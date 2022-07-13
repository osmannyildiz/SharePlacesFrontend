import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./ImagePicker.css";

export default function ImagePicker(props) {
	const [imageFile, setImageFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [isValid, setIsValid] = useState(false);
	const filePickerRef = useRef();

	// Generate preview
	useEffect(() => {
		if (!imageFile) return;

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(imageFile);
	}, [imageFile]);

	function pickImageHandler(event) {
		let _imageFile = imageFile;
		let _isValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			_imageFile = event.target.files[0];
			_isValid = true;
		} else {
			_isValid = false;
		}
		setImageFile(_imageFile);
		setIsValid(_isValid);
		props.onInput(props.name, _imageFile, _isValid);
	}

	return (
		<div className="form-control">
			<input
				type="file"
				accept=".jpg,.jpeg,.png"
				name={props.name}
				style={{ display: "none" }}
				ref={filePickerRef}
				onChange={pickImageHandler}
			/>
			<div className={`image-picker ${props.center && "center"}`}>
				<div className="image-picker__preview">
					{previewUrl ? (
						<img src={previewUrl} alt="Preview" />
					) : (
						<p>
							<strong>Please pick an image.</strong>
						</p>
					)}
				</div>
				<Button type="button" onClick={() => filePickerRef.current.click()}>
					PICK IMAGE
				</Button>
			</div>
		</div>
	);
}
